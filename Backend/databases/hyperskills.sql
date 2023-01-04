CREATE TABLE skill (
    id    SERIAL PRIMARY KEY,
    entity_equipped INT DEFAULT 0,
    color TEXT DEFAULT '#000000',
    title     TEXT NOT NULL,
    description    TEXT,
    countable   BOOLEAN DEFAULT true,
    goal REAL NOT NULL DEFAULT 0,
    list JSONB DEFAULT '{}',
    created_at DATE,
    updated_at TIMESTAMP DEFAULT NOW()
);
--ALTER TABLE "skill" ADD COLUMN list jsonb;
--ALTER TABLE skill ALTER COLUMN list SET DEFAULT '{}';
COMMENT ON COLUMN skill.color is 'Color in Hex of that represent the Skill';
COMMENT ON COLUMN skill.entity_equipped is 'Entity ID Equipped at the moment';

CREATE TABLE entity(
    id        SERIAL PRIMARY KEY,
    id_skill INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT,
    goal   REAL,
    current REAL,
    completed BOOlEAN DEFAULT false,
    created_at  DATE,
    updated_at TIMESTAMP DEFAULT NOW()
   
);
COMMENT ON COLUMN skill.entity_equipped is 'Suddenly the Skills are relative Infinite, the Entities can be Projects with an end, for that when are completed mark as true';
--Ejemplo de esto un Libro(Skyward de Brandon Sanderson) para especificar en el skill diario que estoy leyendolo, y lo muestro bindeando el id :D



CREATE TABLE task(
    id        SERIAL PRIMARY KEY,
    id_skill INTEGER NOT NULL,
    id_entity INTEGER REFERENCES entity (id),
    note TEXT,
    current   REAL DEFAULT 0,
    completed_rate   REAL DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    created_at  DATE,
    updated_at TIMESTAMP DEFAULT NOW()
    _date   DATE default NOW()
);
ALTER TABLE task ADD FOREIGN KEY(id_skill) REFERENCES skill (id) ON DELETE CASCADE;
COMMENT ON COLUMN task.current is 'If the Skill is Countable, then current is the number done, example 8/20 is current/skill.goal';

--CREATE TABLE task_list(
--    id        SERIAL PRIMARY KEY,
--    id_task   REFERENCES task (id),
--    title TEXT,
--    current   REAL DEFAULT 0,
--    goal REAL DEFAULT 0,
--    completed_rate   REAL DEFAULT 0,
--    completed BOOLEAN DEFAULT false,
--    _date   DATE default NOW()
--);
--ALTER TABLE task_list ADD FOREIGN KEY(id_task) REFERENCES task (id) ON DELETE CASCADE;

DROP FUNCTION IF EXISTS getSKills;
CREATE OR REPLACE FUNCTION getSKills()
 RETURNS TABLE (
    id INT,
    title TEXT,
    description TEXT,
    countable BOOLEAN,
    goal REAL,
	  entity_equipped INT,
    color TEXT
  ) 
  AS $$
  DECLARE 
    ids INTEGER[];
  BEGIN
    ids := ARRAY[1,2];
  RETURN QUERY
    SELECT skill.id, skill.title, skill.description, skill.countable, skill.goal, skill.entity_equipped, skill.color
    FROM public.skill
    ORDER BY skill.title;
    --WHERE users.id = ANY(ids);
  END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS getSkillSingle;
CREATE OR REPLACE FUNCTION getSkillSingle(IN _id INT)
  RETURNS TABLE (
    id INT,
    title TEXT,
    description TEXT,
    countable BOOLEAN,
    goal REAL,
    entity_equipped INT,
    color TEXT
    ) 
  AS $$
  DECLARE 
    BEGIN
      RETURN QUERY
        SELECT skill.id, skill.title, skill.description, skill.countable, skill.goal, skill.entity_equipped, skill.color
        FROM public.skill
        WHERE skill.id = _id;
    END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS insertSkill;
