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
  jsonb: Record<string, any>;
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

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "eventboss.activities" */
export type Eventboss_Activities = {
  app_id: Scalars['uuid'];
  concurrency: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  delay_seconds: Scalars['Int'];
  /** An array relationship */
  event_activities: Array<Eventboss_Event_Activities>;
  expire_in: Scalars['Int'];
  extra_data: Scalars['jsonb'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  retry_backoff: Scalars['Boolean'];
  retry_delay: Scalars['Int'];
  retry_limit: Scalars['Int'];
  slug: Scalars['String'];
  type: Scalars['String'];
  type_configuration: Scalars['jsonb'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "eventboss.activities" */
export type Eventboss_ActivitiesEvent_ActivitiesArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Event_Activities_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Event_Activities_Order_By>>;
  where: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
};


/** columns and relationships of "eventboss.activities" */
export type Eventboss_ActivitiesExtra_DataArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "eventboss.activities" */
export type Eventboss_ActivitiesType_ConfigurationArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "eventboss.activities". All fields are combined with a logical 'AND'. */
export type Eventboss_Activities_Bool_Exp = {
  _and?: InputMaybe<Array<Eventboss_Activities_Bool_Exp>>;
  _not?: InputMaybe<Eventboss_Activities_Bool_Exp>;
  _or?: InputMaybe<Array<Eventboss_Activities_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  concurrency?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  delay_seconds?: InputMaybe<Int_Comparison_Exp>;
  event_activities?: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
  expire_in?: InputMaybe<Int_Comparison_Exp>;
  extra_data?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  retry_backoff?: InputMaybe<Boolean_Comparison_Exp>;
  retry_delay?: InputMaybe<Int_Comparison_Exp>;
  retry_limit?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  type_configuration?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** response of any mutation on the table "eventboss.activities" */
export type Eventboss_Activities_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Activities>;
};

/** Ordering options when selecting data from "eventboss.activities". */
export type Eventboss_Activities_Order_By = {
  app_id?: InputMaybe<Order_By>;
  concurrency?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  delay_seconds?: InputMaybe<Order_By>;
  event_activities_aggregate?: InputMaybe<Eventboss_Event_Activities_Aggregate_Order_By>;
  expire_in?: InputMaybe<Order_By>;
  extra_data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  retry_backoff?: InputMaybe<Order_By>;
  retry_delay?: InputMaybe<Order_By>;
  retry_limit?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  type_configuration?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "eventboss.activities" */
export enum Eventboss_Activities_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  Concurrency = 'concurrency',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DelaySeconds = 'delay_seconds',
  /** column name */
  ExpireIn = 'expire_in',
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
  Slug = 'slug',
  /** column name */
  Type = 'type',
  /** column name */
  TypeConfiguration = 'type_configuration',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Streaming cursor of the table "eventboss_activities" */
export type Eventboss_Activities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eventboss_Activities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eventboss_Activities_Stream_Cursor_Value_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  concurrency?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  delay_seconds?: InputMaybe<Scalars['Int']>;
  expire_in?: InputMaybe<Scalars['Int']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  retry_backoff?: InputMaybe<Scalars['Boolean']>;
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_configuration?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "eventboss.apps" */
export type Eventboss_Apps = {
  created_at: Scalars['timestamptz'];
  extra_data: Scalars['jsonb'];
  id: Scalars['uuid'];
  name: Scalars['String'];
};


/** columns and relationships of "eventboss.apps" */
export type Eventboss_AppsExtra_DataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "eventboss.apps". All fields are combined with a logical 'AND'. */
export type Eventboss_Apps_Bool_Exp = {
  _and?: InputMaybe<Array<Eventboss_Apps_Bool_Exp>>;
  _not?: InputMaybe<Eventboss_Apps_Bool_Exp>;
  _or?: InputMaybe<Array<Eventboss_Apps_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  extra_data?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "eventboss.apps". */
export type Eventboss_Apps_Order_By = {
  created_at?: InputMaybe<Order_By>;
  extra_data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** select columns of table "eventboss.apps" */
export enum Eventboss_Apps_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extra_data',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** Streaming cursor of the table "eventboss_apps" */
export type Eventboss_Apps_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eventboss_Apps_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eventboss_Apps_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "eventboss.environments" */
export type Eventboss_Environments = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  key: Scalars['String'];
  preview: Scalars['String'];
  value: Scalars['String'];
};

/** Boolean expression to filter rows from the table "eventboss.environments". All fields are combined with a logical 'AND'. */
export type Eventboss_Environments_Bool_Exp = {
  _and?: InputMaybe<Array<Eventboss_Environments_Bool_Exp>>;
  _not?: InputMaybe<Eventboss_Environments_Bool_Exp>;
  _or?: InputMaybe<Array<Eventboss_Environments_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  preview?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** response of any mutation on the table "eventboss.environments" */
export type Eventboss_Environments_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Environments>;
};

/** Ordering options when selecting data from "eventboss.environments". */
export type Eventboss_Environments_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  preview?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "eventboss.environments" */
export enum Eventboss_Environments_Select_Column {
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

/** Streaming cursor of the table "eventboss_environments" */
export type Eventboss_Environments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eventboss_Environments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eventboss_Environments_Stream_Cursor_Value_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "eventboss.event_activities" */
export type Eventboss_Event_Activities = {
  /** An object relationship */
  activity: Eventboss_Activities;
  activity_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  event: Eventboss_Events;
  event_id: Scalars['uuid'];
  id: Scalars['uuid'];
};

/** order by aggregate values of table "eventboss.event_activities" */
export type Eventboss_Event_Activities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Eventboss_Event_Activities_Max_Order_By>;
  min?: InputMaybe<Eventboss_Event_Activities_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "eventboss.event_activities". All fields are combined with a logical 'AND'. */
export type Eventboss_Event_Activities_Bool_Exp = {
  _and?: InputMaybe<Array<Eventboss_Event_Activities_Bool_Exp>>;
  _not?: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
  _or?: InputMaybe<Array<Eventboss_Event_Activities_Bool_Exp>>;
  activity?: InputMaybe<Eventboss_Activities_Bool_Exp>;
  activity_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event?: InputMaybe<Eventboss_Events_Bool_Exp>;
  event_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** order by max() on columns of table "eventboss.event_activities" */
export type Eventboss_Event_Activities_Max_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "eventboss.event_activities" */
export type Eventboss_Event_Activities_Min_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "eventboss.event_activities" */
export type Eventboss_Event_Activities_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Event_Activities>;
};

/** Ordering options when selecting data from "eventboss.event_activities". */
export type Eventboss_Event_Activities_Order_By = {
  activity?: InputMaybe<Eventboss_Activities_Order_By>;
  activity_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event?: InputMaybe<Eventboss_Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "eventboss.event_activities" */
export enum Eventboss_Event_Activities_Select_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "eventboss_event_activities" */
export type Eventboss_Event_Activities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eventboss_Event_Activities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eventboss_Event_Activities_Stream_Cursor_Value_Input = {
  activity_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** columns and relationships of "eventboss.event_executions" */
export type Eventboss_Event_Executions = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  event: Maybe<Eventboss_Events>;
  event_id: Scalars['uuid'];
  exec_id: Scalars['uuid'];
  payload: Scalars['jsonb'];
};


/** columns and relationships of "eventboss.event_executions" */
export type Eventboss_Event_ExecutionsPayloadArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "eventboss.event_executions". All fields are combined with a logical 'AND'. */
export type Eventboss_Event_Executions_Bool_Exp = {
  _and?: InputMaybe<Array<Eventboss_Event_Executions_Bool_Exp>>;
  _not?: InputMaybe<Eventboss_Event_Executions_Bool_Exp>;
  _or?: InputMaybe<Array<Eventboss_Event_Executions_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event?: InputMaybe<Eventboss_Events_Bool_Exp>;
  event_id?: InputMaybe<Uuid_Comparison_Exp>;
  exec_id?: InputMaybe<Uuid_Comparison_Exp>;
  payload?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "eventboss.event_executions". */
export type Eventboss_Event_Executions_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event?: InputMaybe<Eventboss_Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  exec_id?: InputMaybe<Order_By>;
  payload?: InputMaybe<Order_By>;
};

/** select columns of table "eventboss.event_executions" */
export enum Eventboss_Event_Executions_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  ExecId = 'exec_id',
  /** column name */
  Payload = 'payload'
}

/** Streaming cursor of the table "eventboss_event_executions" */
export type Eventboss_Event_Executions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eventboss_Event_Executions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eventboss_Event_Executions_Stream_Cursor_Value_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
};

/** columns and relationships of "eventboss.events" */
export type Eventboss_Events = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  event_activities: Array<Eventboss_Event_Activities>;
  extra_data: Scalars['jsonb'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "eventboss.events" */
export type Eventboss_EventsEvent_ActivitiesArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Event_Activities_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Event_Activities_Order_By>>;
  where: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
};


/** columns and relationships of "eventboss.events" */
export type Eventboss_EventsExtra_DataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "eventboss.events". All fields are combined with a logical 'AND'. */
export type Eventboss_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Eventboss_Events_Bool_Exp>>;
  _not?: InputMaybe<Eventboss_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Eventboss_Events_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event_activities?: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
  extra_data?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** response of any mutation on the table "eventboss.events" */
export type Eventboss_Events_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Events>;
};

/** Ordering options when selecting data from "eventboss.events". */
export type Eventboss_Events_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_activities_aggregate?: InputMaybe<Eventboss_Event_Activities_Aggregate_Order_By>;
  extra_data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "eventboss.events" */
export enum Eventboss_Events_Select_Column {
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

/** Streaming cursor of the table "eventboss_events" */
export type Eventboss_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eventboss_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eventboss_Events_Stream_Cursor_Value_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "eventboss.task_logs" */
export type Eventboss_Task_Logs = {
  /** An object relationship */
  activity: Maybe<Eventboss_Activities>;
  activity_id: Scalars['uuid'];
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  data: Scalars['jsonb'];
  /** An object relationship */
  event: Maybe<Eventboss_Events>;
  event_id: Scalars['uuid'];
  event_name: Scalars['String'];
  exec_id: Scalars['uuid'];
  task_id: Scalars['uuid'];
};


/** columns and relationships of "eventboss.task_logs" */
export type Eventboss_Task_LogsDataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "eventboss.task_logs". All fields are combined with a logical 'AND'. */
export type Eventboss_Task_Logs_Bool_Exp = {
  _and?: InputMaybe<Array<Eventboss_Task_Logs_Bool_Exp>>;
  _not?: InputMaybe<Eventboss_Task_Logs_Bool_Exp>;
  _or?: InputMaybe<Array<Eventboss_Task_Logs_Bool_Exp>>;
  activity?: InputMaybe<Eventboss_Activities_Bool_Exp>;
  activity_id?: InputMaybe<Uuid_Comparison_Exp>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  event?: InputMaybe<Eventboss_Events_Bool_Exp>;
  event_id?: InputMaybe<Uuid_Comparison_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  exec_id?: InputMaybe<Uuid_Comparison_Exp>;
  task_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** Ordering options when selecting data from "eventboss.task_logs". */
export type Eventboss_Task_Logs_Order_By = {
  activity?: InputMaybe<Eventboss_Activities_Order_By>;
  activity_id?: InputMaybe<Order_By>;
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  event?: InputMaybe<Eventboss_Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  exec_id?: InputMaybe<Order_By>;
  task_id?: InputMaybe<Order_By>;
};

/** select columns of table "eventboss.task_logs" */
export enum Eventboss_Task_Logs_Select_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  EventId = 'event_id',
  /** column name */
  EventName = 'event_name',
  /** column name */
  ExecId = 'exec_id',
  /** column name */
  TaskId = 'task_id'
}

/** Streaming cursor of the table "eventboss_task_logs" */
export type Eventboss_Task_Logs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eventboss_Task_Logs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eventboss_Task_Logs_Stream_Cursor_Value_Input = {
  activity_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  event_name?: InputMaybe<Scalars['String']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  task_id?: InputMaybe<Scalars['uuid']>;
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
  /** delete data from the table: "eventboss.activities" */
  delete_eventboss_activities: Maybe<Eventboss_Activities_Mutation_Response>;
  /** delete single row from the table: "eventboss.activities" */
  delete_eventboss_activities_by_pk: Maybe<Eventboss_Activities>;
  /** delete data from the table: "eventboss.environments" */
  delete_eventboss_environments: Maybe<Eventboss_Environments_Mutation_Response>;
  /** delete single row from the table: "eventboss.environments" */
  delete_eventboss_environments_by_pk: Maybe<Eventboss_Environments>;
  /** delete data from the table: "eventboss.event_activities" */
  delete_eventboss_event_activities: Maybe<Eventboss_Event_Activities_Mutation_Response>;
  /** delete single row from the table: "eventboss.event_activities" */
  delete_eventboss_event_activities_by_pk: Maybe<Eventboss_Event_Activities>;
  /** delete data from the table: "eventboss.events" */
  delete_eventboss_events: Maybe<Eventboss_Events_Mutation_Response>;
  /** delete single row from the table: "eventboss.events" */
  delete_eventboss_events_by_pk: Maybe<Eventboss_Events>;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_ActivitiesArgs = {
  where: Eventboss_Activities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Activities_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_EnvironmentsArgs = {
  where: Eventboss_Environments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Environments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Event_ActivitiesArgs = {
  where: Eventboss_Event_Activities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Event_Activities_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_EventsArgs = {
  where: Eventboss_Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Events_By_PkArgs = {
  id: Scalars['uuid'];
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
  /** fetch data from the table: "eventboss.activities" */
  eventboss_activities: Array<Eventboss_Activities>;
  /** fetch data from the table: "eventboss.activities" using primary key columns */
  eventboss_activities_by_pk: Maybe<Eventboss_Activities>;
  /** fetch data from the table: "eventboss.apps" */
  eventboss_apps: Array<Eventboss_Apps>;
  /** fetch data from the table: "eventboss.apps" using primary key columns */
  eventboss_apps_by_pk: Maybe<Eventboss_Apps>;
  /** fetch data from the table: "eventboss.environments" */
  eventboss_environments: Array<Eventboss_Environments>;
  /** fetch data from the table: "eventboss.environments" using primary key columns */
  eventboss_environments_by_pk: Maybe<Eventboss_Environments>;
  /** fetch data from the table: "eventboss.event_activities" */
  eventboss_event_activities: Array<Eventboss_Event_Activities>;
  /** fetch data from the table: "eventboss.event_activities" using primary key columns */
  eventboss_event_activities_by_pk: Maybe<Eventboss_Event_Activities>;
  /** fetch data from the table: "eventboss.event_executions" */
  eventboss_event_executions: Array<Eventboss_Event_Executions>;
  /** fetch data from the table: "eventboss.events" */
  eventboss_events: Array<Eventboss_Events>;
  /** fetch data from the table: "eventboss.events" using primary key columns */
  eventboss_events_by_pk: Maybe<Eventboss_Events>;
  /** fetch data from the table: "eventboss.task_logs" */
  eventboss_task_logs: Array<Eventboss_Task_Logs>;
};


export type Query_RootEventboss_ActivitiesArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Activities_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Activities_Order_By>>;
  where: InputMaybe<Eventboss_Activities_Bool_Exp>;
};


export type Query_RootEventboss_Activities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEventboss_AppsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Apps_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Apps_Order_By>>;
  where: InputMaybe<Eventboss_Apps_Bool_Exp>;
};


export type Query_RootEventboss_Apps_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEventboss_EnvironmentsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Environments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Environments_Order_By>>;
  where: InputMaybe<Eventboss_Environments_Bool_Exp>;
};


export type Query_RootEventboss_Environments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEventboss_Event_ActivitiesArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Event_Activities_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Event_Activities_Order_By>>;
  where: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
};


export type Query_RootEventboss_Event_Activities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEventboss_Event_ExecutionsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Event_Executions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Event_Executions_Order_By>>;
  where: InputMaybe<Eventboss_Event_Executions_Bool_Exp>;
};


export type Query_RootEventboss_EventsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Events_Order_By>>;
  where: InputMaybe<Eventboss_Events_Bool_Exp>;
};


export type Query_RootEventboss_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEventboss_Task_LogsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Task_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Task_Logs_Order_By>>;
  where: InputMaybe<Eventboss_Task_Logs_Bool_Exp>;
};

export type Subscription_Root = {
  /** fetch data from the table: "eventboss.activities" */
  eventboss_activities: Array<Eventboss_Activities>;
  /** fetch data from the table: "eventboss.activities" using primary key columns */
  eventboss_activities_by_pk: Maybe<Eventboss_Activities>;
  /** fetch data from the table in a streaming manner: "eventboss.activities" */
  eventboss_activities_stream: Array<Eventboss_Activities>;
  /** fetch data from the table: "eventboss.apps" */
  eventboss_apps: Array<Eventboss_Apps>;
  /** fetch data from the table: "eventboss.apps" using primary key columns */
  eventboss_apps_by_pk: Maybe<Eventboss_Apps>;
  /** fetch data from the table in a streaming manner: "eventboss.apps" */
  eventboss_apps_stream: Array<Eventboss_Apps>;
  /** fetch data from the table: "eventboss.environments" */
  eventboss_environments: Array<Eventboss_Environments>;
  /** fetch data from the table: "eventboss.environments" using primary key columns */
  eventboss_environments_by_pk: Maybe<Eventboss_Environments>;
  /** fetch data from the table in a streaming manner: "eventboss.environments" */
  eventboss_environments_stream: Array<Eventboss_Environments>;
  /** fetch data from the table: "eventboss.event_activities" */
  eventboss_event_activities: Array<Eventboss_Event_Activities>;
  /** fetch data from the table: "eventboss.event_activities" using primary key columns */
  eventboss_event_activities_by_pk: Maybe<Eventboss_Event_Activities>;
  /** fetch data from the table in a streaming manner: "eventboss.event_activities" */
  eventboss_event_activities_stream: Array<Eventboss_Event_Activities>;
  /** fetch data from the table: "eventboss.event_executions" */
  eventboss_event_executions: Array<Eventboss_Event_Executions>;
  /** fetch data from the table in a streaming manner: "eventboss.event_executions" */
  eventboss_event_executions_stream: Array<Eventboss_Event_Executions>;
  /** fetch data from the table: "eventboss.events" */
  eventboss_events: Array<Eventboss_Events>;
  /** fetch data from the table: "eventboss.events" using primary key columns */
  eventboss_events_by_pk: Maybe<Eventboss_Events>;
  /** fetch data from the table in a streaming manner: "eventboss.events" */
  eventboss_events_stream: Array<Eventboss_Events>;
  /** fetch data from the table: "eventboss.task_logs" */
  eventboss_task_logs: Array<Eventboss_Task_Logs>;
  /** fetch data from the table in a streaming manner: "eventboss.task_logs" */
  eventboss_task_logs_stream: Array<Eventboss_Task_Logs>;
};


export type Subscription_RootEventboss_ActivitiesArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Activities_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Activities_Order_By>>;
  where: InputMaybe<Eventboss_Activities_Bool_Exp>;
};


export type Subscription_RootEventboss_Activities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEventboss_Activities_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Eventboss_Activities_Stream_Cursor_Input>>;
  where: InputMaybe<Eventboss_Activities_Bool_Exp>;
};


