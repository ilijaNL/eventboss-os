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

/** action definitions */
export type App_Actions = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
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

/** Ordering options when selecting data from "app.actions". */
export type App_Actions_Order_By = {
  app_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
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
  /** fetch data from the table: "app.environments" */
  app_environments: Array<App_Environments>;
  /** fetch data from the table: "app.environments" using primary key columns */
  app_environments_by_pk: Maybe<App_Environments>;
  /** fetch data from the table: "app.event_actions" */
  app_event_actions: Array<App_Event_Actions>;
  /** fetch data from the table: "app.event_actions" using primary key columns */
  app_event_actions_by_pk: Maybe<App_Event_Actions>;
  /** fetch data from the table: "app.events" */
  app_events: Array<App_Events>;
  /** fetch data from the table: "app.events" using primary key columns */
  app_events_by_pk: Maybe<App_Events>;
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

export type Subscription_Root = {
  /** fetch data from the table: "app.actions" */
  app_actions: Array<App_Actions>;
  /** fetch data from the table: "app.actions" using primary key columns */
  app_actions_by_pk: Maybe<App_Actions>;
  /** fetch data from the table in a streaming manner: "app.actions" */
  app_actions_stream: Array<App_Actions>;
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
  /** fetch data from the table: "app.events" */
  app_events: Array<App_Events>;
  /** fetch data from the table: "app.events" using primary key columns */
  app_events_by_pk: Maybe<App_Events>;
  /** fetch data from the table in a streaming manner: "app.events" */
  app_events_stream: Array<App_Events>;
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

export type GetActionQueryVariables = Exact<{
  action_id: Scalars['uuid'];
}>;


export type GetActionQuery = { app_actions_by_pk: { id: string, type: string, type_configuration: Record<string, any>, slug: string, name: string } | null };

export type GetEventActionsQueryVariables = Exact<{
  event_slug: Scalars['String'];
}>;


export type GetEventActionsQuery = { app_events: Array<{ id: string, name: string, app_id: string, extra_data: Record<string, any>, event_actions: Array<{ action: { id: string, name: string, slug: string, type: string, extra_data: Record<string, any>, retry_backoff: boolean, retry_delay: number, retry_limit: number, run_after: number, config: Record<string, any> } }> }> };

export type GetEventQueryVariables = Exact<{
  event_id: Scalars['uuid'];
}>;


export type GetEventQuery = { app_events_by_pk: { id: string, slug: string, name: string } | null };


export const GetActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"action_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app_actions_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"action_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"type_configuration"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetActionQuery, GetActionQueryVariables>;
export const GetEventActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app_events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_slug"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"app_id"}},{"kind":"Field","name":{"kind":"Name","value":"extra_data"}},{"kind":"Field","name":{"kind":"Name","value":"event_actions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","alias":{"kind":"Name","value":"config"},"name":{"kind":"Name","value":"type_configuration"}},{"kind":"Field","name":{"kind":"Name","value":"extra_data"}},{"kind":"Field","name":{"kind":"Name","value":"retry_backoff"}},{"kind":"Field","name":{"kind":"Name","value":"retry_delay"}},{"kind":"Field","name":{"kind":"Name","value":"retry_limit"}},{"kind":"Field","name":{"kind":"Name","value":"run_after"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEventActionsQuery, GetEventActionsQueryVariables>;
export const GetEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app_events_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetEventQuery, GetEventQueryVariables>;