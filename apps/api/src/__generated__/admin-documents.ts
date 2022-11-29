import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  interval: string;
  job_state: any;
  jsonb: Record<string, any>;
  timestamp: string;
  timestamptz: string;
  uuid: string;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** log of all actions */
export type App_Action_Logs = {
  /** An object relationship */
  a_job: Maybe<System_Job>;
  /** An object relationship */
  action: Maybe<App_Actions>;
  action_id: Scalars['uuid'];
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  event: Maybe<App_Events>;
  event_id: Scalars['uuid'];
  event_log_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  job: Maybe<System_Job>;
  job_id: Scalars['uuid'];
  payload: Scalars['jsonb'];
  trace: Maybe<Scalars['String']>;
};


/** log of all actions */
export type App_Action_LogsPayloadArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "app.action_logs" */
export type App_Action_Logs_Aggregate = {
  aggregate: Maybe<App_Action_Logs_Aggregate_Fields>;
  nodes: Array<App_Action_Logs>;
};

/** aggregate fields of "app.action_logs" */
export type App_Action_Logs_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<App_Action_Logs_Max_Fields>;
  min: Maybe<App_Action_Logs_Min_Fields>;
};


/** aggregate fields of "app.action_logs" */
export type App_Action_Logs_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<App_Action_Logs_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type App_Action_Logs_Append_Input = {
  payload?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "app.action_logs". All fields are combined with a logical 'AND'. */
export type App_Action_Logs_Bool_Exp = {
  _and?: InputMaybe<Array<App_Action_Logs_Bool_Exp>>;
  _not?: InputMaybe<App_Action_Logs_Bool_Exp>;
  _or?: InputMaybe<Array<App_Action_Logs_Bool_Exp>>;
  a_job?: InputMaybe<System_Job_Bool_Exp>;
  action?: InputMaybe<App_Actions_Bool_Exp>;
  action_id?: InputMaybe<Uuid_Comparison_Exp>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event?: InputMaybe<App_Events_Bool_Exp>;
  event_id?: InputMaybe<Uuid_Comparison_Exp>;
  event_log_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  job?: InputMaybe<System_Job_Bool_Exp>;
  job_id?: InputMaybe<Uuid_Comparison_Exp>;
  payload?: InputMaybe<Jsonb_Comparison_Exp>;
  trace?: InputMaybe<String_Comparison_Exp>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type App_Action_Logs_Delete_At_Path_Input = {
  payload?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type App_Action_Logs_Delete_Elem_Input = {
  payload?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type App_Action_Logs_Delete_Key_Input = {
  payload?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "app.action_logs" */
export type App_Action_Logs_Insert_Input = {
  a_job?: InputMaybe<System_Job_Obj_Rel_Insert_Input>;
  action?: InputMaybe<App_Actions_Obj_Rel_Insert_Input>;
  action_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event?: InputMaybe<App_Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['uuid']>;
  event_log_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  job?: InputMaybe<System_Job_Obj_Rel_Insert_Input>;
  job_id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
  trace?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type App_Action_Logs_Max_Fields = {
  action_id: Maybe<Scalars['uuid']>;
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  event_log_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  job_id: Maybe<Scalars['uuid']>;
  trace: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type App_Action_Logs_Min_Fields = {
  action_id: Maybe<Scalars['uuid']>;
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  event_log_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  job_id: Maybe<Scalars['uuid']>;
  trace: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "app.action_logs" */
export type App_Action_Logs_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Action_Logs>;
};

/** input type for inserting object relation for remote table "app.action_logs" */
export type App_Action_Logs_Obj_Rel_Insert_Input = {
  data: App_Action_Logs_Insert_Input;
};

/** Ordering options when selecting data from "app.action_logs". */
export type App_Action_Logs_Order_By = {
  a_job?: InputMaybe<System_Job_Order_By>;
  action?: InputMaybe<App_Actions_Order_By>;
  action_id?: InputMaybe<Order_By>;
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event?: InputMaybe<App_Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  event_log_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  job?: InputMaybe<System_Job_Order_By>;
  job_id?: InputMaybe<Order_By>;
  payload?: InputMaybe<Order_By>;
  trace?: InputMaybe<Order_By>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type App_Action_Logs_Prepend_Input = {
  payload?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "app.action_logs" */
export enum App_Action_Logs_Select_Column {
  /** column name */
  ActionId = 'action_id',
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  EventLogId = 'event_log_id',
  /** column name */
  Id = 'id',
  /** column name */
  JobId = 'job_id',
  /** column name */
  Payload = 'payload',
  /** column name */
  Trace = 'trace'
}

/** input type for updating data in table "app.action_logs" */
export type App_Action_Logs_Set_Input = {
  action_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  event_log_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  job_id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
  trace?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "app_action_logs" */
export type App_Action_Logs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Action_Logs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Action_Logs_Stream_Cursor_Value_Input = {
  action_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  event_log_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  job_id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
  trace?: InputMaybe<Scalars['String']>;
};

export type App_Action_Logs_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<App_Action_Logs_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<App_Action_Logs_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<App_Action_Logs_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<App_Action_Logs_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<App_Action_Logs_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<App_Action_Logs_Set_Input>;
  where: App_Action_Logs_Bool_Exp;
};

/** action definitions */
export type App_Actions = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  event_actions: Array<App_Event_Actions>;
  /** An aggregate relationship */
  event_actions_aggregate: App_Event_Actions_Aggregate;
  extra_data: Scalars['jsonb'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  retry_backoff: Scalars['Boolean'];
  retry_delay: Scalars['Int'];
  retry_limit: Scalars['Int'];
  run_after: Scalars['Int'];
  slug: Scalars['String'];
  type: Scalars['String'];
  type_configuration: Scalars['jsonb'];
  updated_at: Scalars['timestamptz'];
};


/** action definitions */
export type App_ActionsEvent_ActionsArgs = {
  distinct_on: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Actions_Order_By>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


/** action definitions */
export type App_ActionsEvent_Actions_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Actions_Order_By>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


/** action definitions */
export type App_ActionsExtra_DataArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** action definitions */
export type App_ActionsType_ConfigurationArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "app.actions" */
export type App_Actions_Aggregate = {
  aggregate: Maybe<App_Actions_Aggregate_Fields>;
  nodes: Array<App_Actions>;
};

/** aggregate fields of "app.actions" */
export type App_Actions_Aggregate_Fields = {
  avg: Maybe<App_Actions_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<App_Actions_Max_Fields>;
  min: Maybe<App_Actions_Min_Fields>;
  stddev: Maybe<App_Actions_Stddev_Fields>;
  stddev_pop: Maybe<App_Actions_Stddev_Pop_Fields>;
  stddev_samp: Maybe<App_Actions_Stddev_Samp_Fields>;
  sum: Maybe<App_Actions_Sum_Fields>;
  var_pop: Maybe<App_Actions_Var_Pop_Fields>;
  var_samp: Maybe<App_Actions_Var_Samp_Fields>;
  variance: Maybe<App_Actions_Variance_Fields>;
};


/** aggregate fields of "app.actions" */
export type App_Actions_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<App_Actions_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type App_Actions_Append_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
  type_configuration?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type App_Actions_Avg_Fields = {
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  run_after: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "app.actions". All fields are combined with a logical 'AND'. */
export type App_Actions_Bool_Exp = {
  _and?: InputMaybe<Array<App_Actions_Bool_Exp>>;
  _not?: InputMaybe<App_Actions_Bool_Exp>;
  _or?: InputMaybe<Array<App_Actions_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event_actions?: InputMaybe<App_Event_Actions_Bool_Exp>;
  event_actions_aggregate?: InputMaybe<App_Event_Actions_Aggregate_Bool_Exp>;
  extra_data?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  retry_backoff?: InputMaybe<Boolean_Comparison_Exp>;
  retry_delay?: InputMaybe<Int_Comparison_Exp>;
  retry_limit?: InputMaybe<Int_Comparison_Exp>;
  run_after?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  type_configuration?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "app.actions" */
export enum App_Actions_Constraint {
  /** unique or primary key constraint on columns "slug", "app_id" */
  ActionsAppIdSlugKey = 'actions_app_id_slug_key',
  /** unique or primary key constraint on columns "id" */
  ActionsPkey = 'actions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type App_Actions_Delete_At_Path_Input = {
  extra_data?: InputMaybe<Array<Scalars['String']>>;
  type_configuration?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type App_Actions_Delete_Elem_Input = {
  extra_data?: InputMaybe<Scalars['Int']>;
  type_configuration?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type App_Actions_Delete_Key_Input = {
  extra_data?: InputMaybe<Scalars['String']>;
  type_configuration?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "app.actions" */
export type App_Actions_Inc_Input = {
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
  run_after?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "app.actions" */
export type App_Actions_Insert_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_actions?: InputMaybe<App_Event_Actions_Arr_Rel_Insert_Input>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  retry_backoff?: InputMaybe<Scalars['Boolean']>;
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
  run_after?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_configuration?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type App_Actions_Max_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  retry_delay: Maybe<Scalars['Int']>;
  retry_limit: Maybe<Scalars['Int']>;
  run_after: Maybe<Scalars['Int']>;
  slug: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type App_Actions_Min_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  retry_delay: Maybe<Scalars['Int']>;
  retry_limit: Maybe<Scalars['Int']>;
  run_after: Maybe<Scalars['Int']>;
  slug: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "app.actions" */
export type App_Actions_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Actions>;
};

/** input type for inserting object relation for remote table "app.actions" */
export type App_Actions_Obj_Rel_Insert_Input = {
  data: App_Actions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<App_Actions_On_Conflict>;
};

/** on_conflict condition type for table "app.actions" */
export type App_Actions_On_Conflict = {
  constraint: App_Actions_Constraint;
  update_columns?: Array<App_Actions_Update_Column>;
  where?: InputMaybe<App_Actions_Bool_Exp>;
};

/** Ordering options when selecting data from "app.actions". */
export type App_Actions_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_actions_aggregate?: InputMaybe<App_Event_Actions_Aggregate_Order_By>;
  extra_data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  retry_backoff?: InputMaybe<Order_By>;
  retry_delay?: InputMaybe<Order_By>;
  retry_limit?: InputMaybe<Order_By>;
  run_after?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  type_configuration?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: app.actions */
export type App_Actions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type App_Actions_Prepend_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
  type_configuration?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "app.actions" */
export enum App_Actions_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extra_data',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  RetryBackoff = 'retry_backoff',
  /** column name */
  RetryDelay = 'retry_delay',
  /** column name */
  RetryLimit = 'retry_limit',
  /** column name */
  RunAfter = 'run_after',
  /** column name */
  Slug = 'slug',
  /** column name */
  Type = 'type',
  /** column name */
  TypeConfiguration = 'type_configuration',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "app.actions" */
export type App_Actions_Set_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  retry_backoff?: InputMaybe<Scalars['Boolean']>;
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
  run_after?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_configuration?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type App_Actions_Stddev_Fields = {
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  run_after: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type App_Actions_Stddev_Pop_Fields = {
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  run_after: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type App_Actions_Stddev_Samp_Fields = {
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  run_after: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "app_actions" */
export type App_Actions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Actions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Actions_Stream_Cursor_Value_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  retry_backoff?: InputMaybe<Scalars['Boolean']>;
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
  run_after?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_configuration?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type App_Actions_Sum_Fields = {
  retry_delay: Maybe<Scalars['Int']>;
  retry_limit: Maybe<Scalars['Int']>;
  run_after: Maybe<Scalars['Int']>;
};

/** update columns of table "app.actions" */
export enum App_Actions_Update_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extra_data',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  RetryBackoff = 'retry_backoff',
  /** column name */
  RetryDelay = 'retry_delay',
  /** column name */
  RetryLimit = 'retry_limit',
  /** column name */
  RunAfter = 'run_after',
  /** column name */
  Slug = 'slug',
  /** column name */
  Type = 'type',
  /** column name */
  TypeConfiguration = 'type_configuration',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type App_Actions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<App_Actions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<App_Actions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<App_Actions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<App_Actions_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<App_Actions_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<App_Actions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<App_Actions_Set_Input>;
  where: App_Actions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type App_Actions_Var_Pop_Fields = {
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  run_after: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type App_Actions_Var_Samp_Fields = {
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  run_after: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type App_Actions_Variance_Fields = {
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  run_after: Maybe<Scalars['Float']>;
};

/** columns and relationships of "app.apps" */
export type App_Apps = {
  created_at: Scalars['timestamptz'];
  extra_data: Scalars['jsonb'];
  id: Scalars['uuid'];
  name: Scalars['String'];
};


/** columns and relationships of "app.apps" */
export type App_AppsExtra_DataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "app.apps" */
export type App_Apps_Aggregate = {
  aggregate: Maybe<App_Apps_Aggregate_Fields>;
  nodes: Array<App_Apps>;
};

/** aggregate fields of "app.apps" */
export type App_Apps_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<App_Apps_Max_Fields>;
  min: Maybe<App_Apps_Min_Fields>;
};


/** aggregate fields of "app.apps" */
export type App_Apps_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<App_Apps_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type App_Apps_Append_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "app.apps". All fields are combined with a logical 'AND'. */
export type App_Apps_Bool_Exp = {
  _and?: InputMaybe<Array<App_Apps_Bool_Exp>>;
  _not?: InputMaybe<App_Apps_Bool_Exp>;
  _or?: InputMaybe<Array<App_Apps_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  extra_data?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "app.apps" */
export enum App_Apps_Constraint {
  /** unique or primary key constraint on columns "id" */
  AppsPkey = 'apps_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type App_Apps_Delete_At_Path_Input = {
  extra_data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type App_Apps_Delete_Elem_Input = {
  extra_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type App_Apps_Delete_Key_Input = {
  extra_data?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "app.apps" */
export type App_Apps_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type App_Apps_Max_Fields = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type App_Apps_Min_Fields = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "app.apps" */
export type App_Apps_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Apps>;
};

/** on_conflict condition type for table "app.apps" */
export type App_Apps_On_Conflict = {
  constraint: App_Apps_Constraint;
  update_columns?: Array<App_Apps_Update_Column>;
  where?: InputMaybe<App_Apps_Bool_Exp>;
};

/** Ordering options when selecting data from "app.apps". */
export type App_Apps_Order_By = {
  created_at?: InputMaybe<Order_By>;
  extra_data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: app.apps */
export type App_Apps_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type App_Apps_Prepend_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "app.apps" */
export enum App_Apps_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extra_data',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "app.apps" */
export type App_Apps_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "app_apps" */
export type App_Apps_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Apps_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Apps_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "app.apps" */
export enum App_Apps_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extra_data',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type App_Apps_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<App_Apps_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<App_Apps_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<App_Apps_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<App_Apps_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<App_Apps_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<App_Apps_Set_Input>;
  where: App_Apps_Bool_Exp;
};

/** columns and relationships of "app.environments" */
export type App_Environments = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  key: Scalars['String'];
  preview: Scalars['String'];
  value: Scalars['String'];
};

/** aggregated selection of "app.environments" */
export type App_Environments_Aggregate = {
  aggregate: Maybe<App_Environments_Aggregate_Fields>;
  nodes: Array<App_Environments>;
};

/** aggregate fields of "app.environments" */
export type App_Environments_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<App_Environments_Max_Fields>;
  min: Maybe<App_Environments_Min_Fields>;
};


/** aggregate fields of "app.environments" */
export type App_Environments_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<App_Environments_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "app.environments". All fields are combined with a logical 'AND'. */
export type App_Environments_Bool_Exp = {
  _and?: InputMaybe<Array<App_Environments_Bool_Exp>>;
  _not?: InputMaybe<App_Environments_Bool_Exp>;
  _or?: InputMaybe<Array<App_Environments_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  preview?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "app.environments" */
export enum App_Environments_Constraint {
  /** unique or primary key constraint on columns "key", "app_id" */
  EnvironmentsAppIdKeyKey = 'environments_app_id_key_key',
  /** unique or primary key constraint on columns "id" */
  EnvironmentsPkey = 'environments_pkey'
}

/** input type for inserting data into table "app.environments" */
export type App_Environments_Insert_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type App_Environments_Max_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  key: Maybe<Scalars['String']>;
  preview: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type App_Environments_Min_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  key: Maybe<Scalars['String']>;
  preview: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "app.environments" */
export type App_Environments_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Environments>;
};

/** on_conflict condition type for table "app.environments" */
export type App_Environments_On_Conflict = {
  constraint: App_Environments_Constraint;
  update_columns?: Array<App_Environments_Update_Column>;
  where?: InputMaybe<App_Environments_Bool_Exp>;
};

/** Ordering options when selecting data from "app.environments". */
export type App_Environments_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  preview?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: app.environments */
export type App_Environments_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "app.environments" */
export enum App_Environments_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Preview = 'preview',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "app.environments" */
export type App_Environments_Set_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "app_environments" */
export type App_Environments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Environments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Environments_Stream_Cursor_Value_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "app.environments" */
export enum App_Environments_Update_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Preview = 'preview',
  /** column name */
  Value = 'value'
}

export type App_Environments_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<App_Environments_Set_Input>;
  where: App_Environments_Bool_Exp;
};

/** actions which are linked to events */
export type App_Event_Actions = {
  /** An object relationship */
  action: App_Actions;
  action_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  event: App_Events;
  event_id: Scalars['uuid'];
  id: Scalars['uuid'];
};

/** aggregated selection of "app.event_actions" */
export type App_Event_Actions_Aggregate = {
  aggregate: Maybe<App_Event_Actions_Aggregate_Fields>;
  nodes: Array<App_Event_Actions>;
};

export type App_Event_Actions_Aggregate_Bool_Exp = {
  count?: InputMaybe<App_Event_Actions_Aggregate_Bool_Exp_Count>;
};

export type App_Event_Actions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<App_Event_Actions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "app.event_actions" */
export type App_Event_Actions_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<App_Event_Actions_Max_Fields>;
  min: Maybe<App_Event_Actions_Min_Fields>;
};


/** aggregate fields of "app.event_actions" */
export type App_Event_Actions_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "app.event_actions" */
export type App_Event_Actions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<App_Event_Actions_Max_Order_By>;
  min?: InputMaybe<App_Event_Actions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "app.event_actions" */
export type App_Event_Actions_Arr_Rel_Insert_Input = {
  data: Array<App_Event_Actions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<App_Event_Actions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "app.event_actions". All fields are combined with a logical 'AND'. */
export type App_Event_Actions_Bool_Exp = {
  _and?: InputMaybe<Array<App_Event_Actions_Bool_Exp>>;
  _not?: InputMaybe<App_Event_Actions_Bool_Exp>;
  _or?: InputMaybe<Array<App_Event_Actions_Bool_Exp>>;
  action?: InputMaybe<App_Actions_Bool_Exp>;
  action_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event?: InputMaybe<App_Events_Bool_Exp>;
  event_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "app.event_actions" */
export enum App_Event_Actions_Constraint {
  /** unique or primary key constraint on columns "id" */
  EventActionsPkey = 'event_actions_pkey'
}

/** input type for inserting data into table "app.event_actions" */
export type App_Event_Actions_Insert_Input = {
  action?: InputMaybe<App_Actions_Obj_Rel_Insert_Input>;
  action_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event?: InputMaybe<App_Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type App_Event_Actions_Max_Fields = {
  action_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "app.event_actions" */
export type App_Event_Actions_Max_Order_By = {
  action_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type App_Event_Actions_Min_Fields = {
  action_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "app.event_actions" */
export type App_Event_Actions_Min_Order_By = {
  action_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "app.event_actions" */
export type App_Event_Actions_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Event_Actions>;
};

/** on_conflict condition type for table "app.event_actions" */
export type App_Event_Actions_On_Conflict = {
  constraint: App_Event_Actions_Constraint;
  update_columns?: Array<App_Event_Actions_Update_Column>;
  where?: InputMaybe<App_Event_Actions_Bool_Exp>;
};

/** Ordering options when selecting data from "app.event_actions". */
export type App_Event_Actions_Order_By = {
  action?: InputMaybe<App_Actions_Order_By>;
  action_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event?: InputMaybe<App_Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: app.event_actions */
export type App_Event_Actions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "app.event_actions" */
export enum App_Event_Actions_Select_Column {
  /** column name */
  ActionId = 'action_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "app.event_actions" */
export type App_Event_Actions_Set_Input = {
  action_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "app_event_actions" */
export type App_Event_Actions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Event_Actions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Event_Actions_Stream_Cursor_Value_Input = {
  action_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "app.event_actions" */
export enum App_Event_Actions_Update_Column {
  /** column name */
  ActionId = 'action_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id'
}

export type App_Event_Actions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<App_Event_Actions_Set_Input>;
  where: App_Event_Actions_Bool_Exp;
};

/** columns and relationships of "app.event_logs" */
export type App_Event_Logs = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  event: Maybe<App_Events>;
  event_id: Scalars['uuid'];
  id: Scalars['uuid'];
  payload: Scalars['jsonb'];
  trace: Maybe<Scalars['String']>;
};


/** columns and relationships of "app.event_logs" */
export type App_Event_LogsPayloadArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "app.event_logs" */
export type App_Event_Logs_Aggregate = {
  aggregate: Maybe<App_Event_Logs_Aggregate_Fields>;
  nodes: Array<App_Event_Logs>;
};

/** aggregate fields of "app.event_logs" */
export type App_Event_Logs_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<App_Event_Logs_Max_Fields>;
  min: Maybe<App_Event_Logs_Min_Fields>;
};


/** aggregate fields of "app.event_logs" */
export type App_Event_Logs_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<App_Event_Logs_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type App_Event_Logs_Append_Input = {
  payload?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "app.event_logs". All fields are combined with a logical 'AND'. */
export type App_Event_Logs_Bool_Exp = {
  _and?: InputMaybe<Array<App_Event_Logs_Bool_Exp>>;
  _not?: InputMaybe<App_Event_Logs_Bool_Exp>;
  _or?: InputMaybe<Array<App_Event_Logs_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event?: InputMaybe<App_Events_Bool_Exp>;
  event_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  payload?: InputMaybe<Jsonb_Comparison_Exp>;
  trace?: InputMaybe<String_Comparison_Exp>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type App_Event_Logs_Delete_At_Path_Input = {
  payload?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type App_Event_Logs_Delete_Elem_Input = {
  payload?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type App_Event_Logs_Delete_Key_Input = {
  payload?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "app.event_logs" */
export type App_Event_Logs_Insert_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event?: InputMaybe<App_Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
  trace?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type App_Event_Logs_Max_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  trace: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type App_Event_Logs_Min_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  trace: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "app.event_logs" */
export type App_Event_Logs_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Event_Logs>;
};

/** Ordering options when selecting data from "app.event_logs". */
export type App_Event_Logs_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event?: InputMaybe<App_Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  payload?: InputMaybe<Order_By>;
  trace?: InputMaybe<Order_By>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type App_Event_Logs_Prepend_Input = {
  payload?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "app.event_logs" */
export enum App_Event_Logs_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Payload = 'payload',
  /** column name */
  Trace = 'trace'
}

/** input type for updating data in table "app.event_logs" */
export type App_Event_Logs_Set_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
  trace?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "app_event_logs" */
export type App_Event_Logs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Event_Logs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Event_Logs_Stream_Cursor_Value_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
  trace?: InputMaybe<Scalars['String']>;
};

export type App_Event_Logs_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<App_Event_Logs_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<App_Event_Logs_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<App_Event_Logs_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<App_Event_Logs_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<App_Event_Logs_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<App_Event_Logs_Set_Input>;
  where: App_Event_Logs_Bool_Exp;
};

/** columns and relationships of "app.events" */
export type App_Events = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  event_actions: Array<App_Event_Actions>;
  /** An aggregate relationship */
  event_actions_aggregate: App_Event_Actions_Aggregate;
  extra_data: Scalars['jsonb'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "app.events" */
export type App_EventsEvent_ActionsArgs = {
  distinct_on: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Actions_Order_By>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


/** columns and relationships of "app.events" */
export type App_EventsEvent_Actions_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Actions_Order_By>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


/** columns and relationships of "app.events" */
export type App_EventsExtra_DataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "app.events" */
export type App_Events_Aggregate = {
  aggregate: Maybe<App_Events_Aggregate_Fields>;
  nodes: Array<App_Events>;
};

/** aggregate fields of "app.events" */
export type App_Events_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<App_Events_Max_Fields>;
  min: Maybe<App_Events_Min_Fields>;
};


/** aggregate fields of "app.events" */
export type App_Events_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<App_Events_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type App_Events_Append_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "app.events". All fields are combined with a logical 'AND'. */
export type App_Events_Bool_Exp = {
  _and?: InputMaybe<Array<App_Events_Bool_Exp>>;
  _not?: InputMaybe<App_Events_Bool_Exp>;
  _or?: InputMaybe<Array<App_Events_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event_actions?: InputMaybe<App_Event_Actions_Bool_Exp>;
  event_actions_aggregate?: InputMaybe<App_Event_Actions_Aggregate_Bool_Exp>;
  extra_data?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "app.events" */
export enum App_Events_Constraint {
  /** unique or primary key constraint on columns "slug", "app_id" */
  EventsAppIdSlugKey = 'events_app_id_slug_key',
  /** unique or primary key constraint on columns "id" */
  EventsPkey = 'events_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type App_Events_Delete_At_Path_Input = {
  extra_data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type App_Events_Delete_Elem_Input = {
  extra_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type App_Events_Delete_Key_Input = {
  extra_data?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "app.events" */
export type App_Events_Insert_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_actions?: InputMaybe<App_Event_Actions_Arr_Rel_Insert_Input>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type App_Events_Max_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type App_Events_Min_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "app.events" */
export type App_Events_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Events>;
};

/** input type for inserting object relation for remote table "app.events" */
export type App_Events_Obj_Rel_Insert_Input = {
  data: App_Events_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<App_Events_On_Conflict>;
};

/** on_conflict condition type for table "app.events" */
export type App_Events_On_Conflict = {
  constraint: App_Events_Constraint;
  update_columns?: Array<App_Events_Update_Column>;
  where?: InputMaybe<App_Events_Bool_Exp>;
};

/** Ordering options when selecting data from "app.events". */
export type App_Events_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_actions_aggregate?: InputMaybe<App_Event_Actions_Aggregate_Order_By>;
  extra_data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: app.events */
export type App_Events_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type App_Events_Prepend_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "app.events" */
export enum App_Events_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extra_data',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "app.events" */
export type App_Events_Set_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "app_events" */
export type App_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Events_Stream_Cursor_Value_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "app.events" */
export enum App_Events_Update_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extra_data',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type App_Events_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<App_Events_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<App_Events_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<App_Events_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<App_Events_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<App_Events_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<App_Events_Set_Input>;
  where: App_Events_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "interval". All fields are combined with logical 'AND'. */
export type Interval_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['interval']>;
  _gt?: InputMaybe<Scalars['interval']>;
  _gte?: InputMaybe<Scalars['interval']>;
  _in?: InputMaybe<Array<Scalars['interval']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['interval']>;
  _lte?: InputMaybe<Scalars['interval']>;
  _neq?: InputMaybe<Scalars['interval']>;
  _nin?: InputMaybe<Array<Scalars['interval']>>;
};

/** Boolean expression to compare columns of type "job_state". All fields are combined with logical 'AND'. */
export type Job_State_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['job_state']>;
  _gt?: InputMaybe<Scalars['job_state']>;
  _gte?: InputMaybe<Scalars['job_state']>;
  _in?: InputMaybe<Array<Scalars['job_state']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['job_state']>;
  _lte?: InputMaybe<Scalars['job_state']>;
  _neq?: InputMaybe<Scalars['job_state']>;
  _nin?: InputMaybe<Array<Scalars['job_state']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "app.action_logs" */
  delete_app_action_logs: Maybe<App_Action_Logs_Mutation_Response>;
  /** delete data from the table: "app.actions" */
  delete_app_actions: Maybe<App_Actions_Mutation_Response>;
  /** delete single row from the table: "app.actions" */
  delete_app_actions_by_pk: Maybe<App_Actions>;
  /** delete data from the table: "app.apps" */
  delete_app_apps: Maybe<App_Apps_Mutation_Response>;
  /** delete single row from the table: "app.apps" */
  delete_app_apps_by_pk: Maybe<App_Apps>;
  /** delete data from the table: "app.environments" */
  delete_app_environments: Maybe<App_Environments_Mutation_Response>;
  /** delete single row from the table: "app.environments" */
  delete_app_environments_by_pk: Maybe<App_Environments>;
  /** delete data from the table: "app.event_actions" */
  delete_app_event_actions: Maybe<App_Event_Actions_Mutation_Response>;
  /** delete single row from the table: "app.event_actions" */
  delete_app_event_actions_by_pk: Maybe<App_Event_Actions>;
  /** delete data from the table: "app.event_logs" */
  delete_app_event_logs: Maybe<App_Event_Logs_Mutation_Response>;
  /** delete data from the table: "app.events" */
  delete_app_events: Maybe<App_Events_Mutation_Response>;
  /** delete single row from the table: "app.events" */
  delete_app_events_by_pk: Maybe<App_Events>;
  /** delete data from the table: "system.archive" */
  delete_system_archive: Maybe<System_Archive_Mutation_Response>;
  /** delete data from the table: "system.job" */
  delete_system_job: Maybe<System_Job_Mutation_Response>;
  /** delete single row from the table: "system.job" */
  delete_system_job_by_pk: Maybe<System_Job>;
  /** insert data into the table: "app.action_logs" */
  insert_app_action_logs: Maybe<App_Action_Logs_Mutation_Response>;
  /** insert a single row into the table: "app.action_logs" */
  insert_app_action_logs_one: Maybe<App_Action_Logs>;
  /** insert data into the table: "app.actions" */
  insert_app_actions: Maybe<App_Actions_Mutation_Response>;
  /** insert a single row into the table: "app.actions" */
  insert_app_actions_one: Maybe<App_Actions>;
  /** insert data into the table: "app.apps" */
  insert_app_apps: Maybe<App_Apps_Mutation_Response>;
  /** insert a single row into the table: "app.apps" */
  insert_app_apps_one: Maybe<App_Apps>;
  /** insert data into the table: "app.environments" */
  insert_app_environments: Maybe<App_Environments_Mutation_Response>;
  /** insert a single row into the table: "app.environments" */
  insert_app_environments_one: Maybe<App_Environments>;
  /** insert data into the table: "app.event_actions" */
  insert_app_event_actions: Maybe<App_Event_Actions_Mutation_Response>;
  /** insert a single row into the table: "app.event_actions" */
  insert_app_event_actions_one: Maybe<App_Event_Actions>;
  /** insert data into the table: "app.event_logs" */
  insert_app_event_logs: Maybe<App_Event_Logs_Mutation_Response>;
  /** insert a single row into the table: "app.event_logs" */
  insert_app_event_logs_one: Maybe<App_Event_Logs>;
  /** insert data into the table: "app.events" */
  insert_app_events: Maybe<App_Events_Mutation_Response>;
  /** insert a single row into the table: "app.events" */
  insert_app_events_one: Maybe<App_Events>;
  /** insert data into the table: "system.archive" */
  insert_system_archive: Maybe<System_Archive_Mutation_Response>;
  /** insert a single row into the table: "system.archive" */
  insert_system_archive_one: Maybe<System_Archive>;
  /** insert data into the table: "system.job" */
  insert_system_job: Maybe<System_Job_Mutation_Response>;
  /** insert a single row into the table: "system.job" */
  insert_system_job_one: Maybe<System_Job>;
  /** update data of the table: "app.action_logs" */
  update_app_action_logs: Maybe<App_Action_Logs_Mutation_Response>;
  /** update multiples rows of table: "app.action_logs" */
  update_app_action_logs_many: Maybe<Array<Maybe<App_Action_Logs_Mutation_Response>>>;
  /** update data of the table: "app.actions" */
  update_app_actions: Maybe<App_Actions_Mutation_Response>;
  /** update single row of the table: "app.actions" */
  update_app_actions_by_pk: Maybe<App_Actions>;
  /** update multiples rows of table: "app.actions" */
  update_app_actions_many: Maybe<Array<Maybe<App_Actions_Mutation_Response>>>;
  /** update data of the table: "app.apps" */
  update_app_apps: Maybe<App_Apps_Mutation_Response>;
  /** update single row of the table: "app.apps" */
  update_app_apps_by_pk: Maybe<App_Apps>;
  /** update multiples rows of table: "app.apps" */
  update_app_apps_many: Maybe<Array<Maybe<App_Apps_Mutation_Response>>>;
  /** update data of the table: "app.environments" */
  update_app_environments: Maybe<App_Environments_Mutation_Response>;
  /** update single row of the table: "app.environments" */
  update_app_environments_by_pk: Maybe<App_Environments>;
  /** update multiples rows of table: "app.environments" */
  update_app_environments_many: Maybe<Array<Maybe<App_Environments_Mutation_Response>>>;
  /** update data of the table: "app.event_actions" */
  update_app_event_actions: Maybe<App_Event_Actions_Mutation_Response>;
  /** update single row of the table: "app.event_actions" */
  update_app_event_actions_by_pk: Maybe<App_Event_Actions>;
  /** update multiples rows of table: "app.event_actions" */
  update_app_event_actions_many: Maybe<Array<Maybe<App_Event_Actions_Mutation_Response>>>;
  /** update data of the table: "app.event_logs" */
  update_app_event_logs: Maybe<App_Event_Logs_Mutation_Response>;
  /** update multiples rows of table: "app.event_logs" */
  update_app_event_logs_many: Maybe<Array<Maybe<App_Event_Logs_Mutation_Response>>>;
  /** update data of the table: "app.events" */
  update_app_events: Maybe<App_Events_Mutation_Response>;
  /** update single row of the table: "app.events" */
  update_app_events_by_pk: Maybe<App_Events>;
  /** update multiples rows of table: "app.events" */
  update_app_events_many: Maybe<Array<Maybe<App_Events_Mutation_Response>>>;
  /** update data of the table: "system.archive" */
  update_system_archive: Maybe<System_Archive_Mutation_Response>;
  /** update multiples rows of table: "system.archive" */
  update_system_archive_many: Maybe<Array<Maybe<System_Archive_Mutation_Response>>>;
  /** update data of the table: "system.job" */
  update_system_job: Maybe<System_Job_Mutation_Response>;
  /** update single row of the table: "system.job" */
  update_system_job_by_pk: Maybe<System_Job>;
  /** update multiples rows of table: "system.job" */
  update_system_job_many: Maybe<Array<Maybe<System_Job_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_App_Action_LogsArgs = {
  where: App_Action_Logs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_App_ActionsArgs = {
  where: App_Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_App_Actions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_App_AppsArgs = {
  where: App_Apps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_App_Apps_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_App_EnvironmentsArgs = {
  where: App_Environments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_App_Environments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_App_Event_ActionsArgs = {
  where: App_Event_Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_App_Event_Actions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_App_Event_LogsArgs = {
  where: App_Event_Logs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_App_EventsArgs = {
  where: App_Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_App_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_System_ArchiveArgs = {
  where: System_Archive_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_System_JobArgs = {
  where: System_Job_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_System_Job_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_App_Action_LogsArgs = {
  objects: Array<App_Action_Logs_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_App_Action_Logs_OneArgs = {
  object: App_Action_Logs_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_App_ActionsArgs = {
  objects: Array<App_Actions_Insert_Input>;
  on_conflict: InputMaybe<App_Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_Actions_OneArgs = {
  object: App_Actions_Insert_Input;
  on_conflict: InputMaybe<App_Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_AppsArgs = {
  objects: Array<App_Apps_Insert_Input>;
  on_conflict: InputMaybe<App_Apps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_Apps_OneArgs = {
  object: App_Apps_Insert_Input;
  on_conflict: InputMaybe<App_Apps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_EnvironmentsArgs = {
  objects: Array<App_Environments_Insert_Input>;
  on_conflict: InputMaybe<App_Environments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_Environments_OneArgs = {
  object: App_Environments_Insert_Input;
  on_conflict: InputMaybe<App_Environments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_Event_ActionsArgs = {
  objects: Array<App_Event_Actions_Insert_Input>;
  on_conflict: InputMaybe<App_Event_Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_Event_Actions_OneArgs = {
  object: App_Event_Actions_Insert_Input;
  on_conflict: InputMaybe<App_Event_Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_Event_LogsArgs = {
  objects: Array<App_Event_Logs_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_App_Event_Logs_OneArgs = {
  object: App_Event_Logs_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_App_EventsArgs = {
  objects: Array<App_Events_Insert_Input>;
  on_conflict: InputMaybe<App_Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_App_Events_OneArgs = {
  object: App_Events_Insert_Input;
  on_conflict: InputMaybe<App_Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_System_ArchiveArgs = {
  objects: Array<System_Archive_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_System_Archive_OneArgs = {
  object: System_Archive_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_System_JobArgs = {
  objects: Array<System_Job_Insert_Input>;
  on_conflict: InputMaybe<System_Job_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_System_Job_OneArgs = {
  object: System_Job_Insert_Input;
  on_conflict: InputMaybe<System_Job_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_App_Action_LogsArgs = {
  _append: InputMaybe<App_Action_Logs_Append_Input>;
  _delete_at_path: InputMaybe<App_Action_Logs_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<App_Action_Logs_Delete_Elem_Input>;
  _delete_key: InputMaybe<App_Action_Logs_Delete_Key_Input>;
  _prepend: InputMaybe<App_Action_Logs_Prepend_Input>;
  _set: InputMaybe<App_Action_Logs_Set_Input>;
  where: App_Action_Logs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_App_Action_Logs_ManyArgs = {
  updates: Array<App_Action_Logs_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_App_ActionsArgs = {
  _append: InputMaybe<App_Actions_Append_Input>;
  _delete_at_path: InputMaybe<App_Actions_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<App_Actions_Delete_Elem_Input>;
  _delete_key: InputMaybe<App_Actions_Delete_Key_Input>;
  _inc: InputMaybe<App_Actions_Inc_Input>;
  _prepend: InputMaybe<App_Actions_Prepend_Input>;
  _set: InputMaybe<App_Actions_Set_Input>;
  where: App_Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_App_Actions_By_PkArgs = {
  _append: InputMaybe<App_Actions_Append_Input>;
  _delete_at_path: InputMaybe<App_Actions_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<App_Actions_Delete_Elem_Input>;
  _delete_key: InputMaybe<App_Actions_Delete_Key_Input>;
  _inc: InputMaybe<App_Actions_Inc_Input>;
  _prepend: InputMaybe<App_Actions_Prepend_Input>;
  _set: InputMaybe<App_Actions_Set_Input>;
  pk_columns: App_Actions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_App_Actions_ManyArgs = {
  updates: Array<App_Actions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_App_AppsArgs = {
  _append: InputMaybe<App_Apps_Append_Input>;
  _delete_at_path: InputMaybe<App_Apps_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<App_Apps_Delete_Elem_Input>;
  _delete_key: InputMaybe<App_Apps_Delete_Key_Input>;
  _prepend: InputMaybe<App_Apps_Prepend_Input>;
  _set: InputMaybe<App_Apps_Set_Input>;
  where: App_Apps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_App_Apps_By_PkArgs = {
  _append: InputMaybe<App_Apps_Append_Input>;
  _delete_at_path: InputMaybe<App_Apps_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<App_Apps_Delete_Elem_Input>;
  _delete_key: InputMaybe<App_Apps_Delete_Key_Input>;
  _prepend: InputMaybe<App_Apps_Prepend_Input>;
  _set: InputMaybe<App_Apps_Set_Input>;
  pk_columns: App_Apps_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_App_Apps_ManyArgs = {
  updates: Array<App_Apps_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_App_EnvironmentsArgs = {
  _set: InputMaybe<App_Environments_Set_Input>;
  where: App_Environments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_App_Environments_By_PkArgs = {
  _set: InputMaybe<App_Environments_Set_Input>;
  pk_columns: App_Environments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_App_Environments_ManyArgs = {
  updates: Array<App_Environments_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_App_Event_ActionsArgs = {
  _set: InputMaybe<App_Event_Actions_Set_Input>;
  where: App_Event_Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_App_Event_Actions_By_PkArgs = {
  _set: InputMaybe<App_Event_Actions_Set_Input>;
  pk_columns: App_Event_Actions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_App_Event_Actions_ManyArgs = {
  updates: Array<App_Event_Actions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_App_Event_LogsArgs = {
  _append: InputMaybe<App_Event_Logs_Append_Input>;
  _delete_at_path: InputMaybe<App_Event_Logs_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<App_Event_Logs_Delete_Elem_Input>;
  _delete_key: InputMaybe<App_Event_Logs_Delete_Key_Input>;
  _prepend: InputMaybe<App_Event_Logs_Prepend_Input>;
  _set: InputMaybe<App_Event_Logs_Set_Input>;
  where: App_Event_Logs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_App_Event_Logs_ManyArgs = {
  updates: Array<App_Event_Logs_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_App_EventsArgs = {
  _append: InputMaybe<App_Events_Append_Input>;
  _delete_at_path: InputMaybe<App_Events_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<App_Events_Delete_Elem_Input>;
  _delete_key: InputMaybe<App_Events_Delete_Key_Input>;
  _prepend: InputMaybe<App_Events_Prepend_Input>;
  _set: InputMaybe<App_Events_Set_Input>;
  where: App_Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_App_Events_By_PkArgs = {
  _append: InputMaybe<App_Events_Append_Input>;
  _delete_at_path: InputMaybe<App_Events_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<App_Events_Delete_Elem_Input>;
  _delete_key: InputMaybe<App_Events_Delete_Key_Input>;
  _prepend: InputMaybe<App_Events_Prepend_Input>;
  _set: InputMaybe<App_Events_Set_Input>;
  pk_columns: App_Events_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_App_Events_ManyArgs = {
  updates: Array<App_Events_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_System_ArchiveArgs = {
  _append: InputMaybe<System_Archive_Append_Input>;
  _delete_at_path: InputMaybe<System_Archive_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<System_Archive_Delete_Elem_Input>;
  _delete_key: InputMaybe<System_Archive_Delete_Key_Input>;
  _inc: InputMaybe<System_Archive_Inc_Input>;
  _prepend: InputMaybe<System_Archive_Prepend_Input>;
  _set: InputMaybe<System_Archive_Set_Input>;
  where: System_Archive_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_System_Archive_ManyArgs = {
  updates: Array<System_Archive_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_System_JobArgs = {
  _append: InputMaybe<System_Job_Append_Input>;
  _delete_at_path: InputMaybe<System_Job_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<System_Job_Delete_Elem_Input>;
  _delete_key: InputMaybe<System_Job_Delete_Key_Input>;
  _inc: InputMaybe<System_Job_Inc_Input>;
  _prepend: InputMaybe<System_Job_Prepend_Input>;
  _set: InputMaybe<System_Job_Set_Input>;
  where: System_Job_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_System_Job_By_PkArgs = {
  _append: InputMaybe<System_Job_Append_Input>;
  _delete_at_path: InputMaybe<System_Job_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<System_Job_Delete_Elem_Input>;
  _delete_key: InputMaybe<System_Job_Delete_Key_Input>;
  _inc: InputMaybe<System_Job_Inc_Input>;
  _prepend: InputMaybe<System_Job_Prepend_Input>;
  _set: InputMaybe<System_Job_Set_Input>;
  pk_columns: System_Job_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_System_Job_ManyArgs = {
  updates: Array<System_Job_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  /** fetch data from the table: "app.action_logs" */
  app_action_logs: Array<App_Action_Logs>;
  /** fetch aggregated fields from the table: "app.action_logs" */
  app_action_logs_aggregate: App_Action_Logs_Aggregate;
  /** fetch data from the table: "app.actions" */
  app_actions: Array<App_Actions>;
  /** fetch aggregated fields from the table: "app.actions" */
  app_actions_aggregate: App_Actions_Aggregate;
  /** fetch data from the table: "app.actions" using primary key columns */
  app_actions_by_pk: Maybe<App_Actions>;
  /** fetch data from the table: "app.apps" */
  app_apps: Array<App_Apps>;
  /** fetch aggregated fields from the table: "app.apps" */
  app_apps_aggregate: App_Apps_Aggregate;
  /** fetch data from the table: "app.apps" using primary key columns */
  app_apps_by_pk: Maybe<App_Apps>;
  /** fetch data from the table: "app.environments" */
  app_environments: Array<App_Environments>;
  /** fetch aggregated fields from the table: "app.environments" */
  app_environments_aggregate: App_Environments_Aggregate;
  /** fetch data from the table: "app.environments" using primary key columns */
  app_environments_by_pk: Maybe<App_Environments>;
  /** fetch data from the table: "app.event_actions" */
  app_event_actions: Array<App_Event_Actions>;
  /** fetch aggregated fields from the table: "app.event_actions" */
  app_event_actions_aggregate: App_Event_Actions_Aggregate;
  /** fetch data from the table: "app.event_actions" using primary key columns */
  app_event_actions_by_pk: Maybe<App_Event_Actions>;
  /** fetch data from the table: "app.event_logs" */
  app_event_logs: Array<App_Event_Logs>;
  /** fetch aggregated fields from the table: "app.event_logs" */
  app_event_logs_aggregate: App_Event_Logs_Aggregate;
  /** fetch data from the table: "app.events" */
  app_events: Array<App_Events>;
  /** fetch aggregated fields from the table: "app.events" */
  app_events_aggregate: App_Events_Aggregate;
  /** fetch data from the table: "app.events" using primary key columns */
  app_events_by_pk: Maybe<App_Events>;
  /** fetch data from the table: "system.archive" */
  system_archive: Array<System_Archive>;
  /** fetch aggregated fields from the table: "system.archive" */
  system_archive_aggregate: System_Archive_Aggregate;
  /** fetch data from the table: "system.job" */
  system_job: Array<System_Job>;
  /** fetch aggregated fields from the table: "system.job" */
  system_job_aggregate: System_Job_Aggregate;
  /** fetch data from the table: "system.job" using primary key columns */
  system_job_by_pk: Maybe<System_Job>;
};


export type Query_RootApp_Action_LogsArgs = {
  distinct_on: InputMaybe<Array<App_Action_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Action_Logs_Order_By>>;
  where: InputMaybe<App_Action_Logs_Bool_Exp>;
};


export type Query_RootApp_Action_Logs_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Action_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Action_Logs_Order_By>>;
  where: InputMaybe<App_Action_Logs_Bool_Exp>;
};


export type Query_RootApp_ActionsArgs = {
  distinct_on: InputMaybe<Array<App_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Actions_Order_By>>;
  where: InputMaybe<App_Actions_Bool_Exp>;
};


export type Query_RootApp_Actions_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Actions_Order_By>>;
  where: InputMaybe<App_Actions_Bool_Exp>;
};


export type Query_RootApp_Actions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootApp_AppsArgs = {
  distinct_on: InputMaybe<Array<App_Apps_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Apps_Order_By>>;
  where: InputMaybe<App_Apps_Bool_Exp>;
};


export type Query_RootApp_Apps_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Apps_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Apps_Order_By>>;
  where: InputMaybe<App_Apps_Bool_Exp>;
};


export type Query_RootApp_Apps_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootApp_EnvironmentsArgs = {
  distinct_on: InputMaybe<Array<App_Environments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Environments_Order_By>>;
  where: InputMaybe<App_Environments_Bool_Exp>;
};


export type Query_RootApp_Environments_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Environments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Environments_Order_By>>;
  where: InputMaybe<App_Environments_Bool_Exp>;
};


export type Query_RootApp_Environments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootApp_Event_ActionsArgs = {
  distinct_on: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Actions_Order_By>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


export type Query_RootApp_Event_Actions_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Actions_Order_By>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


export type Query_RootApp_Event_Actions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootApp_Event_LogsArgs = {
  distinct_on: InputMaybe<Array<App_Event_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Logs_Order_By>>;
  where: InputMaybe<App_Event_Logs_Bool_Exp>;
};


export type Query_RootApp_Event_Logs_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Event_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Logs_Order_By>>;
  where: InputMaybe<App_Event_Logs_Bool_Exp>;
};


export type Query_RootApp_EventsArgs = {
  distinct_on: InputMaybe<Array<App_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Events_Order_By>>;
  where: InputMaybe<App_Events_Bool_Exp>;
};


export type Query_RootApp_Events_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Events_Order_By>>;
  where: InputMaybe<App_Events_Bool_Exp>;
};


export type Query_RootApp_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSystem_ArchiveArgs = {
  distinct_on: InputMaybe<Array<System_Archive_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<System_Archive_Order_By>>;
  where: InputMaybe<System_Archive_Bool_Exp>;
};


export type Query_RootSystem_Archive_AggregateArgs = {
  distinct_on: InputMaybe<Array<System_Archive_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<System_Archive_Order_By>>;
  where: InputMaybe<System_Archive_Bool_Exp>;
};


export type Query_RootSystem_JobArgs = {
  distinct_on: InputMaybe<Array<System_Job_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<System_Job_Order_By>>;
  where: InputMaybe<System_Job_Bool_Exp>;
};


export type Query_RootSystem_Job_AggregateArgs = {
  distinct_on: InputMaybe<Array<System_Job_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<System_Job_Order_By>>;
  where: InputMaybe<System_Job_Bool_Exp>;
};


export type Query_RootSystem_Job_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  /** fetch data from the table: "app.action_logs" */
  app_action_logs: Array<App_Action_Logs>;
  /** fetch aggregated fields from the table: "app.action_logs" */
  app_action_logs_aggregate: App_Action_Logs_Aggregate;
  /** fetch data from the table in a streaming manner: "app.action_logs" */
  app_action_logs_stream: Array<App_Action_Logs>;
  /** fetch data from the table: "app.actions" */
  app_actions: Array<App_Actions>;
  /** fetch aggregated fields from the table: "app.actions" */
  app_actions_aggregate: App_Actions_Aggregate;
  /** fetch data from the table: "app.actions" using primary key columns */
  app_actions_by_pk: Maybe<App_Actions>;
  /** fetch data from the table in a streaming manner: "app.actions" */
  app_actions_stream: Array<App_Actions>;
  /** fetch data from the table: "app.apps" */
  app_apps: Array<App_Apps>;
  /** fetch aggregated fields from the table: "app.apps" */
  app_apps_aggregate: App_Apps_Aggregate;
  /** fetch data from the table: "app.apps" using primary key columns */
  app_apps_by_pk: Maybe<App_Apps>;
  /** fetch data from the table in a streaming manner: "app.apps" */
  app_apps_stream: Array<App_Apps>;
  /** fetch data from the table: "app.environments" */
  app_environments: Array<App_Environments>;
  /** fetch aggregated fields from the table: "app.environments" */
  app_environments_aggregate: App_Environments_Aggregate;
  /** fetch data from the table: "app.environments" using primary key columns */
  app_environments_by_pk: Maybe<App_Environments>;
  /** fetch data from the table in a streaming manner: "app.environments" */
  app_environments_stream: Array<App_Environments>;
  /** fetch data from the table: "app.event_actions" */
  app_event_actions: Array<App_Event_Actions>;
  /** fetch aggregated fields from the table: "app.event_actions" */
  app_event_actions_aggregate: App_Event_Actions_Aggregate;
  /** fetch data from the table: "app.event_actions" using primary key columns */
  app_event_actions_by_pk: Maybe<App_Event_Actions>;
  /** fetch data from the table in a streaming manner: "app.event_actions" */
  app_event_actions_stream: Array<App_Event_Actions>;
  /** fetch data from the table: "app.event_logs" */
  app_event_logs: Array<App_Event_Logs>;
  /** fetch aggregated fields from the table: "app.event_logs" */
  app_event_logs_aggregate: App_Event_Logs_Aggregate;
  /** fetch data from the table in a streaming manner: "app.event_logs" */
  app_event_logs_stream: Array<App_Event_Logs>;
  /** fetch data from the table: "app.events" */
  app_events: Array<App_Events>;
  /** fetch aggregated fields from the table: "app.events" */
  app_events_aggregate: App_Events_Aggregate;
  /** fetch data from the table: "app.events" using primary key columns */
  app_events_by_pk: Maybe<App_Events>;
  /** fetch data from the table in a streaming manner: "app.events" */
  app_events_stream: Array<App_Events>;
  /** fetch data from the table: "system.archive" */
  system_archive: Array<System_Archive>;
  /** fetch aggregated fields from the table: "system.archive" */
  system_archive_aggregate: System_Archive_Aggregate;
  /** fetch data from the table in a streaming manner: "system.archive" */
  system_archive_stream: Array<System_Archive>;
  /** fetch data from the table: "system.job" */
  system_job: Array<System_Job>;
  /** fetch aggregated fields from the table: "system.job" */
  system_job_aggregate: System_Job_Aggregate;
  /** fetch data from the table: "system.job" using primary key columns */
  system_job_by_pk: Maybe<System_Job>;
  /** fetch data from the table in a streaming manner: "system.job" */
  system_job_stream: Array<System_Job>;
};


export type Subscription_RootApp_Action_LogsArgs = {
  distinct_on: InputMaybe<Array<App_Action_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Action_Logs_Order_By>>;
  where: InputMaybe<App_Action_Logs_Bool_Exp>;
};


export type Subscription_RootApp_Action_Logs_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Action_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Action_Logs_Order_By>>;
  where: InputMaybe<App_Action_Logs_Bool_Exp>;
};


export type Subscription_RootApp_Action_Logs_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Action_Logs_Stream_Cursor_Input>>;
  where: InputMaybe<App_Action_Logs_Bool_Exp>;
};


export type Subscription_RootApp_ActionsArgs = {
  distinct_on: InputMaybe<Array<App_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Actions_Order_By>>;
  where: InputMaybe<App_Actions_Bool_Exp>;
};


export type Subscription_RootApp_Actions_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Actions_Order_By>>;
  where: InputMaybe<App_Actions_Bool_Exp>;
};


export type Subscription_RootApp_Actions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootApp_Actions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Actions_Stream_Cursor_Input>>;
  where: InputMaybe<App_Actions_Bool_Exp>;
};


export type Subscription_RootApp_AppsArgs = {
  distinct_on: InputMaybe<Array<App_Apps_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Apps_Order_By>>;
  where: InputMaybe<App_Apps_Bool_Exp>;
};


export type Subscription_RootApp_Apps_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Apps_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Apps_Order_By>>;
  where: InputMaybe<App_Apps_Bool_Exp>;
};


export type Subscription_RootApp_Apps_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootApp_Apps_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Apps_Stream_Cursor_Input>>;
  where: InputMaybe<App_Apps_Bool_Exp>;
};


export type Subscription_RootApp_EnvironmentsArgs = {
  distinct_on: InputMaybe<Array<App_Environments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Environments_Order_By>>;
  where: InputMaybe<App_Environments_Bool_Exp>;
};


export type Subscription_RootApp_Environments_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Environments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Environments_Order_By>>;
  where: InputMaybe<App_Environments_Bool_Exp>;
};


export type Subscription_RootApp_Environments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootApp_Environments_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Environments_Stream_Cursor_Input>>;
  where: InputMaybe<App_Environments_Bool_Exp>;
};


export type Subscription_RootApp_Event_ActionsArgs = {
  distinct_on: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Actions_Order_By>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


export type Subscription_RootApp_Event_Actions_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Event_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Actions_Order_By>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


export type Subscription_RootApp_Event_Actions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootApp_Event_Actions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Event_Actions_Stream_Cursor_Input>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


export type Subscription_RootApp_Event_LogsArgs = {
  distinct_on: InputMaybe<Array<App_Event_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Logs_Order_By>>;
  where: InputMaybe<App_Event_Logs_Bool_Exp>;
};


export type Subscription_RootApp_Event_Logs_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Event_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Logs_Order_By>>;
  where: InputMaybe<App_Event_Logs_Bool_Exp>;
};


export type Subscription_RootApp_Event_Logs_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Event_Logs_Stream_Cursor_Input>>;
  where: InputMaybe<App_Event_Logs_Bool_Exp>;
};


export type Subscription_RootApp_EventsArgs = {
  distinct_on: InputMaybe<Array<App_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Events_Order_By>>;
  where: InputMaybe<App_Events_Bool_Exp>;
};


export type Subscription_RootApp_Events_AggregateArgs = {
  distinct_on: InputMaybe<Array<App_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Events_Order_By>>;
  where: InputMaybe<App_Events_Bool_Exp>;
};


export type Subscription_RootApp_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootApp_Events_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Events_Stream_Cursor_Input>>;
  where: InputMaybe<App_Events_Bool_Exp>;
};


export type Subscription_RootSystem_ArchiveArgs = {
  distinct_on: InputMaybe<Array<System_Archive_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<System_Archive_Order_By>>;
  where: InputMaybe<System_Archive_Bool_Exp>;
};


export type Subscription_RootSystem_Archive_AggregateArgs = {
  distinct_on: InputMaybe<Array<System_Archive_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<System_Archive_Order_By>>;
  where: InputMaybe<System_Archive_Bool_Exp>;
};


export type Subscription_RootSystem_Archive_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<System_Archive_Stream_Cursor_Input>>;
  where: InputMaybe<System_Archive_Bool_Exp>;
};


export type Subscription_RootSystem_JobArgs = {
  distinct_on: InputMaybe<Array<System_Job_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<System_Job_Order_By>>;
  where: InputMaybe<System_Job_Bool_Exp>;
};


export type Subscription_RootSystem_Job_AggregateArgs = {
  distinct_on: InputMaybe<Array<System_Job_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<System_Job_Order_By>>;
  where: InputMaybe<System_Job_Bool_Exp>;
};


export type Subscription_RootSystem_Job_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootSystem_Job_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<System_Job_Stream_Cursor_Input>>;
  where: InputMaybe<System_Job_Bool_Exp>;
};

/** columns and relationships of "system.archive" */
export type System_Archive = {
  /** An object relationship */
  action_log: Maybe<App_Action_Logs>;
  archivedon: Scalars['timestamptz'];
  completedon: Maybe<Scalars['timestamptz']>;
  createdon: Scalars['timestamptz'];
  data: Maybe<Scalars['jsonb']>;
  expirein: Scalars['interval'];
  id: Scalars['uuid'];
  keepuntil: Scalars['timestamptz'];
  name: Scalars['String'];
  on_complete: Scalars['Boolean'];
  output: Maybe<Scalars['jsonb']>;
  priority: Scalars['Int'];
  retrybackoff: Scalars['Boolean'];
  retrycount: Scalars['Int'];
  retrydelay: Scalars['Int'];
  retrylimit: Scalars['Int'];
  singletonkey: Maybe<Scalars['String']>;
  singletonon: Maybe<Scalars['timestamp']>;
  startafter: Scalars['timestamptz'];
  startedon: Maybe<Scalars['timestamptz']>;
  state: Scalars['job_state'];
};


/** columns and relationships of "system.archive" */
export type System_ArchiveDataArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "system.archive" */
export type System_ArchiveOutputArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "system.archive" */
export type System_Archive_Aggregate = {
  aggregate: Maybe<System_Archive_Aggregate_Fields>;
  nodes: Array<System_Archive>;
};

/** aggregate fields of "system.archive" */
export type System_Archive_Aggregate_Fields = {
  avg: Maybe<System_Archive_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<System_Archive_Max_Fields>;
  min: Maybe<System_Archive_Min_Fields>;
  stddev: Maybe<System_Archive_Stddev_Fields>;
  stddev_pop: Maybe<System_Archive_Stddev_Pop_Fields>;
  stddev_samp: Maybe<System_Archive_Stddev_Samp_Fields>;
  sum: Maybe<System_Archive_Sum_Fields>;
  var_pop: Maybe<System_Archive_Var_Pop_Fields>;
  var_samp: Maybe<System_Archive_Var_Samp_Fields>;
  variance: Maybe<System_Archive_Variance_Fields>;
};


/** aggregate fields of "system.archive" */
export type System_Archive_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<System_Archive_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type System_Archive_Append_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
  output?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type System_Archive_Avg_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "system.archive". All fields are combined with a logical 'AND'. */
export type System_Archive_Bool_Exp = {
  _and?: InputMaybe<Array<System_Archive_Bool_Exp>>;
  _not?: InputMaybe<System_Archive_Bool_Exp>;
  _or?: InputMaybe<Array<System_Archive_Bool_Exp>>;
  action_log?: InputMaybe<App_Action_Logs_Bool_Exp>;
  archivedon?: InputMaybe<Timestamptz_Comparison_Exp>;
  completedon?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdon?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  expirein?: InputMaybe<Interval_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  keepuntil?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  on_complete?: InputMaybe<Boolean_Comparison_Exp>;
  output?: InputMaybe<Jsonb_Comparison_Exp>;
  priority?: InputMaybe<Int_Comparison_Exp>;
  retrybackoff?: InputMaybe<Boolean_Comparison_Exp>;
  retrycount?: InputMaybe<Int_Comparison_Exp>;
  retrydelay?: InputMaybe<Int_Comparison_Exp>;
  retrylimit?: InputMaybe<Int_Comparison_Exp>;
  singletonkey?: InputMaybe<String_Comparison_Exp>;
  singletonon?: InputMaybe<Timestamp_Comparison_Exp>;
  startafter?: InputMaybe<Timestamptz_Comparison_Exp>;
  startedon?: InputMaybe<Timestamptz_Comparison_Exp>;
  state?: InputMaybe<Job_State_Comparison_Exp>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type System_Archive_Delete_At_Path_Input = {
  data?: InputMaybe<Array<Scalars['String']>>;
  output?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type System_Archive_Delete_Elem_Input = {
  data?: InputMaybe<Scalars['Int']>;
  output?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type System_Archive_Delete_Key_Input = {
  data?: InputMaybe<Scalars['String']>;
  output?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "system.archive" */
export type System_Archive_Inc_Input = {
  priority?: InputMaybe<Scalars['Int']>;
  retrycount?: InputMaybe<Scalars['Int']>;
  retrydelay?: InputMaybe<Scalars['Int']>;
  retrylimit?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "system.archive" */
export type System_Archive_Insert_Input = {
  action_log?: InputMaybe<App_Action_Logs_Obj_Rel_Insert_Input>;
  archivedon?: InputMaybe<Scalars['timestamptz']>;
  completedon?: InputMaybe<Scalars['timestamptz']>;
  createdon?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  expirein?: InputMaybe<Scalars['interval']>;
  id?: InputMaybe<Scalars['uuid']>;
  keepuntil?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  on_complete?: InputMaybe<Scalars['Boolean']>;
  output?: InputMaybe<Scalars['jsonb']>;
  priority?: InputMaybe<Scalars['Int']>;
  retrybackoff?: InputMaybe<Scalars['Boolean']>;
  retrycount?: InputMaybe<Scalars['Int']>;
  retrydelay?: InputMaybe<Scalars['Int']>;
  retrylimit?: InputMaybe<Scalars['Int']>;
  singletonkey?: InputMaybe<Scalars['String']>;
  singletonon?: InputMaybe<Scalars['timestamp']>;
  startafter?: InputMaybe<Scalars['timestamptz']>;
  startedon?: InputMaybe<Scalars['timestamptz']>;
  state?: InputMaybe<Scalars['job_state']>;
};

/** aggregate max on columns */
export type System_Archive_Max_Fields = {
  archivedon: Maybe<Scalars['timestamptz']>;
  completedon: Maybe<Scalars['timestamptz']>;
  createdon: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  keepuntil: Maybe<Scalars['timestamptz']>;
  name: Maybe<Scalars['String']>;
  priority: Maybe<Scalars['Int']>;
  retrycount: Maybe<Scalars['Int']>;
  retrydelay: Maybe<Scalars['Int']>;
  retrylimit: Maybe<Scalars['Int']>;
  singletonkey: Maybe<Scalars['String']>;
  singletonon: Maybe<Scalars['timestamp']>;
  startafter: Maybe<Scalars['timestamptz']>;
  startedon: Maybe<Scalars['timestamptz']>;
  state: Maybe<Scalars['job_state']>;
};

/** aggregate min on columns */
export type System_Archive_Min_Fields = {
  archivedon: Maybe<Scalars['timestamptz']>;
  completedon: Maybe<Scalars['timestamptz']>;
  createdon: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  keepuntil: Maybe<Scalars['timestamptz']>;
  name: Maybe<Scalars['String']>;
  priority: Maybe<Scalars['Int']>;
  retrycount: Maybe<Scalars['Int']>;
  retrydelay: Maybe<Scalars['Int']>;
  retrylimit: Maybe<Scalars['Int']>;
  singletonkey: Maybe<Scalars['String']>;
  singletonon: Maybe<Scalars['timestamp']>;
  startafter: Maybe<Scalars['timestamptz']>;
  startedon: Maybe<Scalars['timestamptz']>;
  state: Maybe<Scalars['job_state']>;
};

/** response of any mutation on the table "system.archive" */
export type System_Archive_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<System_Archive>;
};

/** Ordering options when selecting data from "system.archive". */
export type System_Archive_Order_By = {
  action_log?: InputMaybe<App_Action_Logs_Order_By>;
  archivedon?: InputMaybe<Order_By>;
  completedon?: InputMaybe<Order_By>;
  createdon?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  expirein?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  keepuntil?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  on_complete?: InputMaybe<Order_By>;
  output?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  retrybackoff?: InputMaybe<Order_By>;
  retrycount?: InputMaybe<Order_By>;
  retrydelay?: InputMaybe<Order_By>;
  retrylimit?: InputMaybe<Order_By>;
  singletonkey?: InputMaybe<Order_By>;
  singletonon?: InputMaybe<Order_By>;
  startafter?: InputMaybe<Order_By>;
  startedon?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type System_Archive_Prepend_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
  output?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "system.archive" */
export enum System_Archive_Select_Column {
  /** column name */
  Archivedon = 'archivedon',
  /** column name */
  Completedon = 'completedon',
  /** column name */
  Createdon = 'createdon',
  /** column name */
  Data = 'data',
  /** column name */
  Expirein = 'expirein',
  /** column name */
  Id = 'id',
  /** column name */
  Keepuntil = 'keepuntil',
  /** column name */
  Name = 'name',
  /** column name */
  OnComplete = 'on_complete',
  /** column name */
  Output = 'output',
  /** column name */
  Priority = 'priority',
  /** column name */
  Retrybackoff = 'retrybackoff',
  /** column name */
  Retrycount = 'retrycount',
  /** column name */
  Retrydelay = 'retrydelay',
  /** column name */
  Retrylimit = 'retrylimit',
  /** column name */
  Singletonkey = 'singletonkey',
  /** column name */
  Singletonon = 'singletonon',
  /** column name */
  Startafter = 'startafter',
  /** column name */
  Startedon = 'startedon',
  /** column name */
  State = 'state'
}

/** input type for updating data in table "system.archive" */
export type System_Archive_Set_Input = {
  archivedon?: InputMaybe<Scalars['timestamptz']>;
  completedon?: InputMaybe<Scalars['timestamptz']>;
  createdon?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  expirein?: InputMaybe<Scalars['interval']>;
  id?: InputMaybe<Scalars['uuid']>;
  keepuntil?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  on_complete?: InputMaybe<Scalars['Boolean']>;
  output?: InputMaybe<Scalars['jsonb']>;
  priority?: InputMaybe<Scalars['Int']>;
  retrybackoff?: InputMaybe<Scalars['Boolean']>;
  retrycount?: InputMaybe<Scalars['Int']>;
  retrydelay?: InputMaybe<Scalars['Int']>;
  retrylimit?: InputMaybe<Scalars['Int']>;
  singletonkey?: InputMaybe<Scalars['String']>;
  singletonon?: InputMaybe<Scalars['timestamp']>;
  startafter?: InputMaybe<Scalars['timestamptz']>;
  startedon?: InputMaybe<Scalars['timestamptz']>;
  state?: InputMaybe<Scalars['job_state']>;
};

/** aggregate stddev on columns */
export type System_Archive_Stddev_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type System_Archive_Stddev_Pop_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type System_Archive_Stddev_Samp_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "system_archive" */
export type System_Archive_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: System_Archive_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type System_Archive_Stream_Cursor_Value_Input = {
  archivedon?: InputMaybe<Scalars['timestamptz']>;
  completedon?: InputMaybe<Scalars['timestamptz']>;
  createdon?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  expirein?: InputMaybe<Scalars['interval']>;
  id?: InputMaybe<Scalars['uuid']>;
  keepuntil?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  on_complete?: InputMaybe<Scalars['Boolean']>;
  output?: InputMaybe<Scalars['jsonb']>;
  priority?: InputMaybe<Scalars['Int']>;
  retrybackoff?: InputMaybe<Scalars['Boolean']>;
  retrycount?: InputMaybe<Scalars['Int']>;
  retrydelay?: InputMaybe<Scalars['Int']>;
  retrylimit?: InputMaybe<Scalars['Int']>;
  singletonkey?: InputMaybe<Scalars['String']>;
  singletonon?: InputMaybe<Scalars['timestamp']>;
  startafter?: InputMaybe<Scalars['timestamptz']>;
  startedon?: InputMaybe<Scalars['timestamptz']>;
  state?: InputMaybe<Scalars['job_state']>;
};

/** aggregate sum on columns */
export type System_Archive_Sum_Fields = {
  priority: Maybe<Scalars['Int']>;
  retrycount: Maybe<Scalars['Int']>;
  retrydelay: Maybe<Scalars['Int']>;
  retrylimit: Maybe<Scalars['Int']>;
};

export type System_Archive_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<System_Archive_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<System_Archive_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<System_Archive_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<System_Archive_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<System_Archive_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<System_Archive_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<System_Archive_Set_Input>;
  where: System_Archive_Bool_Exp;
};

/** aggregate var_pop on columns */
export type System_Archive_Var_Pop_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type System_Archive_Var_Samp_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type System_Archive_Variance_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** columns and relationships of "system.job" */
export type System_Job = {
  /** An object relationship */
  action_log: Maybe<App_Action_Logs>;
  completedon: Maybe<Scalars['timestamptz']>;
  createdon: Scalars['timestamptz'];
  data: Maybe<Scalars['jsonb']>;
  expirein: Scalars['interval'];
  id: Scalars['uuid'];
  keepuntil: Scalars['timestamptz'];
  name: Scalars['String'];
  on_complete: Scalars['Boolean'];
  output: Maybe<Scalars['jsonb']>;
  priority: Scalars['Int'];
  retrybackoff: Scalars['Boolean'];
  retrycount: Scalars['Int'];
  retrydelay: Scalars['Int'];
  retrylimit: Scalars['Int'];
  singletonkey: Maybe<Scalars['String']>;
  singletonon: Maybe<Scalars['timestamp']>;
  startafter: Scalars['timestamptz'];
  startedon: Maybe<Scalars['timestamptz']>;
  state: Scalars['job_state'];
};


/** columns and relationships of "system.job" */
export type System_JobDataArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "system.job" */
export type System_JobOutputArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "system.job" */
export type System_Job_Aggregate = {
  aggregate: Maybe<System_Job_Aggregate_Fields>;
  nodes: Array<System_Job>;
};

/** aggregate fields of "system.job" */
export type System_Job_Aggregate_Fields = {
  avg: Maybe<System_Job_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<System_Job_Max_Fields>;
  min: Maybe<System_Job_Min_Fields>;
  stddev: Maybe<System_Job_Stddev_Fields>;
  stddev_pop: Maybe<System_Job_Stddev_Pop_Fields>;
  stddev_samp: Maybe<System_Job_Stddev_Samp_Fields>;
  sum: Maybe<System_Job_Sum_Fields>;
  var_pop: Maybe<System_Job_Var_Pop_Fields>;
  var_samp: Maybe<System_Job_Var_Samp_Fields>;
  variance: Maybe<System_Job_Variance_Fields>;
};


/** aggregate fields of "system.job" */
export type System_Job_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<System_Job_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type System_Job_Append_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
  output?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type System_Job_Avg_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "system.job". All fields are combined with a logical 'AND'. */
export type System_Job_Bool_Exp = {
  _and?: InputMaybe<Array<System_Job_Bool_Exp>>;
  _not?: InputMaybe<System_Job_Bool_Exp>;
  _or?: InputMaybe<Array<System_Job_Bool_Exp>>;
  action_log?: InputMaybe<App_Action_Logs_Bool_Exp>;
  completedon?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdon?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  expirein?: InputMaybe<Interval_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  keepuntil?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  on_complete?: InputMaybe<Boolean_Comparison_Exp>;
  output?: InputMaybe<Jsonb_Comparison_Exp>;
  priority?: InputMaybe<Int_Comparison_Exp>;
  retrybackoff?: InputMaybe<Boolean_Comparison_Exp>;
  retrycount?: InputMaybe<Int_Comparison_Exp>;
  retrydelay?: InputMaybe<Int_Comparison_Exp>;
  retrylimit?: InputMaybe<Int_Comparison_Exp>;
  singletonkey?: InputMaybe<String_Comparison_Exp>;
  singletonon?: InputMaybe<Timestamp_Comparison_Exp>;
  startafter?: InputMaybe<Timestamptz_Comparison_Exp>;
  startedon?: InputMaybe<Timestamptz_Comparison_Exp>;
  state?: InputMaybe<Job_State_Comparison_Exp>;
};

/** unique or primary key constraints on table "system.job" */
export enum System_Job_Constraint {
  /** unique or primary key constraint on columns "id" */
  JobPkey = 'job_pkey',
  /** unique or primary key constraint on columns "name", "singletonkey" */
  JobSingletonQueue = 'job_singleton_queue',
  /** unique or primary key constraint on columns "name", "singletonkey" */
  JobSingletonkey = 'job_singletonkey',
  /** unique or primary key constraint on columns "name", "singletonkey", "singletonon" */
  JobSingletonkeyon = 'job_singletonkeyon',
  /** unique or primary key constraint on columns "name", "singletonon" */
  JobSingletonon = 'job_singletonon'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type System_Job_Delete_At_Path_Input = {
  data?: InputMaybe<Array<Scalars['String']>>;
  output?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type System_Job_Delete_Elem_Input = {
  data?: InputMaybe<Scalars['Int']>;
  output?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type System_Job_Delete_Key_Input = {
  data?: InputMaybe<Scalars['String']>;
  output?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "system.job" */
export type System_Job_Inc_Input = {
  priority?: InputMaybe<Scalars['Int']>;
  retrycount?: InputMaybe<Scalars['Int']>;
  retrydelay?: InputMaybe<Scalars['Int']>;
  retrylimit?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "system.job" */
export type System_Job_Insert_Input = {
  action_log?: InputMaybe<App_Action_Logs_Obj_Rel_Insert_Input>;
  completedon?: InputMaybe<Scalars['timestamptz']>;
  createdon?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  expirein?: InputMaybe<Scalars['interval']>;
  id?: InputMaybe<Scalars['uuid']>;
  keepuntil?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  on_complete?: InputMaybe<Scalars['Boolean']>;
  output?: InputMaybe<Scalars['jsonb']>;
  priority?: InputMaybe<Scalars['Int']>;
  retrybackoff?: InputMaybe<Scalars['Boolean']>;
  retrycount?: InputMaybe<Scalars['Int']>;
  retrydelay?: InputMaybe<Scalars['Int']>;
  retrylimit?: InputMaybe<Scalars['Int']>;
  singletonkey?: InputMaybe<Scalars['String']>;
  singletonon?: InputMaybe<Scalars['timestamp']>;
  startafter?: InputMaybe<Scalars['timestamptz']>;
  startedon?: InputMaybe<Scalars['timestamptz']>;
  state?: InputMaybe<Scalars['job_state']>;
};

/** aggregate max on columns */
export type System_Job_Max_Fields = {
  completedon: Maybe<Scalars['timestamptz']>;
  createdon: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  keepuntil: Maybe<Scalars['timestamptz']>;
  name: Maybe<Scalars['String']>;
  priority: Maybe<Scalars['Int']>;
  retrycount: Maybe<Scalars['Int']>;
  retrydelay: Maybe<Scalars['Int']>;
  retrylimit: Maybe<Scalars['Int']>;
  singletonkey: Maybe<Scalars['String']>;
  singletonon: Maybe<Scalars['timestamp']>;
  startafter: Maybe<Scalars['timestamptz']>;
  startedon: Maybe<Scalars['timestamptz']>;
  state: Maybe<Scalars['job_state']>;
};

/** aggregate min on columns */
export type System_Job_Min_Fields = {
  completedon: Maybe<Scalars['timestamptz']>;
  createdon: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  keepuntil: Maybe<Scalars['timestamptz']>;
  name: Maybe<Scalars['String']>;
  priority: Maybe<Scalars['Int']>;
  retrycount: Maybe<Scalars['Int']>;
  retrydelay: Maybe<Scalars['Int']>;
  retrylimit: Maybe<Scalars['Int']>;
  singletonkey: Maybe<Scalars['String']>;
  singletonon: Maybe<Scalars['timestamp']>;
  startafter: Maybe<Scalars['timestamptz']>;
  startedon: Maybe<Scalars['timestamptz']>;
  state: Maybe<Scalars['job_state']>;
};

/** response of any mutation on the table "system.job" */
export type System_Job_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<System_Job>;
};

/** input type for inserting object relation for remote table "system.job" */
export type System_Job_Obj_Rel_Insert_Input = {
  data: System_Job_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<System_Job_On_Conflict>;
};

/** on_conflict condition type for table "system.job" */
export type System_Job_On_Conflict = {
  constraint: System_Job_Constraint;
  update_columns?: Array<System_Job_Update_Column>;
  where?: InputMaybe<System_Job_Bool_Exp>;
};

/** Ordering options when selecting data from "system.job". */
export type System_Job_Order_By = {
  action_log?: InputMaybe<App_Action_Logs_Order_By>;
  completedon?: InputMaybe<Order_By>;
  createdon?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  expirein?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  keepuntil?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  on_complete?: InputMaybe<Order_By>;
  output?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  retrybackoff?: InputMaybe<Order_By>;
  retrycount?: InputMaybe<Order_By>;
  retrydelay?: InputMaybe<Order_By>;
  retrylimit?: InputMaybe<Order_By>;
  singletonkey?: InputMaybe<Order_By>;
  singletonon?: InputMaybe<Order_By>;
  startafter?: InputMaybe<Order_By>;
  startedon?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
};

/** primary key columns input for table: system.job */
export type System_Job_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type System_Job_Prepend_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
  output?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "system.job" */
export enum System_Job_Select_Column {
  /** column name */
  Completedon = 'completedon',
  /** column name */
  Createdon = 'createdon',
  /** column name */
  Data = 'data',
  /** column name */
  Expirein = 'expirein',
  /** column name */
  Id = 'id',
  /** column name */
  Keepuntil = 'keepuntil',
  /** column name */
  Name = 'name',
  /** column name */
  OnComplete = 'on_complete',
  /** column name */
  Output = 'output',
  /** column name */
  Priority = 'priority',
  /** column name */
  Retrybackoff = 'retrybackoff',
  /** column name */
  Retrycount = 'retrycount',
  /** column name */
  Retrydelay = 'retrydelay',
  /** column name */
  Retrylimit = 'retrylimit',
  /** column name */
  Singletonkey = 'singletonkey',
  /** column name */
  Singletonon = 'singletonon',
  /** column name */
  Startafter = 'startafter',
  /** column name */
  Startedon = 'startedon',
  /** column name */
  State = 'state'
}

/** input type for updating data in table "system.job" */
export type System_Job_Set_Input = {
  completedon?: InputMaybe<Scalars['timestamptz']>;
  createdon?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  expirein?: InputMaybe<Scalars['interval']>;
  id?: InputMaybe<Scalars['uuid']>;
  keepuntil?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  on_complete?: InputMaybe<Scalars['Boolean']>;
  output?: InputMaybe<Scalars['jsonb']>;
  priority?: InputMaybe<Scalars['Int']>;
  retrybackoff?: InputMaybe<Scalars['Boolean']>;
  retrycount?: InputMaybe<Scalars['Int']>;
  retrydelay?: InputMaybe<Scalars['Int']>;
  retrylimit?: InputMaybe<Scalars['Int']>;
  singletonkey?: InputMaybe<Scalars['String']>;
  singletonon?: InputMaybe<Scalars['timestamp']>;
  startafter?: InputMaybe<Scalars['timestamptz']>;
  startedon?: InputMaybe<Scalars['timestamptz']>;
  state?: InputMaybe<Scalars['job_state']>;
};

/** aggregate stddev on columns */
export type System_Job_Stddev_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type System_Job_Stddev_Pop_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type System_Job_Stddev_Samp_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "system_job" */
export type System_Job_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: System_Job_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type System_Job_Stream_Cursor_Value_Input = {
  completedon?: InputMaybe<Scalars['timestamptz']>;
  createdon?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  expirein?: InputMaybe<Scalars['interval']>;
  id?: InputMaybe<Scalars['uuid']>;
  keepuntil?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  on_complete?: InputMaybe<Scalars['Boolean']>;
  output?: InputMaybe<Scalars['jsonb']>;
  priority?: InputMaybe<Scalars['Int']>;
  retrybackoff?: InputMaybe<Scalars['Boolean']>;
  retrycount?: InputMaybe<Scalars['Int']>;
  retrydelay?: InputMaybe<Scalars['Int']>;
  retrylimit?: InputMaybe<Scalars['Int']>;
  singletonkey?: InputMaybe<Scalars['String']>;
  singletonon?: InputMaybe<Scalars['timestamp']>;
  startafter?: InputMaybe<Scalars['timestamptz']>;
  startedon?: InputMaybe<Scalars['timestamptz']>;
  state?: InputMaybe<Scalars['job_state']>;
};

/** aggregate sum on columns */
export type System_Job_Sum_Fields = {
  priority: Maybe<Scalars['Int']>;
  retrycount: Maybe<Scalars['Int']>;
  retrydelay: Maybe<Scalars['Int']>;
  retrylimit: Maybe<Scalars['Int']>;
};

/** update columns of table "system.job" */
export enum System_Job_Update_Column {
  /** column name */
  Completedon = 'completedon',
  /** column name */
  Createdon = 'createdon',
  /** column name */
  Data = 'data',
  /** column name */
  Expirein = 'expirein',
  /** column name */
  Id = 'id',
  /** column name */
  Keepuntil = 'keepuntil',
  /** column name */
  Name = 'name',
  /** column name */
  OnComplete = 'on_complete',
  /** column name */
  Output = 'output',
  /** column name */
  Priority = 'priority',
  /** column name */
  Retrybackoff = 'retrybackoff',
  /** column name */
  Retrycount = 'retrycount',
  /** column name */
  Retrydelay = 'retrydelay',
  /** column name */
  Retrylimit = 'retrylimit',
  /** column name */
  Singletonkey = 'singletonkey',
  /** column name */
  Singletonon = 'singletonon',
  /** column name */
  Startafter = 'startafter',
  /** column name */
  Startedon = 'startedon',
  /** column name */
  State = 'state'
}

export type System_Job_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<System_Job_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<System_Job_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<System_Job_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<System_Job_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<System_Job_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<System_Job_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<System_Job_Set_Input>;
  where: System_Job_Bool_Exp;
};

/** aggregate var_pop on columns */
export type System_Job_Var_Pop_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type System_Job_Var_Samp_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type System_Job_Variance_Fields = {
  priority: Maybe<Scalars['Float']>;
  retrycount: Maybe<Scalars['Float']>;
  retrydelay: Maybe<Scalars['Float']>;
  retrylimit: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type AppsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppsQuery = { app_apps: Array<{ id: string }> };


export const AppsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Apps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app_apps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AppsQuery, AppsQueryVariables>;