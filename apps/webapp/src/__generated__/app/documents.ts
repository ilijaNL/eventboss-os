import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';
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
  jsonb: Record<string, any> | Array<any>;
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

/** action definitions */
export type App_Actions = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  event_actions: Array<App_Event_Actions>;
  expire_in: Scalars['Int'];
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
export type App_ActionsExtra_DataArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** action definitions */
export type App_ActionsType_ConfigurationArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "app.actions". All fields are combined with a logical 'AND'. */
export type App_Actions_Bool_Exp = {
  _and?: InputMaybe<Array<App_Actions_Bool_Exp>>;
  _not?: InputMaybe<App_Actions_Bool_Exp>;
  _or?: InputMaybe<Array<App_Actions_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event_actions?: InputMaybe<App_Event_Actions_Bool_Exp>;
  expire_in?: InputMaybe<Int_Comparison_Exp>;
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

/** response of any mutation on the table "app.actions" */
export type App_Actions_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Actions>;
};

/** Ordering options when selecting data from "app.actions". */
export type App_Actions_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_actions_aggregate?: InputMaybe<App_Event_Actions_Aggregate_Order_By>;
  expire_in?: InputMaybe<Order_By>;
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

/** select columns of table "app.actions" */
export enum App_Actions_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  CreatedAt = 'created_at',
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
  expire_in?: InputMaybe<Scalars['Int']>;
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

/** Ordering options when selecting data from "app.apps". */
export type App_Apps_Order_By = {
  created_at?: InputMaybe<Order_By>;
  extra_data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
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

/** columns and relationships of "app.environments" */
export type App_Environments = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  key: Scalars['String'];
  preview: Scalars['String'];
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
};

/** response of any mutation on the table "app.environments" */
export type App_Environments_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Environments>;
};

/** Ordering options when selecting data from "app.environments". */
export type App_Environments_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  preview?: InputMaybe<Order_By>;
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
  Preview = 'preview'
}

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

/** order by aggregate values of table "app.event_actions" */
export type App_Event_Actions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<App_Event_Actions_Max_Order_By>;
  min?: InputMaybe<App_Event_Actions_Min_Order_By>;
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