CREATE OR REPLACE FUNCTION insertSkill(IN _title TEXT, _description TEXT, _countable BOOLEAN, _goal REAL, _entity_equipped INT, _color TEXT ,_date DATE)
  RETURNS INTEGER
    AS $$
    DECLARE
      idReturn INT;
    BEGIN
      INSERT INTO  skill (title, description, countable, goal, entity_equipped , color ,created_at) VALUES (_title, _description, _countable, _goal, _entity_equipped, _color ,_date)
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS updateSkill;
CREATE OR REPLACE FUNCTION updateSkill(IN _id INT,_title TEXT, _description TEXT, _countable BOOLEAN, _goal REAL, _entity_equipped INT, _color TEXT)
  RETURNS INTEGER
  AS $$
    DECLARE
      idReturn INT;
    BEGIN
      UPDATE skill SET title = _title, description = _description, countable = _countable, goal = _goal ,entity_equipped = _entity_equipped, color = _color, updated_at = NOW()
      WHERE id = _id  
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS getEntities;
CREATE OR REPLACE FUNCTION getEntities(IN _id_skill INTEGER DEFAULT 0)
  RETURNS TABLE (
    id INT,
	  skill_id INT,    
    skill_title TEXT,
	  skill_color TEXT,
    title TEXT,
    description TEXT,
    image TEXT,
    current REAL,
    goal REAL,
    completed BOOLEAN
  ) 
  AS $$
  DECLARE 
    ids INTEGER[];
  BEGIN
    ids := ARRAY[1,2];
    RETURN QUERY
      SELECT 
      entity.id, skill.id as skill_id, skill.title as skill_title, skill.color as skill_color,
      entity.title, entity.description, entity.image, entity.current, entity.goal, entity.completed
      FROM public.entity
      LEFT JOIN skill ON entity.id_skill = skill.id         
      WHERE CASE WHEN _id_skill = 0 THEN TRUE  ELSE skill.id = _id_skill END
      ORDER BY entity.completed ASC, skill.id DESC,entity.title ASC;
  END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS getEntitySingle;
CREATE OR REPLACE FUNCTION getEntitySingle(IN _id INTEGER)
  RETURNS TABLE (
    id INT,
    skill_title TEXT,
    skill_color TEXT,
    title TEXT,
    description TEXT,
    image TEXT,
    current REAL,
    goal REAL
  ) 
  AS $$
  DECLARE 
  BEGIN
    RETURN QUERY
      SELECT 
        entity.id, skill.title as skill_title, skill.color as skill_color,
        entity.title, entity.description, entity.image, entity.current, entity.goal
      FROM public.entity
      LEFT JOIN skill ON entity.id_skill = skill.id
      WHERE entity.id = _id;
  END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS insertEntity;
CREATE OR REPLACE FUNCTION insertEntity(IN _id_skill INT,_title TEXT, _description TEXT, _image TEXT, _goal REAL, _date DATE)
  RETURNS INTEGER
    AS $$
    DECLARE
      idReturn INT;
    BEGIN
      INSERT INTO  entity (id_skill, title, description, image, goal, created_at) VALUES (_id_skill,_title, _description, _image, _goal, _date)
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$ LANGUAGE PLpgSQL;

  DROP FUNCTION IF EXISTS updateEntity;
  CREATE OR REPLACE FUNCTION updateEntity(IN _id INT, _id_skill INT,_title TEXT, _description TEXT, _image TEXT, _goal REAL, _completed BOOLEAN)
    RETURNS INTEGER
      AS $$
      DECLARE
        idReturn INT;
      BEGIN
        UPDATE entity SET id_skill = _id_skill, title = _title, description = _description, image = _image, goal = _goal, completed = _completed, updated_at = NOW()
        WHERE entity.id = _id  
        RETURNING id INTO idReturn;
        RETURN idReturn;
      END;
  $$ LANGUAGE PLpgSQL;