export type Subscription_RootEventboss_AppsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Apps_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Apps_Order_By>>;
  where: InputMaybe<Eventboss_Apps_Bool_Exp>;
};


export type Subscription_RootEventboss_Apps_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEventboss_Apps_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Eventboss_Apps_Stream_Cursor_Input>>;
  where: InputMaybe<Eventboss_Apps_Bool_Exp>;
};


export type Subscription_RootEventboss_EnvironmentsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Environments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Environments_Order_By>>;
  where: InputMaybe<Eventboss_Environments_Bool_Exp>;
};


export type Subscription_RootEventboss_Environments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEventboss_Environments_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Eventboss_Environments_Stream_Cursor_Input>>;
  where: InputMaybe<Eventboss_Environments_Bool_Exp>;
};


export type Subscription_RootEventboss_Event_ActivitiesArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Event_Activities_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Event_Activities_Order_By>>;
  where: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
};


export type Subscription_RootEventboss_Event_Activities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEventboss_Event_Activities_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Eventboss_Event_Activities_Stream_Cursor_Input>>;
  where: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
};


export type Subscription_RootEventboss_Event_ExecutionsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Event_Executions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Event_Executions_Order_By>>;
  where: InputMaybe<Eventboss_Event_Executions_Bool_Exp>;
};


export type Subscription_RootEventboss_Event_Executions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Eventboss_Event_Executions_Stream_Cursor_Input>>;
  where: InputMaybe<Eventboss_Event_Executions_Bool_Exp>;
};


