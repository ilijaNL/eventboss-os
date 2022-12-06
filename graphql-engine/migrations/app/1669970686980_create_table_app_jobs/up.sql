CREATE TABLE "app"."jobs" (
  "id" uuid NOT NULL, 
  "app_id" uuid NOT NULL, 
  "data" jsonb NOT NULL, 
  "state" integer NOT NULL, 
  "retry_limit" integer NOT NULL, 
  "retry_count" integer NOT NULL, 
  "retry_delay" integer NOT NULL, 
  "scheduled_at" timestamptz NOT NULL, 
  "started_at" timestamptz, 
  "expire_in" interval NOT NULL, 
  "result" jsonb, 
  "idempotence_key" text, 
  "retry_backoff" boolean NOT NULL, PRIMARY KEY ("id") 
);

-- used for fetching
CREATE INDEX scheduled_jobs ON app.jobs (scheduled_at, app_id) WHERE state < 2;
-- to get running jobs for apps
CREATE INDEX running_app_jobs ON app.jobs (app_id) WHERE state = 2;
-- select app_id, count(1) from "app"."jobs" WHERE state = 2 group by app_id;
-- with expired_jobs as (
--  select id, retry_limit, retry_count, retry_backoff, retry_delay from "app"."jobs" where state = 2 and started_at + expire_in < now()
--  for update skip locked
-- ), jobs_for_retry as (
--  select id, retry_count, retry_backoff, retry_delay from expired_jobs where retry_count < retry_limit
-- ), jobs_to_delete as ( 
--  select id, retry_count, retry_backoff, retry_delay from expired_jobs where retry_count >= retry_limit     
-- ), remove_jobs as (
--  select 1 
-- ), insert_deleted_jobs as (
--  select 1
-- ), update_retry_jobs as (
--  select 1
-- ) select id from expired_jobs