/** order by max() on columns of table "app.event_actions" */
export type App_Event_Actions_Max_Order_By = {
  action_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
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

/** Ordering options when selecting data from "app.event_actions". */
export type App_Event_Actions_Order_By = {
  action?: InputMaybe<App_Actions_Order_By>;
  action_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event?: InputMaybe<App_Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
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

/** columns and relationships of "app.event_executions" */
export type App_Event_Executions = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  event: Maybe<App_Events>;
  event_id: Scalars['uuid'];
  exec_id: Scalars['uuid'];
  payload: Scalars['jsonb'];
};


/** columns and relationships of "app.event_executions" */
export type App_Event_ExecutionsPayloadArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "app.event_executions". All fields are combined with a logical 'AND'. */
export type App_Event_Executions_Bool_Exp = {
  _and?: InputMaybe<Array<App_Event_Executions_Bool_Exp>>;
  _not?: InputMaybe<App_Event_Executions_Bool_Exp>;
  _or?: InputMaybe<Array<App_Event_Executions_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event?: InputMaybe<App_Events_Bool_Exp>;
  event_id?: InputMaybe<Uuid_Comparison_Exp>;
  exec_id?: InputMaybe<Uuid_Comparison_Exp>;
  payload?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "app.event_executions". */
export type App_Event_Executions_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event?: InputMaybe<App_Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  exec_id?: InputMaybe<Order_By>;
  payload?: InputMaybe<Order_By>;
};

/** select columns of table "app.event_executions" */
export enum App_Event_Executions_Select_Column {
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

/** Streaming cursor of the table "app_event_executions" */
export type App_Event_Executions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Event_Executions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Event_Executions_Stream_Cursor_Value_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
};

/** columns and relationships of "app.events" */
export type App_Events = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  event_actions: Array<App_Event_Actions>;
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
export type App_EventsExtra_DataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "app.events". All fields are combined with a logical 'AND'. */
export type App_Events_Bool_Exp = {
  _and?: InputMaybe<Array<App_Events_Bool_Exp>>;
  _not?: InputMaybe<App_Events_Bool_Exp>;
  _or?: InputMaybe<Array<App_Events_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event_actions?: InputMaybe<App_Event_Actions_Bool_Exp>;
  extra_data?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** response of any mutation on the table "app.events" */
export type App_Events_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<App_Events>;
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

/** columns and relationships of "app.job_events" */
export type App_Job_Events = {
  /** An object relationship */
  action: Maybe<App_Actions>;
  action_id: Scalars['uuid'];
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  data: Scalars['jsonb'];
  /** An object relationship */
  event: Maybe<App_Events>;
  event_id: Scalars['uuid'];
  event_name: Scalars['String'];
  exec_id: Scalars['uuid'];
  job_id: Scalars['uuid'];
};


/** columns and relationships of "app.job_events" */
export type App_Job_EventsDataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "app.job_events". All fields are combined with a logical 'AND'. */
export type App_Job_Events_Bool_Exp = {
  _and?: InputMaybe<Array<App_Job_Events_Bool_Exp>>;
  _not?: InputMaybe<App_Job_Events_Bool_Exp>;
  _or?: InputMaybe<Array<App_Job_Events_Bool_Exp>>;
  action?: InputMaybe<App_Actions_Bool_Exp>;
  action_id?: InputMaybe<Uuid_Comparison_Exp>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  event?: InputMaybe<App_Events_Bool_Exp>;
  event_id?: InputMaybe<Uuid_Comparison_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  exec_id?: InputMaybe<Uuid_Comparison_Exp>;
  job_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** Ordering options when selecting data from "app.job_events". */
export type App_Job_Events_Order_By = {
  action?: InputMaybe<App_Actions_Order_By>;
  action_id?: InputMaybe<Order_By>;
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  event?: InputMaybe<App_Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  exec_id?: InputMaybe<Order_By>;
  job_id?: InputMaybe<Order_By>;
};

/** select columns of table "app.job_events" */
export enum App_Job_Events_Select_Column {
  /** column name */
  ActionId = 'action_id',
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
  JobId = 'job_id'
}

/** Streaming cursor of the table "app_job_events" */
export type App_Job_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: App_Job_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type App_Job_Events_Stream_Cursor_Value_Input = {
  action_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  event_name?: InputMaybe<Scalars['String']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  job_id?: InputMaybe<Scalars['uuid']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

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
  /** delete data from the table: "app.actions" */
  delete_app_actions: Maybe<App_Actions_Mutation_Response>;
  /** delete single row from the table: "app.actions" */
  delete_app_actions_by_pk: Maybe<App_Actions>;
  /** delete data from the table: "app.environments" */
  delete_app_environments: Maybe<App_Environments_Mutation_Response>;
  /** delete single row from the table: "app.environments" */
  delete_app_environments_by_pk: Maybe<App_Environments>;
  /** delete data from the table: "app.event_actions" */
  delete_app_event_actions: Maybe<App_Event_Actions_Mutation_Response>;
  /** delete single row from the table: "app.event_actions" */
  delete_app_event_actions_by_pk: Maybe<App_Event_Actions>;
  /** delete data from the table: "app.events" */
  delete_app_events: Maybe<App_Events_Mutation_Response>;
  /** delete single row from the table: "app.events" */
  delete_app_events_by_pk: Maybe<App_Events>;
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
export type Mutation_RootDelete_App_EventsArgs = {
  where: App_Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_App_Events_By_PkArgs = {
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
  /** fetch data from the table: "app.actions" */
  app_actions: Array<App_Actions>;
  /** fetch data from the table: "app.actions" using primary key columns */
  app_actions_by_pk: Maybe<App_Actions>;
  /** fetch data from the table: "app.apps" */
  app_apps: Array<App_Apps>;
  /** fetch data from the table: "app.apps" using primary key columns */
  app_apps_by_pk: Maybe<App_Apps>;
  /** fetch data from the table: "app.environments" */
  app_environments: Array<App_Environments>;
  /** fetch data from the table: "app.environments" using primary key columns */
  app_environments_by_pk: Maybe<App_Environments>;
  /** fetch data from the table: "app.event_actions" */
  app_event_actions: Array<App_Event_Actions>;
  /** fetch data from the table: "app.event_actions" using primary key columns */
  app_event_actions_by_pk: Maybe<App_Event_Actions>;
  /** fetch data from the table: "app.event_executions" */
  app_event_executions: Array<App_Event_Executions>;
  /** fetch data from the table: "app.events" */
  app_events: Array<App_Events>;
  /** fetch data from the table: "app.events" using primary key columns */
  app_events_by_pk: Maybe<App_Events>;
  /** fetch data from the table: "app.job_events" */
  app_job_events: Array<App_Job_Events>;
};


export type Query_RootApp_ActionsArgs = {
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


export type Query_RootApp_Event_Actions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootApp_Event_ExecutionsArgs = {
  distinct_on: InputMaybe<Array<App_Event_Executions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Executions_Order_By>>;
  where: InputMaybe<App_Event_Executions_Bool_Exp>;
};


export type Query_RootApp_EventsArgs = {
  distinct_on: InputMaybe<Array<App_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Events_Order_By>>;
  where: InputMaybe<App_Events_Bool_Exp>;
};


export type Query_RootApp_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootApp_Job_EventsArgs = {
  distinct_on: InputMaybe<Array<App_Job_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Job_Events_Order_By>>;
  where: InputMaybe<App_Job_Events_Bool_Exp>;
};

export type Subscription_Root = {
  /** fetch data from the table: "app.actions" */
  app_actions: Array<App_Actions>;
  /** fetch data from the table: "app.actions" using primary key columns */
  app_actions_by_pk: Maybe<App_Actions>;
  /** fetch data from the table in a streaming manner: "app.actions" */
  app_actions_stream: Array<App_Actions>;
  /** fetch data from the table: "app.apps" */
  app_apps: Array<App_Apps>;
  /** fetch data from the table: "app.apps" using primary key columns */
  app_apps_by_pk: Maybe<App_Apps>;
  /** fetch data from the table in a streaming manner: "app.apps" */
  app_apps_stream: Array<App_Apps>;
  /** fetch data from the table: "app.environments" */
  app_environments: Array<App_Environments>;
  /** fetch data from the table: "app.environments" using primary key columns */
  app_environments_by_pk: Maybe<App_Environments>;
  /** fetch data from the table in a streaming manner: "app.environments" */
  app_environments_stream: Array<App_Environments>;
  /** fetch data from the table: "app.event_actions" */
  app_event_actions: Array<App_Event_Actions>;
  /** fetch data from the table: "app.event_actions" using primary key columns */
  app_event_actions_by_pk: Maybe<App_Event_Actions>;
  /** fetch data from the table in a streaming manner: "app.event_actions" */
  app_event_actions_stream: Array<App_Event_Actions>;
  /** fetch data from the table: "app.event_executions" */
  app_event_executions: Array<App_Event_Executions>;
  /** fetch data from the table in a streaming manner: "app.event_executions" */
  app_event_executions_stream: Array<App_Event_Executions>;
  /** fetch data from the table: "app.events" */
  app_events: Array<App_Events>;
  /** fetch data from the table: "app.events" using primary key columns */
  app_events_by_pk: Maybe<App_Events>;
  /** fetch data from the table in a streaming manner: "app.events" */
  app_events_stream: Array<App_Events>;
  /** fetch data from the table: "app.job_events" */
  app_job_events: Array<App_Job_Events>;
  /** fetch data from the table in a streaming manner: "app.job_events" */
  app_job_events_stream: Array<App_Job_Events>;
};


export type Subscription_RootApp_ActionsArgs = {
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


export type Subscription_RootApp_Event_Actions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootApp_Event_Actions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Event_Actions_Stream_Cursor_Input>>;
  where: InputMaybe<App_Event_Actions_Bool_Exp>;
};


export type Subscription_RootApp_Event_ExecutionsArgs = {
  distinct_on: InputMaybe<Array<App_Event_Executions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Event_Executions_Order_By>>;
  where: InputMaybe<App_Event_Executions_Bool_Exp>;
};


export type Subscription_RootApp_Event_Executions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Event_Executions_Stream_Cursor_Input>>;
  where: InputMaybe<App_Event_Executions_Bool_Exp>;
};


export type Subscription_RootApp_EventsArgs = {
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


export type Subscription_RootApp_Job_EventsArgs = {
  distinct_on: InputMaybe<Array<App_Job_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<App_Job_Events_Order_By>>;
  where: InputMaybe<App_Job_Events_Bool_Exp>;
};


export type Subscription_RootApp_Job_Events_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<App_Job_Events_Stream_Cursor_Input>>;
  where: InputMaybe<App_Job_Events_Bool_Exp>;
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

export type ActionLogItemFragment = { job_id: string, action_id: string, created_at: string, event_name: string, data: Record<string, any> | Array<any>, event: { name: string, slug: string } | null, action: { slug: string, type: string, name: string } | null };

export type EventLogItemFragment = { exec_id: string, payload: Record<string, any> | Array<any>, created_at: string, event: { name: string, id: string, slug: string } | null };

export type GetActionLogsQueryVariables = Exact<{
  after: Scalars['timestamptz'];
  limit: Scalars['Int'];
}>;


export type GetActionLogsQuery = { events: Array<{ job_id: string, action_id: string, created_at: string, event_name: string, data: Record<string, any> | Array<any>, event: { name: string, slug: string } | null, action: { slug: string, type: string, name: string } | null }> };

export type GetLogsForActionQueryVariables = Exact<{
  action_id: Scalars['uuid'];
  after: Scalars['timestamptz'];
  limit: Scalars['Int'];
}>;


export type GetLogsForActionQuery = { events: Array<{ job_id: string, action_id: string, created_at: string, event_name: string, data: Record<string, any> | Array<any>, event: { name: string, slug: string } | null, action: { slug: string, type: string, name: string } | null }> };

export type GetActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActionsQuery = { actions: Array<{ id: string, slug: string, name: string, type: string, created_at: string }> };

export type GetActionByIdQueryVariables = Exact<{
  action_id: Scalars['uuid'];
}>;


export type GetActionByIdQuery = { app_actions_by_pk: { id: string, slug: string, type: string, type_configuration: Record<string, any> | Array<any>, name: string, retry_backoff: boolean, retry_delay: number, retry_limit: number, expire_in: number, run_after: number, event_actions: Array<{ id: string, created_at: string, event: { name: string, id: string, slug: string } }> } | null };

export type DeleteActionMutationVariables = Exact<{
  action_id: Scalars['uuid'];
}>;


export type DeleteActionMutation = { delete_app_actions_by_pk: { id: string } | null };

export type GetEventLogsQueryVariables = Exact<{
  after: Scalars['timestamptz'];
  limit: InputMaybe<Scalars['Int']>;
}>;


export type GetEventLogsQuery = { app_event_executions: Array<{ exec_id: string, payload: Record<string, any> | Array<any>, created_at: string, event: { name: string, id: string, slug: string } | null }> };

export type GetLogsForEventQueryVariables = Exact<{
  event_id: Scalars['uuid'];
  after: Scalars['timestamptz'];
  limit: Scalars['Int'];
}>;


export type GetLogsForEventQuery = { app_event_executions: Array<{ exec_id: string, payload: Record<string, any> | Array<any>, created_at: string, event: { name: string, id: string, slug: string } | null }> };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { app_events: Array<{ id: string, name: string, slug: string, event_actions: Array<{ id: string }> }> };

export type GetEventByIdQueryVariables = Exact<{
  event_id: Scalars['uuid'];
}>;


export type GetEventByIdQuery = { app_events_by_pk: { name: string, slug: string, created_at: string, event_actions: Array<{ id: string, created_at: string, action: { slug: string, name: string, action_id: string } }> } | null };

export type RemoveActionFromEventMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type RemoveActionFromEventMutation = { delete_app_event_actions_by_pk: { id: string } | null };

export type DeleteEventMutationVariables = Exact<{
  event_id: Scalars['uuid'];
}>;


export type DeleteEventMutation = { delete_app_events_by_pk: { id: string } | null };

export type GetEnvironmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnvironmentsQuery = { envs: Array<{ id: string, key: string, preview: string, created_at: string }> };

export type DeleteEnvMutationVariables = Exact<{
  env_id: Scalars['uuid'];
}>;


export type DeleteEnvMutation = { delete_app_environments_by_pk: { id: string } | null };

export type GetAllSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSettingsQuery = { actions: Array<{ run_after: number, slug: string, type: string, type_configuration: Record<string, any> | Array<any>, extra_data: Record<string, any> | Array<any>, name: string, retry_backoff: boolean, retry_delay: number, retry_limit: number }>, events: Array<{ name: string, slug: string, extra_data: Record<string, any> | Array<any>, actions: Array<{ action: { slug: string } }> }> };

export const ActionLogItemFragmentDoc = gql`
    fragment ActionLogItem on app_job_events {
  job_id
  action_id
  created_at
  event_name
  data
  event {
    name
    slug
  }
  action {
    slug
    type
    name
  }
}
    ` as unknown as DocumentNode<ActionLogItemFragment, unknown>;
export const EventLogItemFragmentDoc = gql`
    fragment EventLogItem on app_event_executions {
  exec_id
  event {
    name
    id
    slug
  }
  payload
  created_at
}
    ` as unknown as DocumentNode<EventLogItemFragment, unknown>;
export const GetActionLogsDocument = gql`
    query GetActionLogs($after: timestamptz!, $limit: Int!) {
  events: app_job_events(
    order_by: {created_at: desc}
    where: {created_at: {_lte: $after}}
    limit: $limit
  ) {
    ...ActionLogItem
  }
}
    ${ActionLogItemFragmentDoc}` as unknown as DocumentNode<GetActionLogsQuery, GetActionLogsQueryVariables>;
export const GetLogsForActionDocument = gql`
    query GetLogsForAction($action_id: uuid!, $after: timestamptz!, $limit: Int!) {
  events: app_job_events(
    order_by: {created_at: desc}
    where: {_and: [{action_id: {_eq: $action_id}}, {created_at: {_lte: $after}}]}
    limit: $limit
  ) {
    ...ActionLogItem
  }
}
    ${ActionLogItemFragmentDoc}` as unknown as DocumentNode<GetLogsForActionQuery, GetLogsForActionQueryVariables>;
export const GetActionsDocument = gql`
    query GetActions {
  actions: app_actions(order_by: {slug: asc}) {
    id
    slug
    name
    type
    created_at
  }
}
    ` as unknown as DocumentNode<GetActionsQuery, GetActionsQueryVariables>;
export const GetActionByIdDocument = gql`
    query GetActionById($action_id: uuid!) {
  app_actions_by_pk(id: $action_id) {
    id
    slug
    type
    type_configuration
    name
    retry_backoff
    retry_delay
    retry_limit
    expire_in
    run_after
    event_actions {
      id
      created_at
      event {
        name
        id
        slug
      }
    }
  }
}
    ` as unknown as DocumentNode<GetActionByIdQuery, GetActionByIdQueryVariables>;
export const DeleteActionDocument = gql`
    mutation DeleteAction($action_id: uuid!) {
  delete_app_actions_by_pk(id: $action_id) {
    id
  }
}
    ` as unknown as DocumentNode<DeleteActionMutation, DeleteActionMutationVariables>;
export const GetEventLogsDocument = gql`
    query GetEventLogs($after: timestamptz!, $limit: Int) {
  app_event_executions(
    order_by: {created_at: desc}
    where: {created_at: {_lte: $after}}
    limit: $limit
  ) {
    ...EventLogItem
  }
}
    ${EventLogItemFragmentDoc}` as unknown as DocumentNode<GetEventLogsQuery, GetEventLogsQueryVariables>;
export const GetLogsForEventDocument = gql`
    query GetLogsForEvent($event_id: uuid!, $after: timestamptz!, $limit: Int!) {
  app_event_executions(
    order_by: {created_at: desc}
    where: {_and: [{event_id: {_eq: $event_id}}, {created_at: {_lte: $after}}]}
    limit: $limit
  ) {
    ...EventLogItem
  }
}
    ${EventLogItemFragmentDoc}` as unknown as DocumentNode<GetLogsForEventQuery, GetLogsForEventQueryVariables>;
export const GetEventsDocument = gql`
    query GetEvents {
  app_events(order_by: {name: asc}, limit: 30) {
    id
    name
    slug
    event_actions {
      id
    }
  }
}
    ` as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const GetEventByIdDocument = gql`
    query GetEventById($event_id: uuid!) {
  app_events_by_pk(id: $event_id) {
    name
    slug
    created_at
    event_actions(order_by: {action: {name: asc}}) {
      id
      created_at
      action {
        action_id: id
        slug
        name
      }
    }
  }
}
    ` as unknown as DocumentNode<GetEventByIdQuery, GetEventByIdQueryVariables>;
export const RemoveActionFromEventDocument = gql`
    mutation RemoveActionFromEvent($id: uuid!) {
  delete_app_event_actions_by_pk(id: $id) {
    id
  }
}
    ` as unknown as DocumentNode<RemoveActionFromEventMutation, RemoveActionFromEventMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($event_id: uuid!) {
  delete_app_events_by_pk(id: $event_id) {
    id
  }
}
    ` as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const GetEnvironmentsDocument = gql`
    query GetEnvironments {
  envs: app_environments(order_by: {key: asc}) {
    id
    key
    preview
    created_at
  }
}
    ` as unknown as DocumentNode<GetEnvironmentsQuery, GetEnvironmentsQueryVariables>;
export const DeleteEnvDocument = gql`
    mutation DeleteEnv($env_id: uuid!) {
  delete_app_environments_by_pk(id: $env_id) {
    id
  }
}
    ` as unknown as DocumentNode<DeleteEnvMutation, DeleteEnvMutationVariables>;
export const GetAllSettingsDocument = gql`
    query GetAllSettings {
  actions: app_actions {
    run_after
    slug
    type
    type_configuration
    extra_data
    name
    retry_backoff
    retry_delay
    retry_limit
  }
  events: app_events {
    name
    slug
    extra_data
    actions: event_actions {
      action {
        slug
      }
    }
  }
}
    ` as unknown as DocumentNode<GetAllSettingsQuery, GetAllSettingsQueryVariables>;