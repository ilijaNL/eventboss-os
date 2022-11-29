import { ColumnType,  RawBuilder } from 'kysely';
import { IPostgresInterval } from 'postgres-interval';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, string | number | bigint, string | number | bigint>;

export type Interval = ColumnType<IPostgresInterval, IPostgresInterval | number, IPostgresInterval | number>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date | RawBuilder, Date | string | RawBuilder, Date | string | RawBuilder>;

export interface _TimescaledbCatalogChunk {
  compressed_chunk_id: number | null;
  dropped: Generated<boolean>;
  hypertable_id: number;
  id: Generated<number>;
  osm_chunk: Generated<boolean>;
  schema_name: string;
  status: Generated<number>;
  table_name: string;
}

export interface _TimescaledbCatalogChunkConstraint {
  chunk_id: number;
  constraint_name: string;
  dimension_slice_id: number | null;
  hypertable_constraint_name: string | null;
}

export interface _TimescaledbCatalogChunkCopyOperation {
  backend_pid: number;
  chunk_id: number;
  completed_stage: string;
  compress_chunk_name: string;
  delete_on_source_node: boolean;
  dest_node_name: string;
  operation_id: string;
  source_node_name: string;
  time_start: Generated<Timestamp>;
}

export interface _TimescaledbCatalogChunkDataNode {
  chunk_id: number;
  node_chunk_id: number;
  node_name: string;
}

export interface _TimescaledbCatalogChunkIndex {
  chunk_id: number;
  hypertable_id: number;
  hypertable_index_name: string;
  index_name: string;
}

export interface _TimescaledbCatalogCompressionAlgorithm {
  description: string | null;
  id: number;
  name: string;
  version: number;
}

export interface _TimescaledbCatalogCompressionChunkSize {
  chunk_id: number;
  compressed_chunk_id: number;
  compressed_heap_size: Int8;
  compressed_index_size: Int8;
  compressed_toast_size: Int8;
  numrows_post_compression: Int8 | null;
  numrows_pre_compression: Int8 | null;
  uncompressed_heap_size: Int8;
  uncompressed_index_size: Int8;
  uncompressed_toast_size: Int8;
}

export interface _TimescaledbCatalogContinuousAgg {
  bucket_width: Int8;
  direct_view_name: string;
  direct_view_schema: string;
  finalized: Generated<boolean>;
  mat_hypertable_id: number;
  materialized_only: Generated<boolean>;
  partial_view_name: string;
  partial_view_schema: string;
  raw_hypertable_id: number;
  user_view_name: string;
  user_view_schema: string;
}

export interface _TimescaledbCatalogContinuousAggMigratePlan {
  end_ts: Timestamp | null;
  mat_hypertable_id: number;
  start_ts: Generated<Timestamp>;
}

export interface _TimescaledbCatalogContinuousAggMigratePlanStep {
  config: Json | null;
  end_ts: Timestamp | null;
  mat_hypertable_id: number;
  start_ts: Timestamp | null;
  status: Generated<string>;
  step_id: Generated<number>;
  type: string;
}

export interface _TimescaledbCatalogContinuousAggsBucketFunction {
  bucket_width: string;
  experimental: boolean;
  mat_hypertable_id: number;
  name: string;
  origin: string;
  timezone: string;
}

export interface _TimescaledbCatalogContinuousAggsHypertableInvalidationLog {
  greatest_modified_value: Int8;
  hypertable_id: number;
  lowest_modified_value: Int8;
}

export interface _TimescaledbCatalogContinuousAggsInvalidationThreshold {
  hypertable_id: number;
  watermark: Int8;
}

export interface _TimescaledbCatalogContinuousAggsMaterializationInvalidationLog {
  greatest_modified_value: Int8;
  lowest_modified_value: Int8;
  materialization_id: number | null;
}

export interface _TimescaledbCatalogDimension {
  aligned: boolean;
  column_name: string;
  column_type: string;
  hypertable_id: number;
  id: Generated<number>;
  integer_now_func: string | null;
  integer_now_func_schema: string | null;
  interval_length: Int8 | null;
  num_slices: number | null;
  partitioning_func: string | null;
  partitioning_func_schema: string | null;
}

export interface _TimescaledbCatalogDimensionPartition {
  data_nodes: string | null;
  dimension_id: number;
  range_start: Int8;
}

export interface _TimescaledbCatalogDimensionSlice {
  dimension_id: number;
  id: Generated<number>;
  range_end: Int8;
  range_start: Int8;
}

export interface _TimescaledbCatalogHypertable {
  associated_schema_name: string;
  associated_table_prefix: string;
  chunk_sizing_func_name: string;
  chunk_sizing_func_schema: string;
  chunk_target_size: Int8;
  compressed_hypertable_id: number | null;
  compression_state: Generated<number>;
  id: Generated<number>;
  num_dimensions: number;
  replication_factor: number | null;
  schema_name: string;
  table_name: string;
}

export interface _TimescaledbCatalogHypertableCompression {
  attname: string;
  compression_algorithm_id: number | null;
  hypertable_id: number;
  orderby_asc: boolean | null;
  orderby_column_index: number | null;
  orderby_nullsfirst: boolean | null;
  segmentby_column_index: number | null;
}