export type Subscription_RootEventboss_EventsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Events_Order_By>>;
  where: InputMaybe<Eventboss_Events_Bool_Exp>;
};


export type Subscription_RootEventboss_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEventboss_Events_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Eventboss_Events_Stream_Cursor_Input>>;
  where: InputMaybe<Eventboss_Events_Bool_Exp>;
};


export type Subscription_RootEventboss_Task_LogsArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Task_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Task_Logs_Order_By>>;
  where: InputMaybe<Eventboss_Task_Logs_Bool_Exp>;
};


export type Subscription_RootEventboss_Task_Logs_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Eventboss_Task_Logs_Stream_Cursor_Input>>;
  where: InputMaybe<Eventboss_Task_Logs_Bool_Exp>;
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

export type GetActivityQueryVariables = Exact<{
  activity_id: Scalars['uuid'];
}>;


export type GetActivityQuery = { eventboss_activities_by_pk: { id: string, type: string, type_configuration: Record<string, any>, slug: string, name: string } | null };

export type GetEventQueryVariables = Exact<{
  event_id: Scalars['uuid'];
}>;


export type GetEventQuery = { event: { id: string, slug: string, name: string } | null };


export const GetActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activity_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventboss_activities_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activity_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"type_configuration"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetActivityQuery, GetActivityQueryVariables>;
export const GetEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"event"},"name":{"kind":"Name","value":"eventboss_events_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetEventQuery, GetEventQueryVariables>;