--Task Queries, all or filter by DATE
DROP FUNCTION IF EXISTS getTasks;
CREATE OR REPLACE FUNCTION getTasks(IN __date DATE DEFAULT NULL, _id_skill INT DEFAULT NULL)
  RETURNS TABLE(
    id INT, 
    skill_id INT,
    skill_title TEXT, 
    skill_description TEXT, 
    skill_countable BOOLEAN, 
    skill_goal REAL, 
    skill_color TEXT, 
    entity_title TEXT, 
    entity_description TEXT, 
    entity_image TEXT, 
    entity_current REAL,
    entity_goal REAL, 
    entity_completed BOOLEAN, 
    task_note TEXT, 
    task_current REAL, 
    task_completed_rate REAL, 
    task_completed BOOLEAN,
    task_date DATE
  )
  AS $$
    DECLARE 
    BEGIN
	    RAISE NOTICE 'Date received: %', __date;		
      RETURN QUERY
        SELECT 
          task.id,
          skill.id as skill_id,
          skill.title as skill_title, 
          skill.description as skill_description,
          skill.countable as skill_countable,
          skill.goal as skill_goal,
          skill.color as skill_color,
          entity.title as entity_title,
          entity.description as entity_description, 
          entity.image as entity_image,
          entity.current as entity_current, 
          entity.goal as entity_goal, 
          entity.completed as entity_completed,
          task.note, 
          task.current, 
          task.completed_rate, 
          task.completed,
          task._date
          --TEXT READY to_char(date_trunc('month', task._date)::date, 'Month YYYY') as _date
          

        FROM public.task
        LEFT JOIN skill ON task.id_skill = skill.id
        LEFT JOIN entity ON task.id_entity = entity.id
        WHERE 
          CASE 
            WHEN __date IS NOT NULL THEN task._date = __date
            WHEN _id_skill IS NOT NULL THEN task.id_skill = _id_skill  AND task._date != CURRENT_DATE 
            ELSE TRUE 
          END                               
        ORDER BY
		      CASE WHEN _id_skill IS NOT NULL THEN task._date END DESC, 
		      CASE WHEN __date IS NOT NULL THEN skill_title END ASC  		    	      
      ;--end of return Query
    END;
$$ LANGUAGE PLpgSQL;


--Example to Get Today in Date 
--SELECT * FROM getTasks(CURRENT_DATE);

DROP FUNCTION IF EXISTS getTaskSingle;
CREATE OR REPLACE FUNCTION getTaskSingle(IN _id INTEGER)
  RETURNS TABLE(
    id INT, 
    skill_title TEXT, 
    skill_description TEXT, 
    skill_countable BOOLEAN, 
    skill_goal REAL, 
    skill_color TEXT, 
    entity_title TEXT, 
    entity_description TEXT, 
    entity_image TEXT, 
    entity_current REAL,
    entity_goal REAL, 
    entity_completed BOOLEAN, 
    task_note TEXT, 
    task_current REAL, 
    task_completed_rate REAL, 
    task_completed BOOLEAN
  )
  AS $$
  DECLARE 
  BEGIN
    RETURN QUERY
    SELECT 
      task.id,
      skill.title as skill_title, 
      skill.description as skill_description,
      skill.countable as skill_countable,
      skill.goal as skill_goal,
      skill.color as skill_color,
      entity.title as entity_title,
      entity.description as entity_description, 
      entity.image as entity_image,
      entity.current as entity_current,
      entity.goal as entity_goal, 
      entity.completed as entity_completed,
      task.note, task.current, task.completed_rate, task.completed

    FROM public.task
    LEFT JOIN skill ON task.id_skill = skill.id
    LEFT JOIN entity ON task.id_entity = entity.id
    WHERE task.id = _id
    ORDER BY skill_title;
  END;
$$ LANGUAGE PLpgSQL;

