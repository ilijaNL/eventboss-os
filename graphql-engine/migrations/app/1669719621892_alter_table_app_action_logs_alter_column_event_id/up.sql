alter table "app"."action_logs" rename column "event_id" to "event_log_id";
alter table "app"."action_logs" add column "event_id" uuid not null;
