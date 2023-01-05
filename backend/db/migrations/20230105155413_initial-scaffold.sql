-- migrate:up
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
-- Example is a Book: Skyward-Brandon Sanderson and we related this to a skill about "Reading"

CREATE TABLE task(
    id        SERIAL PRIMARY KEY,
    id_skill INTEGER NOT NULL,
    id_entity INTEGER REFERENCES entity (id),
    note TEXT,
    current   REAL DEFAULT 0,
    completed_rate   REAL DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    created_at  DATE,
    updated_at TIMESTAMP DEFAULT NOW(),
    _date   DATE default NOW()
);
ALTER TABLE task ADD FOREIGN KEY(id_skill) REFERENCES skill (id) ON DELETE CASCADE;
COMMENT ON COLUMN task.current is 'If the Skill is Countable, then current is the number done, example 8/20 is current/skill.goal';


-- migrate:down
DROP TABLE task;
DROP TABLE entity;
DROP TABLE skill;