--Get Notes, notes Basically are a Column in Task, but for a moment is needed to split into another DB :P, maybe If I develop a more complex system in the future
--Task Queries, all or filter by DATE
	DROP FUNCTION IF EXISTS getNotes;
	CREATE OR REPLACE FUNCTION getNotes(IN 
	  __date DATE DEFAULT NULL, 
	  _id_skill INT DEFAULT NULL
	  )
	  RETURNS TABLE(
		id INT, 
		skill_id INT,
		skill_title TEXT, 
		skill_description TEXT, 
		skill_countable BOOLEAN, 
		skill_goal REAL, 
		skill_color TEXT, 
		entity_title TEXT, 
		entity_description TEXT, 
		entity_image TEXT, 
		entity_current REAL,
		entity_goal REAL, 
		entity_completed BOOLEAN, 
		task_note TEXT, 
		task_current REAL, 
		task_completed_rate REAL, 
		task_completed BOOLEAN,
		task_date DATE
	  )
	  AS $$
		DECLARE 
		BEGIN
			RAISE NOTICE 'Date received: %', __date;		
		  RETURN QUERY
			SELECT 
			  task.id,
			  skill.id as skill_id,
			  skill.title as skill_title, 
			  skill.description as skill_description,
			  skill.countable as skill_countable,
			  skill.goal as skill_goal,
			  skill.color as skill_color,
			  entity.title as entity_title,
			  entity.description as entity_description, 
			  entity.image as entity_image,
			  entity.current as entity_current, 
			  entity.goal as entity_goal, 
			  entity.completed as entity_completed,
			  task.note, 
			  task.current, 
			  task.completed_rate, 
			  task.completed,
			  task._date		
			  --TEXT READY to_char(date_trunc('month', task._date)::date, 'Month YYYY') as _date


			FROM public.task
			LEFT JOIN skill ON task.id_skill = skill.id
			LEFT JOIN entity ON task.id_entity = entity.id
			WHERE (task.note = '') IS FALSE AND
			 CASE 				    
				WHEN __date IS NOT NULL THEN task._date = __date
				WHEN _id_skill IS NOT NULL THEN task.id_skill = _id_skill  AND task._date != CURRENT_DATE 
				ELSE TRUE 
			  END
			--GROUP BY task._date                            
			ORDER BY
			      task._date DESC,
				  CASE WHEN _id_skill IS NOT NULL THEN task._date END DESC, 
				  CASE WHEN __date IS NOT NULL THEN skill_title END ASC  		    	      
		  ;--end of return Query
		END;
	$$ LANGUAGE PLpgSQL;


--Insert Task
DROP FUNCTION IF EXISTS insertTask;
CREATE OR REPLACE FUNCTION insertTask(IN _id_skill INT,_id_entity INT DEFAULT 0, _note TEXT DEFAULT '', _current REAL DEFAULT 0, _completed_rate REAL DEFAULT 0, _completed BOOLEAN default FALSE)
  RETURNS INTEGER
  AS $$
    DECLARE
      idReturn INT;
    BEGIN
      INSERT INTO  task (id_skill, id_entity ,note, current, completed_rate, completed) VALUES (_id_skill, _id_entity, _note, _current, _completed_rate, _completed)
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS updateTask;
CREATE OR REPLACE FUNCTION updateTask(IN _id INT, _current REAL , _completed_rate REAL, _completed BOOLEAN, _note TEXT)
  RETURNS TABLE(
    id INT, 	  
    id_entity INT,
    entity_title TEXT,   
    entity_current REAL,       
    entity_goal REAL, 
    entity_completed BOOLEAN,     
    task_current REAL, 
    task_completed_rate REAL, 
    task_completed BOOLEAN
  )
  AS $$
    DECLARE      
    BEGIN
      UPDATE task SET current = _current, completed_rate = _completed_rate, completed = _completed, note = _note
      WHERE task.id = _id;
    RETURN QUERY	
      SELECT 
        task.id,		    
        entity.id as id_entity, 
        entity.title as entity_title,      
        entity.current as entity_current,          
        entity.goal as entity_goal, 
        entity.completed as entity_completed,
        task.current, 
        task.completed_rate, 
        task.completed

      FROM public.task      
      LEFT JOIN entity ON task.id_entity = entity.id
      WHERE task.id = _id;   
      END;
$$ LANGUAGE PLpgSQL;

DROP FUNCTION IF EXISTS updateTaskEntity;
CREATE OR REPLACE FUNCTION updateTaskEntity(IN _id_skill INT,_id_entity INT , __date DATE)
  RETURNS INTEGER
  AS $$
    DECLARE  
	idReturn INT;
    BEGIN
      UPDATE task SET id_entity = _id_entity
      WHERE task.id_skill = _id_skill AND task._date = __date
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$ LANGUAGE PLpgSQL;
--Materialized Views
--Week, Month, Year
