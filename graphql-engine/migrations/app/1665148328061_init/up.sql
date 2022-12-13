CREATE EXTENSION IF NOT EXISTS pgcrypto;

create schema "auth";
CREATE TABLE "auth"."accounts" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(), 
  "email" text NOT NULL, 
  "version" integer NOT NULL DEFAULT 1, 
  "token_version" integer NOT NULL DEFAULT 1, 
  "updated_at" timestamptz NOT NULL DEFAULT now(), 
  "created_at" timestamptz NOT NULL DEFAULT now(), 
  PRIMARY KEY ("id"), 
  UNIQUE ("email")
);

CREATE OR REPLACE FUNCTION "auth"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_auth_accounts_updated_at"
BEFORE UPDATE ON "auth"."accounts" FOR EACH ROW EXECUTE PROCEDURE "auth"."set_current_timestamp_updated_at"();

CREATE OR REPLACE FUNCTION auth.get_me(hasura_session json) 
 RETURNS SETOF auth.accounts
 LANGUAGE sql
 STABLE
AS $function$
    SELECT * FROM auth.accounts WHERE id = (hasura_session ->> 'x-hasura-user-id')::uuid
$function$;

create schema "eventboss";

CREATE TABLE "eventboss"."apps" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(), 
  "name" text NOT NULL, 
  "extra_data" jsonb NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(), 
  PRIMARY KEY ("id")
);

CREATE TABLE "eventboss"."app_users" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "account_id" uuid NOT NULL,
  "app_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(), 
  PRIMARY KEY ("id"),
  FOREIGN KEY ("app_id") REFERENCES "eventboss"."apps"("id") ON UPDATE restrict ON DELETE cascade
);

CREATE TABLE "eventboss"."events" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(), 
  "app_id" uuid NOT NULL, 
  "name" text NOT NULL, 
  "extra_data" jsonb NOT NULL, 
  "slug" text NOT NULL, 
  "updated_at" timestamptz NOT NULL DEFAULT now(), 
  "created_at" timestamptz NOT NULL DEFAULT now(), 
  PRIMARY KEY ("id") , 
  FOREIGN KEY ("app_id") REFERENCES "eventboss"."apps"("id") ON UPDATE restrict ON DELETE cascade, 
  UNIQUE ("app_id", "slug")
);

CREATE OR REPLACE FUNCTION "eventboss"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_eventboss_events_updated_at"
BEFORE UPDATE ON "eventboss"."events"
FOR EACH ROW
EXECUTE PROCEDURE "eventboss"."set_current_timestamp_updated_at"();

CREATE TABLE "eventboss"."activities" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(), 
  "app_id" uuid NOT NULL, 
  "name" text NOT NULL, 
  "slug" text NOT NULL, 
  "type" text NOT NULL, -- webhook, pull etc
  "type_configuration" jsonb NOT NULL, 
  "retry_limit" integer NOT NULL, 
  "retry_delay" integer NOT NULL, 
  "retry_backoff" boolean NOT NULL,
  "concurrency" integer NOT NULL default 9999,
  "expire_in" integer NOT NULL, 
  "delay_seconds" integer NOT NULL, 
  "updated_at" timestamptz NOT NULL DEFAULT now(), 
  "created_at" timestamptz NOT NULL DEFAULT now(), 
  "extra_data" jsonb NOT NULL, PRIMARY KEY ("id"), 
  FOREIGN KEY ("app_id") REFERENCES "eventboss"."apps"("id") ON UPDATE restrict ON DELETE cascade, 
  UNIQUE ("app_id", "slug")
);

CREATE TRIGGER "set_eventboss_activities_updated_at"
BEFORE UPDATE ON "eventboss"."activities" FOR EACH ROW EXECUTE PROCEDURE "eventboss"."set_current_timestamp_updated_at"();

CREATE TABLE "eventboss"."event_activities" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(), 
  "activity_id" uuid NOT NULL, 
  "event_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("activity_id") REFERENCES "eventboss"."activities"("id") ON UPDATE restrict ON DELETE cascade, 
  FOREIGN KEY ("event_id") REFERENCES "eventboss"."events"("id") ON UPDATE restrict ON DELETE cascade
);

CREATE TABLE "eventboss"."environments" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(), 
  "key" text NOT NULL, 
  "value" text NOT NULL, 
  "preview" text NOT NULL, 
  "app_id" uuid NOT NULL, 
  "created_at" timestamptz NOT NULL DEFAULT now(), 
  PRIMARY KEY ("id"), 
  FOREIGN KEY ("app_id") REFERENCES "eventboss"."apps"("id") ON UPDATE restrict ON DELETE cascade, 
  UNIQUE ("app_id", "key")
);

CREATE TABLE "eventboss"."task_queue" (
  "id" uuid NOT NULL,
  "exec_id" uuid NOT NULL,
  "app_id" uuid NOT NULL,
  "event_id" uuid NOT NULL,
  "activity_id" uuid NOT NULL,
  "data" jsonb NOT NULL, 
  "type" text NOT NULL, -- pull or webhook
  "state" smallint NOT NULL, -- scheduled | retry | active
  "expire_in" interval NOT NULL,
  "retry_limit" integer NOT NULL, 
  "retry_count" integer NOT NULL, 
  "retry_delay" integer NOT NULL,
  "retry_backoff" boolean NOT NULL,
  "scheduled_at" timestamptz NOT NULL, -- sort key
  "started_at" timestamptz, 
  "idempotence_key" text,
  PRIMARY KEY ("id")
);

CREATE TABLE "eventboss"."event_executions" (
  "exec_id" uuid NOT NULL,
  "app_id" uuid NOT NULL, 
  "event_id" uuid NOT NULL, 
  "payload" jsonb NOT NULL, 
  "created_at" timestamptz NOT NULL
);

CREATE TABLE "eventboss"."task_logs" (
  "exec_id" uuid NOT NULL,
  "app_id" uuid NOT NULL,
  "event_name" text NOT NULL,
  "task_id" uuid NOT NULL,
  "event_id" uuid NOT NULL,
  "activity_id" uuid NOT NULL, 
  "data" jsonb NOT NULL,
  "created_at" timestamptz NOT NULL
);