export interface _TimescaledbCatalogHypertableDataNode {
  block_chunks: boolean;
  hypertable_id: number;
  node_hypertable_id: number | null;
  node_name: string;
}

export interface _TimescaledbCatalogMetadata {
  include_in_telemetry: boolean;
  key: string;
  value: string;
}

export interface _TimescaledbCatalogRemoteTxn {
  data_node_name: string | null;
  remote_transaction_id: string;
}

export interface _TimescaledbCatalogTablespace {
  hypertable_id: number;
  id: Generated<number>;
  tablespace_name: string;
}

export interface _TimescaledbConfigBgwJob {
  application_name: string;
  check_name: string | null;
  check_schema: string | null;
  config: Json | null;
  hypertable_id: number | null;
  id: Generated<number>;
  max_retries: number;
  max_runtime: Interval;
  owner: Generated<string>;
  proc_name: string;
  proc_schema: string;
  retry_period: Interval;
  schedule_interval: Interval;
  scheduled: Generated<boolean>;
}

export interface _TimescaledbInternalBgwJobStat {
  consecutive_crashes: number;
  consecutive_failures: number;
  job_id: number;
  last_finish: Timestamp;
  last_run_success: boolean;
  last_start: Generated<Timestamp>;
  last_successful_finish: Timestamp;
  next_start: Timestamp;
  total_crashes: Int8;
  total_duration: Interval;
  total_failures: Int8;
  total_runs: Int8;
  total_successes: Int8;
}

export interface _TimescaledbInternalBgwPolicyChunkStats {
  chunk_id: number;
  job_id: number;
  last_time_job_run: Timestamp | null;
  num_times_job_run: number | null;
}

export interface AppActionLogs {
  action_id: string;
  app_id: string;
  created_at: Timestamp;
  event_id: string;
  event_log_id: string;
  id: string;
  job_id: string;
  payload: Json;
  trace: string | null;
}

export interface AppActions {
  app_id: string;
  created_at: Generated<Timestamp>;
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

export interface AppEventLogs {
  app_id: string;
  created_at: Timestamp;
  event_id: string;
  id: string;
  payload: Json;
  trace: string | null;
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
  "_timescaledb_catalog.chunk": _TimescaledbCatalogChunk;
  "_timescaledb_catalog.chunk_constraint": _TimescaledbCatalogChunkConstraint;
  "_timescaledb_catalog.chunk_copy_operation": _TimescaledbCatalogChunkCopyOperation;
  "_timescaledb_catalog.chunk_data_node": _TimescaledbCatalogChunkDataNode;
  "_timescaledb_catalog.chunk_index": _TimescaledbCatalogChunkIndex;
  "_timescaledb_catalog.compression_algorithm": _TimescaledbCatalogCompressionAlgorithm;
  "_timescaledb_catalog.compression_chunk_size": _TimescaledbCatalogCompressionChunkSize;
  "_timescaledb_catalog.continuous_agg": _TimescaledbCatalogContinuousAgg;
  "_timescaledb_catalog.continuous_agg_migrate_plan": _TimescaledbCatalogContinuousAggMigratePlan;
  "_timescaledb_catalog.continuous_agg_migrate_plan_step": _TimescaledbCatalogContinuousAggMigratePlanStep;
  "_timescaledb_catalog.continuous_aggs_bucket_function": _TimescaledbCatalogContinuousAggsBucketFunction;
  "_timescaledb_catalog.continuous_aggs_hypertable_invalidation_log": _TimescaledbCatalogContinuousAggsHypertableInvalidationLog;
  "_timescaledb_catalog.continuous_aggs_invalidation_threshold": _TimescaledbCatalogContinuousAggsInvalidationThreshold;
  "_timescaledb_catalog.continuous_aggs_materialization_invalidation_log": _TimescaledbCatalogContinuousAggsMaterializationInvalidationLog;
  "_timescaledb_catalog.dimension": _TimescaledbCatalogDimension;
  "_timescaledb_catalog.dimension_partition": _TimescaledbCatalogDimensionPartition;
  "_timescaledb_catalog.dimension_slice": _TimescaledbCatalogDimensionSlice;
  "_timescaledb_catalog.hypertable": _TimescaledbCatalogHypertable;
  "_timescaledb_catalog.hypertable_compression": _TimescaledbCatalogHypertableCompression;
  "_timescaledb_catalog.hypertable_data_node": _TimescaledbCatalogHypertableDataNode;
  "_timescaledb_catalog.metadata": _TimescaledbCatalogMetadata;
  "_timescaledb_catalog.remote_txn": _TimescaledbCatalogRemoteTxn;
  "_timescaledb_catalog.tablespace": _TimescaledbCatalogTablespace;
  "_timescaledb_config.bgw_job": _TimescaledbConfigBgwJob;
  "_timescaledb_internal.bgw_job_stat": _TimescaledbInternalBgwJobStat;
  "_timescaledb_internal.bgw_policy_chunk_stats": _TimescaledbInternalBgwPolicyChunkStats;
  "app.action_logs": AppActionLogs;
  "app.actions": AppActions;
  "app.apps": AppApps;
  "app.environments": AppEnvironments;
  "app.event_actions": AppEventActions;
  "app.event_logs": AppEventLogs;
  "app.events": AppEvents;
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
