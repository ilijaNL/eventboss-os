create schema "system";
CREATE EXTENSION IF NOT EXISTS timescaledb;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

create schema "app";
CREATE TABLE "app"."apps" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "extra_data" jsonb NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id"));

CREATE TABLE "app"."events" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "app_id" uuid NOT NULL, "name" text NOT NULL, "extra_data" jsonb NOT NULL, "slug" text NOT NULL, "updated_at" timestamptz NOT NULL DEFAULT now(), "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("app_id") REFERENCES "app"."apps"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("app_id", "slug"));

CREATE OR REPLACE FUNCTION "app"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_app_events_updated_at"
BEFORE UPDATE ON "app"."events"
FOR EACH ROW
EXECUTE PROCEDURE "app"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_app_events_updated_at" ON "app"."events" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "app"."actions" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(), 
  "app_id" uuid NOT NULL, 
  "name" text NOT NULL, 
  "slug" text NOT NULL, 
  "type" text NOT NULL, 
  "type_configuration" jsonb NOT NULL, 
  "retry_limit" integer NOT NULL, 
  "retry_delay" integer NOT NULL, 
  "retry_backoff" boolean NOT NULL,
  "expire_in" integer NOT NULL, 
  "run_after" integer NOT NULL, 
  "updated_at" timestamptz NOT NULL DEFAULT now(), 
  "created_at" timestamptz NOT NULL DEFAULT now(), 
  "extra_data" jsonb NOT NULL, PRIMARY KEY ("id"), 
  FOREIGN KEY ("app_id") REFERENCES "app"."apps"("id") ON UPDATE restrict ON DELETE cascade, 
  UNIQUE ("app_id", "slug")
);

COMMENT ON TABLE "app"."actions" IS E'action definitions';
CREATE OR REPLACE FUNCTION "app"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_app_actions_updated_at"
BEFORE UPDATE ON "app"."actions"
FOR EACH ROW
EXECUTE PROCEDURE "app"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_app_actions_updated_at" ON "app"."actions" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "app"."event_actions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "action_id" uuid NOT NULL, "event_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("action_id") REFERENCES "app"."actions"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("event_id") REFERENCES "app"."events"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("action_id", "event_id"));
COMMENT ON TABLE "app"."event_actions" IS E'actions which are linked to events';


CREATE TABLE "app"."event_executions" (
    "exec_id" uuid NOT NULL,
    "app_id" uuid NOT NULL, 
    "event_id" uuid NOT NULL, 
    "payload" jsonb NOT NULL, 
    "created_at" timestamptz NOT NULL
);

SELECT create_hypertable('app.event_executions','created_at');
CREATE INDEX idx_event_executions_app_id ON "app"."event_executions" (app_id, created_at DESC);

CREATE TABLE "app"."job_events" (
  "exec_id" uuid NOT NULL,
  "app_id" uuid NOT NULL,
  "event_name" text NOT NULL,
  "job_id" uuid NOT NULL,
  "event_id" uuid NOT NULL,
  "action_id" uuid NOT NULL, 
  "data" jsonb NOT NULL,
  "created_at" timestamptz NOT NULL
);

SELECT create_hypertable('app.job_events','created_at');
CREATE INDEX idx_job_events_app_id ON "app"."job_events" (app_id,created_at DESC);

alter table "app"."event_actions" drop constraint "event_actions_action_id_event_id_key";
CREATE TABLE "app"."environments" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "key" text NOT NULL, "value" text NOT NULL, "preview" text NOT NULL, "app_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("app_id") REFERENCES "app"."apps"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("app_id", "key"));
