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

export interface AppActions {
  app_id: string;
  created_at: Generated<Timestamp>;
  expire_in: number;
  extra_data: Json;
  id: Generated<string>;
  name: string;
  retry_backoff: boolean;
  retry_delay: number;
  retry_limit: number;
  run_after: number;
  slug: string;
  type: string;
  type_configuration: Json;
  updated_at: Generated<Timestamp>;
}

export interface AppApps {
  created_at: Generated<Timestamp>;
  extra_data: Json;
  id: Generated<string>;
  name: string;
}

export interface AppEnvironments {
  app_id: string;
  created_at: Generated<Timestamp>;
  id: Generated<string>;
  key: string;
  preview: string;
  value: string;
}

export interface AppEventActions {
  action_id: string;
  created_at: Generated<Timestamp>;
  event_id: string;
  id: Generated<string>;
}

export interface AppEventExecutions {
  app_id: string;
  created_at: Timestamp;
  event_id: string;
  exec_id: string;
  payload: Json;
}

export interface AppEvents {
  app_id: string;
  created_at: Generated<Timestamp>;
  extra_data: Json;
  id: Generated<string>;
  name: string;
  slug: string;
  updated_at: Generated<Timestamp>;
}

export interface AppJobEvents {
  action_id: string;
  app_id: string;
  created_at: Timestamp;
  data: Json;
  event_id: string;
  event_name: string;
  exec_id: string;
  job_id: string;
}

export interface AppJobs {
  app_id: string;
  data: Json;
  expire_in: Interval;
  id: string;
  idempotence_key: string | null;
  result: Json | null;
  retry_backoff: boolean;
  retry_count: number;
  retry_delay: number;
  retry_limit: number;
  scheduled_at: Timestamp;
  started_at: Timestamp | null;
  state: number;
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

export interface SystemArchive {
  archivedon: Generated<Timestamp>;
  completedon: Timestamp | null;
  createdon: Timestamp;
  data: Json | null;
  expirein: Interval;
  id: string;
  keepuntil: Timestamp;
  name: string;
  on_complete: boolean;
  output: Json | null;
  priority: number;
  retrybackoff: boolean;
  retrycount: number;
  retrydelay: number;
  retrylimit: number;
  singletonkey: string | null;
  singletonon: Timestamp | null;
  startafter: Timestamp;
  startedon: Timestamp | null;
  state: string;
}

export interface SystemJob {
  completedon: Timestamp | null;
  createdon: Generated<Timestamp>;
  data: Json | null;
  expirein: Generated<Interval>;
  id: Generated<string>;
  keepuntil: Generated<Timestamp>;
  name: string;
  on_complete: Generated<boolean>;
  output: Json | null;
  priority: Generated<number>;
  retrybackoff: Generated<boolean>;
  retrycount: Generated<number>;
  retrydelay: Generated<number>;
  retrylimit: Generated<number>;
  singletonkey: string | null;
  singletonon: Timestamp | null;
  startafter: Generated<Timestamp>;
  startedon: Timestamp | null;
  state: Generated<string>;
}

export interface SystemSchedule {
  created_on: Generated<Timestamp>;
  cron: string;
  data: Json | null;
  name: string;
  options: Json | null;
  timezone: string | null;
  updated_on: Generated<Timestamp>;
}

export interface SystemSubscription {
  created_on: Generated<Timestamp>;
  event: string;
  name: string;
  updated_on: Generated<Timestamp>;
}

export interface SystemVersion {
  cron_on: Timestamp | null;
  maintained_on: Timestamp | null;
  version: number;
}

export interface DB {
  "app.actions": AppActions;
  "app.apps": AppApps;
  "app.environments": AppEnvironments;
  "app.event_actions": AppEventActions;
  "app.event_executions": AppEventExecutions;
  "app.events": AppEvents;
  "app.job_events": AppJobEvents;
  "app.jobs": AppJobs;
  "hdb_catalog.hdb_action_log": HdbCatalogHdbActionLog;
  "hdb_catalog.hdb_cron_event_invocation_logs": HdbCatalogHdbCronEventInvocationLogs;
  "hdb_catalog.hdb_cron_events": HdbCatalogHdbCronEvents;
  "hdb_catalog.hdb_metadata": HdbCatalogHdbMetadata;
  "hdb_catalog.hdb_scheduled_event_invocation_logs": HdbCatalogHdbScheduledEventInvocationLogs;
  "hdb_catalog.hdb_scheduled_events": HdbCatalogHdbScheduledEvents;
  "hdb_catalog.hdb_schema_notifications": HdbCatalogHdbSchemaNotifications;
  "hdb_catalog.hdb_version": HdbCatalogHdbVersion;
  "system.archive": SystemArchive;
  "system.job": SystemJob;
  "system.schedule": SystemSchedule;
  "system.subscription": SystemSubscription;
  "system.version": SystemVersion;
}
