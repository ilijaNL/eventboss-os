import { ColumnType,  RawBuilder } from 'kysely';
import { IPostgresInterval } from 'postgres-interval';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Interval = ColumnType<IPostgresInterval, IPostgresInterval | number, IPostgresInterval | number>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date | RawBuilder, Date | string | RawBuilder, Date | string | RawBuilder>;

export interface EventbossActivities {
  app_id: string;
  concurrency: Generated<number>;
  created_at: Generated<Timestamp>;
  delay_seconds: number;
  expire_in: number;
  extra_data: Json;
  id: Generated<string>;
  name: string;
  retry_backoff: boolean;
  retry_delay: number;
  retry_limit: number;
  slug: string;
  type: string;
  type_configuration: Json;
  updated_at: Generated<Timestamp>;
}

export interface EventbossApps {
  created_at: Generated<Timestamp>;
  extra_data: Json;
  id: Generated<string>;
  name: string;
}

export interface EventbossEnvironments {
  app_id: string;
  created_at: Generated<Timestamp>;
  id: Generated<string>;
  key: string;
  preview: string;
  value: string;
}

export interface EventbossEventActivities {
  activity_id: string;
  created_at: Generated<Timestamp>;
  event_id: string;
  id: Generated<string>;
}

export interface EventbossEventExecutions {
  app_id: string;
  created_at: Timestamp;
  event_id: string;
  exec_id: string;
  payload: Json;
}

export interface EventbossEvents {
  app_id: string;
  created_at: Generated<Timestamp>;
  extra_data: Json;
  id: Generated<string>;
  name: string;
  slug: string;
  updated_at: Generated<Timestamp>;
}

export interface EventbossTaskLogs {
  activity_id: string;
  app_id: string;
  created_at: Timestamp;
  data: Json;
  event_id: string;
  event_name: string;
  exec_id: string;
  task_id: string;
}

export interface EventbossTaskQueue {
  activity_id: string;
  app_id: string;
  data: Json;
  event_id: string;
  exec_id: string;
  expire_in: Interval;
  id: string;
  idempotence_key: string | null;
  retry_backoff: boolean;
  retry_count: number;
  retry_delay: number;
  retry_limit: number;
  scheduled_at: Timestamp;
  started_at: Timestamp | null;
  state: number;
  type: string;
}

export interface HdbCatalogHdbActionLog {
  action_name: string | null;
  created_at: Generated<Timestamp>;
  errors: Json | null;
  id: Generated<string>;
  input_payload: Json;
  request_headers: Json;
  response_payload: Json | null;
  response_received_at: Timestamp | null;
  session_variables: Json;
  status: string;
}

export interface HdbCatalogHdbCronEventInvocationLogs {
  created_at: Generated<Timestamp | null>;
  event_id: string | null;
  id: Generated<string>;
  request: Json | null;
  response: Json | null;
  status: number | null;
}

export interface HdbCatalogHdbCronEvents {
  created_at: Generated<Timestamp | null>;
  id: Generated<string>;
  next_retry_at: Timestamp | null;
  scheduled_time: Timestamp;
  status: Generated<string>;
  tries: Generated<number>;
  trigger_name: string;
}

export interface HdbCatalogHdbMetadata {
  id: number;
  metadata: Json;
  resource_version: Generated<number>;
}

export interface HdbCatalogHdbScheduledEventInvocationLogs {
  created_at: Generated<Timestamp | null>;
  event_id: string | null;
  id: Generated<string>;
  request: Json | null;
  response: Json | null;
  status: number | null;
}

export interface HdbCatalogHdbScheduledEvents {
  comment: string | null;
  created_at: Generated<Timestamp | null>;
  header_conf: Json | null;
  id: Generated<string>;
  next_retry_at: Timestamp | null;
  payload: Json | null;
  retry_conf: Json | null;
  scheduled_time: Timestamp;
  status: Generated<string>;
  tries: Generated<number>;
  webhook_conf: Json;
}

export interface HdbCatalogHdbSchemaNotifications {
  id: number;
  instance_id: string;
  notification: Json;
  resource_version: Generated<number>;
  updated_at: Generated<Timestamp | null>;
}

export interface HdbCatalogHdbVersion {
  cli_state: Generated<Json>;
  console_state: Generated<Json>;
  hasura_uuid: Generated<string>;
  upgraded_on: Timestamp;
  version: string;
}

export interface DB {
  "eventboss.activities": EventbossActivities;
  "eventboss.apps": EventbossApps;
  "eventboss.environments": EventbossEnvironments;
  "eventboss.event_activities": EventbossEventActivities;
  "eventboss.event_executions": EventbossEventExecutions;
  "eventboss.events": EventbossEvents;
  "eventboss.task_logs": EventbossTaskLogs;
  "eventboss.task_queue": EventbossTaskQueue;
  "hdb_catalog.hdb_action_log": HdbCatalogHdbActionLog;
  "hdb_catalog.hdb_cron_event_invocation_logs": HdbCatalogHdbCronEventInvocationLogs;
  "hdb_catalog.hdb_cron_events": HdbCatalogHdbCronEvents;
  "hdb_catalog.hdb_metadata": HdbCatalogHdbMetadata;
  "hdb_catalog.hdb_scheduled_event_invocation_logs": HdbCatalogHdbScheduledEventInvocationLogs;
  "hdb_catalog.hdb_scheduled_events": HdbCatalogHdbScheduledEvents;
  "hdb_catalog.hdb_schema_notifications": HdbCatalogHdbSchemaNotifications;
  "hdb_catalog.hdb_version": HdbCatalogHdbVersion;
}
