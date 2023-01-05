SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: getentities(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.getentities(_id_skill integer DEFAULT 0) RETURNS TABLE(id integer, skill_id integer, skill_title text, skill_color text, title text, description text, image text, current real, goal real, completed boolean)
    LANGUAGE plpgsql
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
$$;


--
-- Name: getentitysingle(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.getentitysingle(_id integer) RETURNS TABLE(id integer, skill_title text, skill_color text, title text, description text, image text, current real, goal real)
    LANGUAGE plpgsql
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
$$;


--
-- Name: getnotes(date, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.getnotes(__date date DEFAULT NULL::date, _id_skill integer DEFAULT NULL::integer) RETURNS TABLE(id integer, skill_id integer, skill_title text, skill_description text, skill_countable boolean, skill_goal real, skill_color text, entity_title text, entity_description text, entity_image text, entity_current real, entity_goal real, entity_completed boolean, task_note text, task_current real, task_completed_rate real, task_completed boolean, task_date date)
    LANGUAGE plpgsql
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
$$;


--
-- Name: getskills(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.getskills() RETURNS TABLE(id integer, title text, description text, countable boolean, goal real, entity_equipped integer, color text)
    LANGUAGE plpgsql
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
$$;


--
-- Name: getskillsingle(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.getskillsingle(_id integer) RETURNS TABLE(id integer, title text, description text, countable boolean, goal real, entity_equipped integer, color text)
    LANGUAGE plpgsql
    AS $$
  DECLARE
    BEGIN
      RETURN QUERY
        SELECT skill.id, skill.title, skill.description, skill.countable, skill.goal, skill.entity_equipped, skill.color
        FROM public.skill
        WHERE skill.id = _id;
    END;
$$;


--
-- Name: gettasks(date, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.gettasks(__date date DEFAULT NULL::date, _id_skill integer DEFAULT NULL::integer) RETURNS TABLE(id integer, skill_id integer, skill_title text, skill_description text, skill_countable boolean, skill_goal real, skill_color text, entity_title text, entity_description text, entity_image text, entity_current real, entity_goal real, entity_completed boolean, task_note text, task_current real, task_completed_rate real, task_completed boolean, task_date date)
    LANGUAGE plpgsql
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
$$;


--
-- Name: gettasksingle(integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.gettasksingle(_id integer) RETURNS TABLE(id integer, skill_title text, skill_description text, skill_countable boolean, skill_goal real, skill_color text, entity_title text, entity_description text, entity_image text, entity_current real, entity_goal real, entity_completed boolean, task_note text, task_current real, task_completed_rate real, task_completed boolean)
    LANGUAGE plpgsql
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
$$;


--
-- Name: insertentity(integer, text, text, text, real, date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.insertentity(_id_skill integer, _title text, _description text, _image text, _goal real, _date date) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    DECLARE
      idReturn INT;
    BEGIN
      INSERT INTO  entity (id_skill, title, description, image, goal, created_at) VALUES (_id_skill,_title, _description, _image, _goal, _date)
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$;


--
-- Name: insertskill(text, text, boolean, real, integer, text, date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.insertskill(_title text, _description text, _countable boolean, _goal real, _entity_equipped integer, _color text, _date date) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    DECLARE
      idReturn INT;
    BEGIN
      INSERT INTO  skill (title, description, countable, goal, entity_equipped , color ,created_at) VALUES (_title, _description, _countable, _goal, _entity_equipped, _color ,_date)
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$;


--
-- Name: inserttask(integer, integer, text, real, real, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.inserttask(_id_skill integer, _id_entity integer DEFAULT 0, _note text DEFAULT ''::text, _current real DEFAULT 0, _completed_rate real DEFAULT 0, _completed boolean DEFAULT false) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    DECLARE
      idReturn INT;
    BEGIN
      INSERT INTO  task (id_skill, id_entity ,note, current, completed_rate, completed) VALUES (_id_skill, _id_entity, _note, _current, _completed_rate, _completed)
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$;


--
-- Name: updateentity(integer, integer, text, text, text, real, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.updateentity(_id integer, _id_skill integer, _title text, _description text, _image text, _goal real, _completed boolean) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    DECLARE
      idReturn INT;
    BEGIN
      UPDATE entity SET id_skill = _id_skill, title = _title, description = _description, image = _image, goal = _goal, completed = _completed, updated_at = NOW()
      WHERE entity.id = _id
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$;


--
-- Name: updateskill(integer, text, text, boolean, real, integer, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.updateskill(_id integer, _title text, _description text, _countable boolean, _goal real, _entity_equipped integer, _color text) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    DECLARE
      idReturn INT;
    BEGIN
      UPDATE skill SET title = _title, description = _description, countable = _countable, goal = _goal ,entity_equipped = _entity_equipped, color = _color, updated_at = NOW()
      WHERE id = _id
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$;


--
-- Name: updatetask(integer, real, real, boolean, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.updatetask(_id integer, _current real, _completed_rate real, _completed boolean, _note text) RETURNS TABLE(id integer, id_entity integer, entity_title text, entity_current real, entity_goal real, entity_completed boolean, task_current real, task_completed_rate real, task_completed boolean)
    LANGUAGE plpgsql
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
$$;


--
-- Name: updatetaskentity(integer, integer, date); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.updatetaskentity(_id_skill integer, _id_entity integer, __date date) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    DECLARE
	idReturn INT;
    BEGIN
      UPDATE task SET id_entity = _id_entity
      WHERE task.id_skill = _id_skill AND task._date = __date
      RETURNING id INTO idReturn;
      RETURN idReturn;
    END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: entity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entity (
    id integer NOT NULL,
    id_skill integer NOT NULL,
    title text NOT NULL,
    description text,
    image text,
    goal real,
    current real,
    completed boolean DEFAULT false,
    created_at date,
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: entity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entity_id_seq OWNED BY public.entity.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: skill; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill (
    id integer NOT NULL,
    entity_equipped integer DEFAULT 0,
    color text DEFAULT '#000000'::text,
    title text NOT NULL,
    description text,
    countable boolean DEFAULT true,
    goal real DEFAULT 0 NOT NULL,
    list jsonb DEFAULT '{}'::jsonb,
    created_at date,
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: COLUMN skill.entity_equipped; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.skill.entity_equipped IS 'Suddenly the Skills are relative Infinite, the Entities can be Projects with an end, for that when are completed mark as true';


--
-- Name: COLUMN skill.color; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.skill.color IS 'Color in Hex of that represent the Skill';


--
-- Name: skill_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.skill_id_seq OWNED BY public.skill.id;


--
-- Name: task; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task (
    id integer NOT NULL,
    id_skill integer NOT NULL,
    id_entity integer,
    note text,
    current real DEFAULT 0,
    completed_rate real DEFAULT 0,
    completed boolean DEFAULT false,
    created_at date,
    updated_at timestamp without time zone DEFAULT now(),
    _date date DEFAULT now()
);


--
-- Name: COLUMN task.current; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.task.current IS 'If the Skill is Countable, then current is the number done, example 8/20 is current/skill.goal';


--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- Name: entity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity ALTER COLUMN id SET DEFAULT nextval('public.entity_id_seq'::regclass);


--
-- Name: skill id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill ALTER COLUMN id SET DEFAULT nextval('public.skill_id_seq'::regclass);


--
-- Name: task id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entity
    ADD CONSTRAINT entity_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: skill skill_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill
    ADD CONSTRAINT skill_pkey PRIMARY KEY (id);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: task task_id_entity_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_id_entity_fkey FOREIGN KEY (id_entity) REFERENCES public.entity(id);


--
-- Name: task task_id_skill_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_id_skill_fkey FOREIGN KEY (id_skill) REFERENCES public.skill(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20230105155413'),
    ('20230105161200');
