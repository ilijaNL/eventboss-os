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
  jsonb: Record<string, any>;
  smallint: any;
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
  /** An aggregate relationship */
  event_activities_aggregate: Eventboss_Event_Activities_Aggregate;
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
export type Eventboss_ActivitiesEvent_Activities_AggregateArgs = {
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

/** aggregated selection of "eventboss.activities" */
export type Eventboss_Activities_Aggregate = {
  aggregate: Maybe<Eventboss_Activities_Aggregate_Fields>;
  nodes: Array<Eventboss_Activities>;
};

/** aggregate fields of "eventboss.activities" */
export type Eventboss_Activities_Aggregate_Fields = {
  avg: Maybe<Eventboss_Activities_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Eventboss_Activities_Max_Fields>;
  min: Maybe<Eventboss_Activities_Min_Fields>;
  stddev: Maybe<Eventboss_Activities_Stddev_Fields>;
  stddev_pop: Maybe<Eventboss_Activities_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Eventboss_Activities_Stddev_Samp_Fields>;
  sum: Maybe<Eventboss_Activities_Sum_Fields>;
  var_pop: Maybe<Eventboss_Activities_Var_Pop_Fields>;
  var_samp: Maybe<Eventboss_Activities_Var_Samp_Fields>;
  variance: Maybe<Eventboss_Activities_Variance_Fields>;
};


/** aggregate fields of "eventboss.activities" */
export type Eventboss_Activities_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Eventboss_Activities_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Activities_Append_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
  type_configuration?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Eventboss_Activities_Avg_Fields = {
  concurrency: Maybe<Scalars['Float']>;
  delay_seconds: Maybe<Scalars['Float']>;
  expire_in: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
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
  event_activities_aggregate?: InputMaybe<Eventboss_Event_Activities_Aggregate_Bool_Exp>;
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

/** unique or primary key constraints on table "eventboss.activities" */
export enum Eventboss_Activities_Constraint {
  /** unique or primary key constraint on columns "slug", "app_id" */
  ActivitiesAppIdSlugKey = 'activities_app_id_slug_key',
  /** unique or primary key constraint on columns "id" */
  ActivitiesPkey = 'activities_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Eventboss_Activities_Delete_At_Path_Input = {
  extra_data?: InputMaybe<Array<Scalars['String']>>;
  type_configuration?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Eventboss_Activities_Delete_Elem_Input = {
  extra_data?: InputMaybe<Scalars['Int']>;
  type_configuration?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Eventboss_Activities_Delete_Key_Input = {
  extra_data?: InputMaybe<Scalars['String']>;
  type_configuration?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "eventboss.activities" */
export type Eventboss_Activities_Inc_Input = {
  concurrency?: InputMaybe<Scalars['Int']>;
  delay_seconds?: InputMaybe<Scalars['Int']>;
  expire_in?: InputMaybe<Scalars['Int']>;
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "eventboss.activities" */
export type Eventboss_Activities_Insert_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  concurrency?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  delay_seconds?: InputMaybe<Scalars['Int']>;
  event_activities?: InputMaybe<Eventboss_Event_Activities_Arr_Rel_Insert_Input>;
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

/** aggregate max on columns */
export type Eventboss_Activities_Max_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  concurrency: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamptz']>;
  delay_seconds: Maybe<Scalars['Int']>;
  expire_in: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  retry_delay: Maybe<Scalars['Int']>;
  retry_limit: Maybe<Scalars['Int']>;
  slug: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Eventboss_Activities_Min_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  concurrency: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamptz']>;
  delay_seconds: Maybe<Scalars['Int']>;
  expire_in: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  retry_delay: Maybe<Scalars['Int']>;
  retry_limit: Maybe<Scalars['Int']>;
  slug: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "eventboss.activities" */
export type Eventboss_Activities_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Activities>;
};

/** input type for inserting object relation for remote table "eventboss.activities" */
export type Eventboss_Activities_Obj_Rel_Insert_Input = {
  data: Eventboss_Activities_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Eventboss_Activities_On_Conflict>;
};

/** on_conflict condition type for table "eventboss.activities" */
export type Eventboss_Activities_On_Conflict = {
  constraint: Eventboss_Activities_Constraint;
  update_columns?: Array<Eventboss_Activities_Update_Column>;
  where?: InputMaybe<Eventboss_Activities_Bool_Exp>;
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

/** primary key columns input for table: eventboss.activities */
export type Eventboss_Activities_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Activities_Prepend_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
  type_configuration?: InputMaybe<Scalars['jsonb']>;
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

/** input type for updating data in table "eventboss.activities" */
export type Eventboss_Activities_Set_Input = {
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

/** aggregate stddev on columns */
export type Eventboss_Activities_Stddev_Fields = {
  concurrency: Maybe<Scalars['Float']>;
  delay_seconds: Maybe<Scalars['Float']>;
  expire_in: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Eventboss_Activities_Stddev_Pop_Fields = {
  concurrency: Maybe<Scalars['Float']>;
  delay_seconds: Maybe<Scalars['Float']>;
  expire_in: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Eventboss_Activities_Stddev_Samp_Fields = {
  concurrency: Maybe<Scalars['Float']>;
  delay_seconds: Maybe<Scalars['Float']>;
  expire_in: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
};

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

/** aggregate sum on columns */
export type Eventboss_Activities_Sum_Fields = {
  concurrency: Maybe<Scalars['Int']>;
  delay_seconds: Maybe<Scalars['Int']>;
  expire_in: Maybe<Scalars['Int']>;
  retry_delay: Maybe<Scalars['Int']>;
  retry_limit: Maybe<Scalars['Int']>;
};

/** update columns of table "eventboss.activities" */
export enum Eventboss_Activities_Update_Column {
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

export type Eventboss_Activities_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Eventboss_Activities_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Eventboss_Activities_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Eventboss_Activities_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Eventboss_Activities_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Eventboss_Activities_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Eventboss_Activities_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Eventboss_Activities_Set_Input>;
  where: Eventboss_Activities_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Eventboss_Activities_Var_Pop_Fields = {
  concurrency: Maybe<Scalars['Float']>;
  delay_seconds: Maybe<Scalars['Float']>;
  expire_in: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Eventboss_Activities_Var_Samp_Fields = {
  concurrency: Maybe<Scalars['Float']>;
  delay_seconds: Maybe<Scalars['Float']>;
  expire_in: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Eventboss_Activities_Variance_Fields = {
  concurrency: Maybe<Scalars['Float']>;
  delay_seconds: Maybe<Scalars['Float']>;
  expire_in: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
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

/** aggregated selection of "eventboss.apps" */
export type Eventboss_Apps_Aggregate = {
  aggregate: Maybe<Eventboss_Apps_Aggregate_Fields>;
  nodes: Array<Eventboss_Apps>;
};

/** aggregate fields of "eventboss.apps" */
export type Eventboss_Apps_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<Eventboss_Apps_Max_Fields>;
  min: Maybe<Eventboss_Apps_Min_Fields>;
};


/** aggregate fields of "eventboss.apps" */
export type Eventboss_Apps_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Eventboss_Apps_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Apps_Append_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
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

/** unique or primary key constraints on table "eventboss.apps" */
export enum Eventboss_Apps_Constraint {
  /** unique or primary key constraint on columns "id" */
  AppsPkey = 'apps_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Eventboss_Apps_Delete_At_Path_Input = {
  extra_data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Eventboss_Apps_Delete_Elem_Input = {
  extra_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Eventboss_Apps_Delete_Key_Input = {
  extra_data?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "eventboss.apps" */
export type Eventboss_Apps_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Eventboss_Apps_Max_Fields = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Eventboss_Apps_Min_Fields = {
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "eventboss.apps" */
export type Eventboss_Apps_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Apps>;
};

/** on_conflict condition type for table "eventboss.apps" */
export type Eventboss_Apps_On_Conflict = {
  constraint: Eventboss_Apps_Constraint;
  update_columns?: Array<Eventboss_Apps_Update_Column>;
  where?: InputMaybe<Eventboss_Apps_Bool_Exp>;
};

/** Ordering options when selecting data from "eventboss.apps". */
export type Eventboss_Apps_Order_By = {
  created_at?: InputMaybe<Order_By>;
  extra_data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: eventboss.apps */
export type Eventboss_Apps_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Apps_Prepend_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
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

/** input type for updating data in table "eventboss.apps" */
export type Eventboss_Apps_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

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

/** update columns of table "eventboss.apps" */
export enum Eventboss_Apps_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtraData = 'extra_data',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Eventboss_Apps_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Eventboss_Apps_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Eventboss_Apps_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Eventboss_Apps_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Eventboss_Apps_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Eventboss_Apps_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Eventboss_Apps_Set_Input>;
  where: Eventboss_Apps_Bool_Exp;
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

/** aggregated selection of "eventboss.environments" */
export type Eventboss_Environments_Aggregate = {
  aggregate: Maybe<Eventboss_Environments_Aggregate_Fields>;
  nodes: Array<Eventboss_Environments>;
};

/** aggregate fields of "eventboss.environments" */
export type Eventboss_Environments_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<Eventboss_Environments_Max_Fields>;
  min: Maybe<Eventboss_Environments_Min_Fields>;
};


/** aggregate fields of "eventboss.environments" */
export type Eventboss_Environments_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Eventboss_Environments_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
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

/** unique or primary key constraints on table "eventboss.environments" */
export enum Eventboss_Environments_Constraint {
  /** unique or primary key constraint on columns "key", "app_id" */
  EnvironmentsAppIdKeyKey = 'environments_app_id_key_key',
  /** unique or primary key constraint on columns "id" */
  EnvironmentsPkey = 'environments_pkey'
}

/** input type for inserting data into table "eventboss.environments" */
export type Eventboss_Environments_Insert_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Eventboss_Environments_Max_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  key: Maybe<Scalars['String']>;
  preview: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Eventboss_Environments_Min_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  key: Maybe<Scalars['String']>;
  preview: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "eventboss.environments" */
export type Eventboss_Environments_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Environments>;
};

/** on_conflict condition type for table "eventboss.environments" */
export type Eventboss_Environments_On_Conflict = {
  constraint: Eventboss_Environments_Constraint;
  update_columns?: Array<Eventboss_Environments_Update_Column>;
  where?: InputMaybe<Eventboss_Environments_Bool_Exp>;
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

/** primary key columns input for table: eventboss.environments */
export type Eventboss_Environments_Pk_Columns_Input = {
  id: Scalars['uuid'];
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

/** input type for updating data in table "eventboss.environments" */
export type Eventboss_Environments_Set_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  key?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

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

/** update columns of table "eventboss.environments" */
export enum Eventboss_Environments_Update_Column {
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

export type Eventboss_Environments_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Eventboss_Environments_Set_Input>;
  where: Eventboss_Environments_Bool_Exp;
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

/** aggregated selection of "eventboss.event_activities" */
export type Eventboss_Event_Activities_Aggregate = {
  aggregate: Maybe<Eventboss_Event_Activities_Aggregate_Fields>;
  nodes: Array<Eventboss_Event_Activities>;
};

export type Eventboss_Event_Activities_Aggregate_Bool_Exp = {
  count?: InputMaybe<Eventboss_Event_Activities_Aggregate_Bool_Exp_Count>;
};

export type Eventboss_Event_Activities_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Eventboss_Event_Activities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "eventboss.event_activities" */
export type Eventboss_Event_Activities_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<Eventboss_Event_Activities_Max_Fields>;
  min: Maybe<Eventboss_Event_Activities_Min_Fields>;
};


/** aggregate fields of "eventboss.event_activities" */
export type Eventboss_Event_Activities_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Eventboss_Event_Activities_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "eventboss.event_activities" */
export type Eventboss_Event_Activities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Eventboss_Event_Activities_Max_Order_By>;
  min?: InputMaybe<Eventboss_Event_Activities_Min_Order_By>;
};

/** input type for inserting array relation for remote table "eventboss.event_activities" */
export type Eventboss_Event_Activities_Arr_Rel_Insert_Input = {
  data: Array<Eventboss_Event_Activities_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Eventboss_Event_Activities_On_Conflict>;
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

/** unique or primary key constraints on table "eventboss.event_activities" */
export enum Eventboss_Event_Activities_Constraint {
  /** unique or primary key constraint on columns "id" */
  EventActivitiesPkey = 'event_activities_pkey'
}

/** input type for inserting data into table "eventboss.event_activities" */
export type Eventboss_Event_Activities_Insert_Input = {
  activity?: InputMaybe<Eventboss_Activities_Obj_Rel_Insert_Input>;
  activity_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event?: InputMaybe<Eventboss_Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Eventboss_Event_Activities_Max_Fields = {
  activity_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "eventboss.event_activities" */
export type Eventboss_Event_Activities_Max_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Eventboss_Event_Activities_Min_Fields = {
  activity_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
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

/** on_conflict condition type for table "eventboss.event_activities" */
export type Eventboss_Event_Activities_On_Conflict = {
  constraint: Eventboss_Event_Activities_Constraint;
  update_columns?: Array<Eventboss_Event_Activities_Update_Column>;
  where?: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
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

/** primary key columns input for table: eventboss.event_activities */
export type Eventboss_Event_Activities_Pk_Columns_Input = {
  id: Scalars['uuid'];
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

/** input type for updating data in table "eventboss.event_activities" */
export type Eventboss_Event_Activities_Set_Input = {
  activity_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

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

/** update columns of table "eventboss.event_activities" */
export enum Eventboss_Event_Activities_Update_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id'
}

export type Eventboss_Event_Activities_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Eventboss_Event_Activities_Set_Input>;
  where: Eventboss_Event_Activities_Bool_Exp;
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

/** aggregated selection of "eventboss.event_executions" */
export type Eventboss_Event_Executions_Aggregate = {
  aggregate: Maybe<Eventboss_Event_Executions_Aggregate_Fields>;
  nodes: Array<Eventboss_Event_Executions>;
};

/** aggregate fields of "eventboss.event_executions" */
export type Eventboss_Event_Executions_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<Eventboss_Event_Executions_Max_Fields>;
  min: Maybe<Eventboss_Event_Executions_Min_Fields>;
};


/** aggregate fields of "eventboss.event_executions" */
export type Eventboss_Event_Executions_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Eventboss_Event_Executions_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Event_Executions_Append_Input = {
  payload?: InputMaybe<Scalars['jsonb']>;
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

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Eventboss_Event_Executions_Delete_At_Path_Input = {
  payload?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Eventboss_Event_Executions_Delete_Elem_Input = {
  payload?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Eventboss_Event_Executions_Delete_Key_Input = {
  payload?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "eventboss.event_executions" */
export type Eventboss_Event_Executions_Insert_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event?: InputMaybe<Eventboss_Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['uuid']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type Eventboss_Event_Executions_Max_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  exec_id: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Eventboss_Event_Executions_Min_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  exec_id: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "eventboss.event_executions" */
export type Eventboss_Event_Executions_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Event_Executions>;
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

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Event_Executions_Prepend_Input = {
  payload?: InputMaybe<Scalars['jsonb']>;
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

/** input type for updating data in table "eventboss.event_executions" */
export type Eventboss_Event_Executions_Set_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  payload?: InputMaybe<Scalars['jsonb']>;
};

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

export type Eventboss_Event_Executions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Eventboss_Event_Executions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Eventboss_Event_Executions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Eventboss_Event_Executions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Eventboss_Event_Executions_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Eventboss_Event_Executions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Eventboss_Event_Executions_Set_Input>;
  where: Eventboss_Event_Executions_Bool_Exp;
};

/** columns and relationships of "eventboss.events" */
export type Eventboss_Events = {
  app_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  event_activities: Array<Eventboss_Event_Activities>;
  /** An aggregate relationship */
  event_activities_aggregate: Eventboss_Event_Activities_Aggregate;
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
export type Eventboss_EventsEvent_Activities_AggregateArgs = {
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

/** aggregated selection of "eventboss.events" */
export type Eventboss_Events_Aggregate = {
  aggregate: Maybe<Eventboss_Events_Aggregate_Fields>;
  nodes: Array<Eventboss_Events>;
};

/** aggregate fields of "eventboss.events" */
export type Eventboss_Events_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<Eventboss_Events_Max_Fields>;
  min: Maybe<Eventboss_Events_Min_Fields>;
};


/** aggregate fields of "eventboss.events" */
export type Eventboss_Events_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Eventboss_Events_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Events_Append_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "eventboss.events". All fields are combined with a logical 'AND'. */
export type Eventboss_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Eventboss_Events_Bool_Exp>>;
  _not?: InputMaybe<Eventboss_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Eventboss_Events_Bool_Exp>>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event_activities?: InputMaybe<Eventboss_Event_Activities_Bool_Exp>;
  event_activities_aggregate?: InputMaybe<Eventboss_Event_Activities_Aggregate_Bool_Exp>;
  extra_data?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "eventboss.events" */
export enum Eventboss_Events_Constraint {
  /** unique or primary key constraint on columns "slug", "app_id" */
  EventsAppIdSlugKey = 'events_app_id_slug_key',
  /** unique or primary key constraint on columns "id" */
  EventsPkey = 'events_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Eventboss_Events_Delete_At_Path_Input = {
  extra_data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Eventboss_Events_Delete_Elem_Input = {
  extra_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Eventboss_Events_Delete_Key_Input = {
  extra_data?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "eventboss.events" */
export type Eventboss_Events_Insert_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  event_activities?: InputMaybe<Eventboss_Event_Activities_Arr_Rel_Insert_Input>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Eventboss_Events_Max_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Eventboss_Events_Min_Fields = {
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "eventboss.events" */
export type Eventboss_Events_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Events>;
};

/** input type for inserting object relation for remote table "eventboss.events" */
export type Eventboss_Events_Obj_Rel_Insert_Input = {
  data: Eventboss_Events_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Eventboss_Events_On_Conflict>;
};

/** on_conflict condition type for table "eventboss.events" */
export type Eventboss_Events_On_Conflict = {
  constraint: Eventboss_Events_Constraint;
  update_columns?: Array<Eventboss_Events_Update_Column>;
  where?: InputMaybe<Eventboss_Events_Bool_Exp>;
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

/** primary key columns input for table: eventboss.events */
export type Eventboss_Events_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Events_Prepend_Input = {
  extra_data?: InputMaybe<Scalars['jsonb']>;
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

/** input type for updating data in table "eventboss.events" */
export type Eventboss_Events_Set_Input = {
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extra_data?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

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

/** update columns of table "eventboss.events" */
export enum Eventboss_Events_Update_Column {
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

export type Eventboss_Events_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Eventboss_Events_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Eventboss_Events_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Eventboss_Events_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Eventboss_Events_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Eventboss_Events_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Eventboss_Events_Set_Input>;
  where: Eventboss_Events_Bool_Exp;
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

/** aggregated selection of "eventboss.task_logs" */
export type Eventboss_Task_Logs_Aggregate = {
  aggregate: Maybe<Eventboss_Task_Logs_Aggregate_Fields>;
  nodes: Array<Eventboss_Task_Logs>;
};

/** aggregate fields of "eventboss.task_logs" */
export type Eventboss_Task_Logs_Aggregate_Fields = {
  count: Scalars['Int'];
  max: Maybe<Eventboss_Task_Logs_Max_Fields>;
  min: Maybe<Eventboss_Task_Logs_Min_Fields>;
};


/** aggregate fields of "eventboss.task_logs" */
export type Eventboss_Task_Logs_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Eventboss_Task_Logs_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Task_Logs_Append_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
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

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Eventboss_Task_Logs_Delete_At_Path_Input = {
  data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Eventboss_Task_Logs_Delete_Elem_Input = {
  data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Eventboss_Task_Logs_Delete_Key_Input = {
  data?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "eventboss.task_logs" */
export type Eventboss_Task_Logs_Insert_Input = {
  activity?: InputMaybe<Eventboss_Activities_Obj_Rel_Insert_Input>;
  activity_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event?: InputMaybe<Eventboss_Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['uuid']>;
  event_name?: InputMaybe<Scalars['String']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  task_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Eventboss_Task_Logs_Max_Fields = {
  activity_id: Maybe<Scalars['uuid']>;
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  event_name: Maybe<Scalars['String']>;
  exec_id: Maybe<Scalars['uuid']>;
  task_id: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Eventboss_Task_Logs_Min_Fields = {
  activity_id: Maybe<Scalars['uuid']>;
  app_id: Maybe<Scalars['uuid']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['uuid']>;
  event_name: Maybe<Scalars['String']>;
  exec_id: Maybe<Scalars['uuid']>;
  task_id: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "eventboss.task_logs" */
export type Eventboss_Task_Logs_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Task_Logs>;
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

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Task_Logs_Prepend_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
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

/** input type for updating data in table "eventboss.task_logs" */
export type Eventboss_Task_Logs_Set_Input = {
  activity_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  event_name?: InputMaybe<Scalars['String']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  task_id?: InputMaybe<Scalars['uuid']>;
};

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

export type Eventboss_Task_Logs_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Eventboss_Task_Logs_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Eventboss_Task_Logs_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Eventboss_Task_Logs_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Eventboss_Task_Logs_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Eventboss_Task_Logs_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Eventboss_Task_Logs_Set_Input>;
  where: Eventboss_Task_Logs_Bool_Exp;
};

/** columns and relationships of "eventboss.task_queue" */
export type Eventboss_Task_Queue = {
  activity_id: Scalars['uuid'];
  app_id: Scalars['uuid'];
  data: Scalars['jsonb'];
  event_id: Scalars['uuid'];
  exec_id: Scalars['uuid'];
  expire_in: Scalars['interval'];
  id: Scalars['uuid'];
  idempotence_key: Maybe<Scalars['String']>;
  retry_backoff: Scalars['Boolean'];
  retry_count: Scalars['Int'];
  retry_delay: Scalars['Int'];
  retry_limit: Scalars['Int'];
  scheduled_at: Scalars['timestamptz'];
  started_at: Maybe<Scalars['timestamptz']>;
  state: Scalars['smallint'];
  type: Scalars['String'];
};


/** columns and relationships of "eventboss.task_queue" */
export type Eventboss_Task_QueueDataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "eventboss.task_queue" */
export type Eventboss_Task_Queue_Aggregate = {
  aggregate: Maybe<Eventboss_Task_Queue_Aggregate_Fields>;
  nodes: Array<Eventboss_Task_Queue>;
};

/** aggregate fields of "eventboss.task_queue" */
export type Eventboss_Task_Queue_Aggregate_Fields = {
  avg: Maybe<Eventboss_Task_Queue_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Eventboss_Task_Queue_Max_Fields>;
  min: Maybe<Eventboss_Task_Queue_Min_Fields>;
  stddev: Maybe<Eventboss_Task_Queue_Stddev_Fields>;
  stddev_pop: Maybe<Eventboss_Task_Queue_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Eventboss_Task_Queue_Stddev_Samp_Fields>;
  sum: Maybe<Eventboss_Task_Queue_Sum_Fields>;
  var_pop: Maybe<Eventboss_Task_Queue_Var_Pop_Fields>;
  var_samp: Maybe<Eventboss_Task_Queue_Var_Samp_Fields>;
  variance: Maybe<Eventboss_Task_Queue_Variance_Fields>;
};


/** aggregate fields of "eventboss.task_queue" */
export type Eventboss_Task_Queue_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Eventboss_Task_Queue_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Task_Queue_Append_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Eventboss_Task_Queue_Avg_Fields = {
  retry_count: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  state: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "eventboss.task_queue". All fields are combined with a logical 'AND'. */
export type Eventboss_Task_Queue_Bool_Exp = {
  _and?: InputMaybe<Array<Eventboss_Task_Queue_Bool_Exp>>;
  _not?: InputMaybe<Eventboss_Task_Queue_Bool_Exp>;
  _or?: InputMaybe<Array<Eventboss_Task_Queue_Bool_Exp>>;
  activity_id?: InputMaybe<Uuid_Comparison_Exp>;
  app_id?: InputMaybe<Uuid_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  event_id?: InputMaybe<Uuid_Comparison_Exp>;
  exec_id?: InputMaybe<Uuid_Comparison_Exp>;
  expire_in?: InputMaybe<Interval_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  idempotence_key?: InputMaybe<String_Comparison_Exp>;
  retry_backoff?: InputMaybe<Boolean_Comparison_Exp>;
  retry_count?: InputMaybe<Int_Comparison_Exp>;
  retry_delay?: InputMaybe<Int_Comparison_Exp>;
  retry_limit?: InputMaybe<Int_Comparison_Exp>;
  scheduled_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  started_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  state?: InputMaybe<Smallint_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "eventboss.task_queue" */
export enum Eventboss_Task_Queue_Constraint {
  /** unique or primary key constraint on columns "id" */
  TaskQueuePkey = 'task_queue_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Eventboss_Task_Queue_Delete_At_Path_Input = {
  data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Eventboss_Task_Queue_Delete_Elem_Input = {
  data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Eventboss_Task_Queue_Delete_Key_Input = {
  data?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "eventboss.task_queue" */
export type Eventboss_Task_Queue_Inc_Input = {
  retry_count?: InputMaybe<Scalars['Int']>;
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Scalars['smallint']>;
};

/** input type for inserting data into table "eventboss.task_queue" */
export type Eventboss_Task_Queue_Insert_Input = {
  activity_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  expire_in?: InputMaybe<Scalars['interval']>;
  id?: InputMaybe<Scalars['uuid']>;
  idempotence_key?: InputMaybe<Scalars['String']>;
  retry_backoff?: InputMaybe<Scalars['Boolean']>;
  retry_count?: InputMaybe<Scalars['Int']>;
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
  scheduled_at?: InputMaybe<Scalars['timestamptz']>;
  started_at?: InputMaybe<Scalars['timestamptz']>;
  state?: InputMaybe<Scalars['smallint']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Eventboss_Task_Queue_Max_Fields = {
  activity_id: Maybe<Scalars['uuid']>;
  app_id: Maybe<Scalars['uuid']>;
  event_id: Maybe<Scalars['uuid']>;
  exec_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  idempotence_key: Maybe<Scalars['String']>;
  retry_count: Maybe<Scalars['Int']>;
  retry_delay: Maybe<Scalars['Int']>;
  retry_limit: Maybe<Scalars['Int']>;
  scheduled_at: Maybe<Scalars['timestamptz']>;
  started_at: Maybe<Scalars['timestamptz']>;
  state: Maybe<Scalars['smallint']>;
  type: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Eventboss_Task_Queue_Min_Fields = {
  activity_id: Maybe<Scalars['uuid']>;
  app_id: Maybe<Scalars['uuid']>;
  event_id: Maybe<Scalars['uuid']>;
  exec_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  idempotence_key: Maybe<Scalars['String']>;
  retry_count: Maybe<Scalars['Int']>;
  retry_delay: Maybe<Scalars['Int']>;
  retry_limit: Maybe<Scalars['Int']>;
  scheduled_at: Maybe<Scalars['timestamptz']>;
  started_at: Maybe<Scalars['timestamptz']>;
  state: Maybe<Scalars['smallint']>;
  type: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "eventboss.task_queue" */
export type Eventboss_Task_Queue_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Eventboss_Task_Queue>;
};

/** on_conflict condition type for table "eventboss.task_queue" */
export type Eventboss_Task_Queue_On_Conflict = {
  constraint: Eventboss_Task_Queue_Constraint;
  update_columns?: Array<Eventboss_Task_Queue_Update_Column>;
  where?: InputMaybe<Eventboss_Task_Queue_Bool_Exp>;
};

/** Ordering options when selecting data from "eventboss.task_queue". */
export type Eventboss_Task_Queue_Order_By = {
  activity_id?: InputMaybe<Order_By>;
  app_id?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  exec_id?: InputMaybe<Order_By>;
  expire_in?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  idempotence_key?: InputMaybe<Order_By>;
  retry_backoff?: InputMaybe<Order_By>;
  retry_count?: InputMaybe<Order_By>;
  retry_delay?: InputMaybe<Order_By>;
  retry_limit?: InputMaybe<Order_By>;
  scheduled_at?: InputMaybe<Order_By>;
  started_at?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: eventboss.task_queue */
export type Eventboss_Task_Queue_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Eventboss_Task_Queue_Prepend_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "eventboss.task_queue" */
export enum Eventboss_Task_Queue_Select_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  AppId = 'app_id',
  /** column name */
  Data = 'data',
  /** column name */
  EventId = 'event_id',
  /** column name */
  ExecId = 'exec_id',
  /** column name */
  ExpireIn = 'expire_in',
  /** column name */
  Id = 'id',
  /** column name */
  IdempotenceKey = 'idempotence_key',
  /** column name */
  RetryBackoff = 'retry_backoff',
  /** column name */
  RetryCount = 'retry_count',
  /** column name */
  RetryDelay = 'retry_delay',
  /** column name */
  RetryLimit = 'retry_limit',
  /** column name */
  ScheduledAt = 'scheduled_at',
  /** column name */
  StartedAt = 'started_at',
  /** column name */
  State = 'state',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "eventboss.task_queue" */
export type Eventboss_Task_Queue_Set_Input = {
  activity_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  expire_in?: InputMaybe<Scalars['interval']>;
  id?: InputMaybe<Scalars['uuid']>;
  idempotence_key?: InputMaybe<Scalars['String']>;
  retry_backoff?: InputMaybe<Scalars['Boolean']>;
  retry_count?: InputMaybe<Scalars['Int']>;
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
  scheduled_at?: InputMaybe<Scalars['timestamptz']>;
  started_at?: InputMaybe<Scalars['timestamptz']>;
  state?: InputMaybe<Scalars['smallint']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Eventboss_Task_Queue_Stddev_Fields = {
  retry_count: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  state: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Eventboss_Task_Queue_Stddev_Pop_Fields = {
  retry_count: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  state: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Eventboss_Task_Queue_Stddev_Samp_Fields = {
  retry_count: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  state: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "eventboss_task_queue" */
export type Eventboss_Task_Queue_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eventboss_Task_Queue_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eventboss_Task_Queue_Stream_Cursor_Value_Input = {
  activity_id?: InputMaybe<Scalars['uuid']>;
  app_id?: InputMaybe<Scalars['uuid']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event_id?: InputMaybe<Scalars['uuid']>;
  exec_id?: InputMaybe<Scalars['uuid']>;
  expire_in?: InputMaybe<Scalars['interval']>;
  id?: InputMaybe<Scalars['uuid']>;
  idempotence_key?: InputMaybe<Scalars['String']>;
  retry_backoff?: InputMaybe<Scalars['Boolean']>;
  retry_count?: InputMaybe<Scalars['Int']>;
  retry_delay?: InputMaybe<Scalars['Int']>;
  retry_limit?: InputMaybe<Scalars['Int']>;
  scheduled_at?: InputMaybe<Scalars['timestamptz']>;
  started_at?: InputMaybe<Scalars['timestamptz']>;
  state?: InputMaybe<Scalars['smallint']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Eventboss_Task_Queue_Sum_Fields = {
  retry_count: Maybe<Scalars['Int']>;
  retry_delay: Maybe<Scalars['Int']>;
  retry_limit: Maybe<Scalars['Int']>;
  state: Maybe<Scalars['smallint']>;
};

/** update columns of table "eventboss.task_queue" */
export enum Eventboss_Task_Queue_Update_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  AppId = 'app_id',
  /** column name */
  Data = 'data',
  /** column name */
  EventId = 'event_id',
  /** column name */
  ExecId = 'exec_id',
  /** column name */
  ExpireIn = 'expire_in',
  /** column name */
  Id = 'id',
  /** column name */
  IdempotenceKey = 'idempotence_key',
  /** column name */
  RetryBackoff = 'retry_backoff',
  /** column name */
  RetryCount = 'retry_count',
  /** column name */
  RetryDelay = 'retry_delay',
  /** column name */
  RetryLimit = 'retry_limit',
  /** column name */
  ScheduledAt = 'scheduled_at',
  /** column name */
  StartedAt = 'started_at',
  /** column name */
  State = 'state',
  /** column name */
  Type = 'type'
}

export type Eventboss_Task_Queue_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Eventboss_Task_Queue_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Eventboss_Task_Queue_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Eventboss_Task_Queue_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Eventboss_Task_Queue_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Eventboss_Task_Queue_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Eventboss_Task_Queue_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Eventboss_Task_Queue_Set_Input>;
  where: Eventboss_Task_Queue_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Eventboss_Task_Queue_Var_Pop_Fields = {
  retry_count: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  state: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Eventboss_Task_Queue_Var_Samp_Fields = {
  retry_count: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  state: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Eventboss_Task_Queue_Variance_Fields = {
  retry_count: Maybe<Scalars['Float']>;
  retry_delay: Maybe<Scalars['Float']>;
  retry_limit: Maybe<Scalars['Float']>;
  state: Maybe<Scalars['Float']>;
};

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
  /** delete data from the table: "eventboss.apps" */
  delete_eventboss_apps: Maybe<Eventboss_Apps_Mutation_Response>;
  /** delete single row from the table: "eventboss.apps" */
  delete_eventboss_apps_by_pk: Maybe<Eventboss_Apps>;
  /** delete data from the table: "eventboss.environments" */
  delete_eventboss_environments: Maybe<Eventboss_Environments_Mutation_Response>;
  /** delete single row from the table: "eventboss.environments" */
  delete_eventboss_environments_by_pk: Maybe<Eventboss_Environments>;
  /** delete data from the table: "eventboss.event_activities" */
  delete_eventboss_event_activities: Maybe<Eventboss_Event_Activities_Mutation_Response>;
  /** delete single row from the table: "eventboss.event_activities" */
  delete_eventboss_event_activities_by_pk: Maybe<Eventboss_Event_Activities>;
  /** delete data from the table: "eventboss.event_executions" */
  delete_eventboss_event_executions: Maybe<Eventboss_Event_Executions_Mutation_Response>;
  /** delete data from the table: "eventboss.events" */
  delete_eventboss_events: Maybe<Eventboss_Events_Mutation_Response>;
  /** delete single row from the table: "eventboss.events" */
  delete_eventboss_events_by_pk: Maybe<Eventboss_Events>;
  /** delete data from the table: "eventboss.task_logs" */
  delete_eventboss_task_logs: Maybe<Eventboss_Task_Logs_Mutation_Response>;
  /** delete data from the table: "eventboss.task_queue" */
  delete_eventboss_task_queue: Maybe<Eventboss_Task_Queue_Mutation_Response>;
  /** delete single row from the table: "eventboss.task_queue" */
  delete_eventboss_task_queue_by_pk: Maybe<Eventboss_Task_Queue>;
  /** insert data into the table: "eventboss.activities" */
  insert_eventboss_activities: Maybe<Eventboss_Activities_Mutation_Response>;
  /** insert a single row into the table: "eventboss.activities" */
  insert_eventboss_activities_one: Maybe<Eventboss_Activities>;
  /** insert data into the table: "eventboss.apps" */
  insert_eventboss_apps: Maybe<Eventboss_Apps_Mutation_Response>;
  /** insert a single row into the table: "eventboss.apps" */
  insert_eventboss_apps_one: Maybe<Eventboss_Apps>;
  /** insert data into the table: "eventboss.environments" */
  insert_eventboss_environments: Maybe<Eventboss_Environments_Mutation_Response>;
  /** insert a single row into the table: "eventboss.environments" */
  insert_eventboss_environments_one: Maybe<Eventboss_Environments>;
  /** insert data into the table: "eventboss.event_activities" */
  insert_eventboss_event_activities: Maybe<Eventboss_Event_Activities_Mutation_Response>;
  /** insert a single row into the table: "eventboss.event_activities" */
  insert_eventboss_event_activities_one: Maybe<Eventboss_Event_Activities>;
  /** insert data into the table: "eventboss.event_executions" */
  insert_eventboss_event_executions: Maybe<Eventboss_Event_Executions_Mutation_Response>;
  /** insert a single row into the table: "eventboss.event_executions" */
  insert_eventboss_event_executions_one: Maybe<Eventboss_Event_Executions>;
  /** insert data into the table: "eventboss.events" */
  insert_eventboss_events: Maybe<Eventboss_Events_Mutation_Response>;
  /** insert a single row into the table: "eventboss.events" */
  insert_eventboss_events_one: Maybe<Eventboss_Events>;
  /** insert data into the table: "eventboss.task_logs" */
  insert_eventboss_task_logs: Maybe<Eventboss_Task_Logs_Mutation_Response>;
  /** insert a single row into the table: "eventboss.task_logs" */
  insert_eventboss_task_logs_one: Maybe<Eventboss_Task_Logs>;
  /** insert data into the table: "eventboss.task_queue" */
  insert_eventboss_task_queue: Maybe<Eventboss_Task_Queue_Mutation_Response>;
  /** insert a single row into the table: "eventboss.task_queue" */
  insert_eventboss_task_queue_one: Maybe<Eventboss_Task_Queue>;
  /** update data of the table: "eventboss.activities" */
  update_eventboss_activities: Maybe<Eventboss_Activities_Mutation_Response>;
  /** update single row of the table: "eventboss.activities" */
  update_eventboss_activities_by_pk: Maybe<Eventboss_Activities>;
  /** update multiples rows of table: "eventboss.activities" */
  update_eventboss_activities_many: Maybe<Array<Maybe<Eventboss_Activities_Mutation_Response>>>;
  /** update data of the table: "eventboss.apps" */
  update_eventboss_apps: Maybe<Eventboss_Apps_Mutation_Response>;
  /** update single row of the table: "eventboss.apps" */
  update_eventboss_apps_by_pk: Maybe<Eventboss_Apps>;
  /** update multiples rows of table: "eventboss.apps" */
  update_eventboss_apps_many: Maybe<Array<Maybe<Eventboss_Apps_Mutation_Response>>>;
  /** update data of the table: "eventboss.environments" */
  update_eventboss_environments: Maybe<Eventboss_Environments_Mutation_Response>;
  /** update single row of the table: "eventboss.environments" */
  update_eventboss_environments_by_pk: Maybe<Eventboss_Environments>;
  /** update multiples rows of table: "eventboss.environments" */
  update_eventboss_environments_many: Maybe<Array<Maybe<Eventboss_Environments_Mutation_Response>>>;
  /** update data of the table: "eventboss.event_activities" */
  update_eventboss_event_activities: Maybe<Eventboss_Event_Activities_Mutation_Response>;
  /** update single row of the table: "eventboss.event_activities" */
  update_eventboss_event_activities_by_pk: Maybe<Eventboss_Event_Activities>;
  /** update multiples rows of table: "eventboss.event_activities" */
  update_eventboss_event_activities_many: Maybe<Array<Maybe<Eventboss_Event_Activities_Mutation_Response>>>;
  /** update data of the table: "eventboss.event_executions" */
  update_eventboss_event_executions: Maybe<Eventboss_Event_Executions_Mutation_Response>;
  /** update multiples rows of table: "eventboss.event_executions" */
  update_eventboss_event_executions_many: Maybe<Array<Maybe<Eventboss_Event_Executions_Mutation_Response>>>;
  /** update data of the table: "eventboss.events" */
  update_eventboss_events: Maybe<Eventboss_Events_Mutation_Response>;
  /** update single row of the table: "eventboss.events" */
  update_eventboss_events_by_pk: Maybe<Eventboss_Events>;
  /** update multiples rows of table: "eventboss.events" */
  update_eventboss_events_many: Maybe<Array<Maybe<Eventboss_Events_Mutation_Response>>>;
  /** update data of the table: "eventboss.task_logs" */
  update_eventboss_task_logs: Maybe<Eventboss_Task_Logs_Mutation_Response>;
  /** update multiples rows of table: "eventboss.task_logs" */
  update_eventboss_task_logs_many: Maybe<Array<Maybe<Eventboss_Task_Logs_Mutation_Response>>>;
  /** update data of the table: "eventboss.task_queue" */
  update_eventboss_task_queue: Maybe<Eventboss_Task_Queue_Mutation_Response>;
  /** update single row of the table: "eventboss.task_queue" */
  update_eventboss_task_queue_by_pk: Maybe<Eventboss_Task_Queue>;
  /** update multiples rows of table: "eventboss.task_queue" */
  update_eventboss_task_queue_many: Maybe<Array<Maybe<Eventboss_Task_Queue_Mutation_Response>>>;
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
export type Mutation_RootDelete_Eventboss_AppsArgs = {
  where: Eventboss_Apps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Apps_By_PkArgs = {
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
export type Mutation_RootDelete_Eventboss_Event_ExecutionsArgs = {
  where: Eventboss_Event_Executions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_EventsArgs = {
  where: Eventboss_Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Task_LogsArgs = {
  where: Eventboss_Task_Logs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Task_QueueArgs = {
  where: Eventboss_Task_Queue_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Eventboss_Task_Queue_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_ActivitiesArgs = {
  objects: Array<Eventboss_Activities_Insert_Input>;
  on_conflict: InputMaybe<Eventboss_Activities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Activities_OneArgs = {
  object: Eventboss_Activities_Insert_Input;
  on_conflict: InputMaybe<Eventboss_Activities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_AppsArgs = {
  objects: Array<Eventboss_Apps_Insert_Input>;
  on_conflict: InputMaybe<Eventboss_Apps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Apps_OneArgs = {
  object: Eventboss_Apps_Insert_Input;
  on_conflict: InputMaybe<Eventboss_Apps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_EnvironmentsArgs = {
  objects: Array<Eventboss_Environments_Insert_Input>;
  on_conflict: InputMaybe<Eventboss_Environments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Environments_OneArgs = {
  object: Eventboss_Environments_Insert_Input;
  on_conflict: InputMaybe<Eventboss_Environments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Event_ActivitiesArgs = {
  objects: Array<Eventboss_Event_Activities_Insert_Input>;
  on_conflict: InputMaybe<Eventboss_Event_Activities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Event_Activities_OneArgs = {
  object: Eventboss_Event_Activities_Insert_Input;
  on_conflict: InputMaybe<Eventboss_Event_Activities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Event_ExecutionsArgs = {
  objects: Array<Eventboss_Event_Executions_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Event_Executions_OneArgs = {
  object: Eventboss_Event_Executions_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_EventsArgs = {
  objects: Array<Eventboss_Events_Insert_Input>;
  on_conflict: InputMaybe<Eventboss_Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Events_OneArgs = {
  object: Eventboss_Events_Insert_Input;
  on_conflict: InputMaybe<Eventboss_Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Task_LogsArgs = {
  objects: Array<Eventboss_Task_Logs_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Task_Logs_OneArgs = {
  object: Eventboss_Task_Logs_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Task_QueueArgs = {
  objects: Array<Eventboss_Task_Queue_Insert_Input>;
  on_conflict: InputMaybe<Eventboss_Task_Queue_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Eventboss_Task_Queue_OneArgs = {
  object: Eventboss_Task_Queue_Insert_Input;
  on_conflict: InputMaybe<Eventboss_Task_Queue_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_ActivitiesArgs = {
  _append: InputMaybe<Eventboss_Activities_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Activities_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Activities_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Activities_Delete_Key_Input>;
  _inc: InputMaybe<Eventboss_Activities_Inc_Input>;
  _prepend: InputMaybe<Eventboss_Activities_Prepend_Input>;
  _set: InputMaybe<Eventboss_Activities_Set_Input>;
  where: Eventboss_Activities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Activities_By_PkArgs = {
  _append: InputMaybe<Eventboss_Activities_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Activities_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Activities_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Activities_Delete_Key_Input>;
  _inc: InputMaybe<Eventboss_Activities_Inc_Input>;
  _prepend: InputMaybe<Eventboss_Activities_Prepend_Input>;
  _set: InputMaybe<Eventboss_Activities_Set_Input>;
  pk_columns: Eventboss_Activities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Activities_ManyArgs = {
  updates: Array<Eventboss_Activities_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_AppsArgs = {
  _append: InputMaybe<Eventboss_Apps_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Apps_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Apps_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Apps_Delete_Key_Input>;
  _prepend: InputMaybe<Eventboss_Apps_Prepend_Input>;
  _set: InputMaybe<Eventboss_Apps_Set_Input>;
  where: Eventboss_Apps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Apps_By_PkArgs = {
  _append: InputMaybe<Eventboss_Apps_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Apps_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Apps_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Apps_Delete_Key_Input>;
  _prepend: InputMaybe<Eventboss_Apps_Prepend_Input>;
  _set: InputMaybe<Eventboss_Apps_Set_Input>;
  pk_columns: Eventboss_Apps_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Apps_ManyArgs = {
  updates: Array<Eventboss_Apps_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_EnvironmentsArgs = {
  _set: InputMaybe<Eventboss_Environments_Set_Input>;
  where: Eventboss_Environments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Environments_By_PkArgs = {
  _set: InputMaybe<Eventboss_Environments_Set_Input>;
  pk_columns: Eventboss_Environments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Environments_ManyArgs = {
  updates: Array<Eventboss_Environments_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Event_ActivitiesArgs = {
  _set: InputMaybe<Eventboss_Event_Activities_Set_Input>;
  where: Eventboss_Event_Activities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Event_Activities_By_PkArgs = {
  _set: InputMaybe<Eventboss_Event_Activities_Set_Input>;
  pk_columns: Eventboss_Event_Activities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Event_Activities_ManyArgs = {
  updates: Array<Eventboss_Event_Activities_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Event_ExecutionsArgs = {
  _append: InputMaybe<Eventboss_Event_Executions_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Event_Executions_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Event_Executions_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Event_Executions_Delete_Key_Input>;
  _prepend: InputMaybe<Eventboss_Event_Executions_Prepend_Input>;
  _set: InputMaybe<Eventboss_Event_Executions_Set_Input>;
  where: Eventboss_Event_Executions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Event_Executions_ManyArgs = {
  updates: Array<Eventboss_Event_Executions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_EventsArgs = {
  _append: InputMaybe<Eventboss_Events_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Events_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Events_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Events_Delete_Key_Input>;
  _prepend: InputMaybe<Eventboss_Events_Prepend_Input>;
  _set: InputMaybe<Eventboss_Events_Set_Input>;
  where: Eventboss_Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Events_By_PkArgs = {
  _append: InputMaybe<Eventboss_Events_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Events_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Events_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Events_Delete_Key_Input>;
  _prepend: InputMaybe<Eventboss_Events_Prepend_Input>;
  _set: InputMaybe<Eventboss_Events_Set_Input>;
  pk_columns: Eventboss_Events_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Events_ManyArgs = {
  updates: Array<Eventboss_Events_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Task_LogsArgs = {
  _append: InputMaybe<Eventboss_Task_Logs_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Task_Logs_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Task_Logs_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Task_Logs_Delete_Key_Input>;
  _prepend: InputMaybe<Eventboss_Task_Logs_Prepend_Input>;
  _set: InputMaybe<Eventboss_Task_Logs_Set_Input>;
  where: Eventboss_Task_Logs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Task_Logs_ManyArgs = {
  updates: Array<Eventboss_Task_Logs_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Task_QueueArgs = {
  _append: InputMaybe<Eventboss_Task_Queue_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Task_Queue_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Task_Queue_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Task_Queue_Delete_Key_Input>;
  _inc: InputMaybe<Eventboss_Task_Queue_Inc_Input>;
  _prepend: InputMaybe<Eventboss_Task_Queue_Prepend_Input>;
  _set: InputMaybe<Eventboss_Task_Queue_Set_Input>;
  where: Eventboss_Task_Queue_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Task_Queue_By_PkArgs = {
  _append: InputMaybe<Eventboss_Task_Queue_Append_Input>;
  _delete_at_path: InputMaybe<Eventboss_Task_Queue_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Eventboss_Task_Queue_Delete_Elem_Input>;
  _delete_key: InputMaybe<Eventboss_Task_Queue_Delete_Key_Input>;
  _inc: InputMaybe<Eventboss_Task_Queue_Inc_Input>;
  _prepend: InputMaybe<Eventboss_Task_Queue_Prepend_Input>;
  _set: InputMaybe<Eventboss_Task_Queue_Set_Input>;
  pk_columns: Eventboss_Task_Queue_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Eventboss_Task_Queue_ManyArgs = {
  updates: Array<Eventboss_Task_Queue_Updates>;
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
  /** fetch aggregated fields from the table: "eventboss.activities" */
  eventboss_activities_aggregate: Eventboss_Activities_Aggregate;
  /** fetch data from the table: "eventboss.activities" using primary key columns */
  eventboss_activities_by_pk: Maybe<Eventboss_Activities>;
  /** fetch data from the table: "eventboss.apps" */
  eventboss_apps: Array<Eventboss_Apps>;
  /** fetch aggregated fields from the table: "eventboss.apps" */
  eventboss_apps_aggregate: Eventboss_Apps_Aggregate;
  /** fetch data from the table: "eventboss.apps" using primary key columns */
  eventboss_apps_by_pk: Maybe<Eventboss_Apps>;
  /** fetch data from the table: "eventboss.environments" */
  eventboss_environments: Array<Eventboss_Environments>;
  /** fetch aggregated fields from the table: "eventboss.environments" */
  eventboss_environments_aggregate: Eventboss_Environments_Aggregate;
  /** fetch data from the table: "eventboss.environments" using primary key columns */
  eventboss_environments_by_pk: Maybe<Eventboss_Environments>;
  /** fetch data from the table: "eventboss.event_activities" */
  eventboss_event_activities: Array<Eventboss_Event_Activities>;
  /** fetch aggregated fields from the table: "eventboss.event_activities" */
  eventboss_event_activities_aggregate: Eventboss_Event_Activities_Aggregate;
  /** fetch data from the table: "eventboss.event_activities" using primary key columns */
  eventboss_event_activities_by_pk: Maybe<Eventboss_Event_Activities>;
  /** fetch data from the table: "eventboss.event_executions" */
  eventboss_event_executions: Array<Eventboss_Event_Executions>;
  /** fetch aggregated fields from the table: "eventboss.event_executions" */
  eventboss_event_executions_aggregate: Eventboss_Event_Executions_Aggregate;
  /** fetch data from the table: "eventboss.events" */
  eventboss_events: Array<Eventboss_Events>;
  /** fetch aggregated fields from the table: "eventboss.events" */
  eventboss_events_aggregate: Eventboss_Events_Aggregate;
  /** fetch data from the table: "eventboss.events" using primary key columns */
  eventboss_events_by_pk: Maybe<Eventboss_Events>;
  /** fetch data from the table: "eventboss.task_logs" */
  eventboss_task_logs: Array<Eventboss_Task_Logs>;
  /** fetch aggregated fields from the table: "eventboss.task_logs" */
  eventboss_task_logs_aggregate: Eventboss_Task_Logs_Aggregate;
  /** fetch data from the table: "eventboss.task_queue" */
  eventboss_task_queue: Array<Eventboss_Task_Queue>;
  /** fetch aggregated fields from the table: "eventboss.task_queue" */
  eventboss_task_queue_aggregate: Eventboss_Task_Queue_Aggregate;
  /** fetch data from the table: "eventboss.task_queue" using primary key columns */
  eventboss_task_queue_by_pk: Maybe<Eventboss_Task_Queue>;
};


export type Query_RootEventboss_ActivitiesArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Activities_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Activities_Order_By>>;
  where: InputMaybe<Eventboss_Activities_Bool_Exp>;
};


export type Query_RootEventboss_Activities_AggregateArgs = {
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


export type Query_RootEventboss_Apps_AggregateArgs = {
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


export type Query_RootEventboss_Environments_AggregateArgs = {
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


export type Query_RootEventboss_Event_Activities_AggregateArgs = {
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


export type Query_RootEventboss_Event_Executions_AggregateArgs = {
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


export type Query_RootEventboss_Events_AggregateArgs = {
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


export type Query_RootEventboss_Task_Logs_AggregateArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Task_Logs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Task_Logs_Order_By>>;
  where: InputMaybe<Eventboss_Task_Logs_Bool_Exp>;
};


export type Query_RootEventboss_Task_QueueArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Task_Queue_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Task_Queue_Order_By>>;
  where: InputMaybe<Eventboss_Task_Queue_Bool_Exp>;
};


export type Query_RootEventboss_Task_Queue_AggregateArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Task_Queue_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Task_Queue_Order_By>>;
  where: InputMaybe<Eventboss_Task_Queue_Bool_Exp>;
};


export type Query_RootEventboss_Task_Queue_By_PkArgs = {
  id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']>;
  _gt?: InputMaybe<Scalars['smallint']>;
  _gte?: InputMaybe<Scalars['smallint']>;
  _in?: InputMaybe<Array<Scalars['smallint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['smallint']>;
  _lte?: InputMaybe<Scalars['smallint']>;
  _neq?: InputMaybe<Scalars['smallint']>;
  _nin?: InputMaybe<Array<Scalars['smallint']>>;
};

export type Subscription_Root = {
  /** fetch data from the table: "eventboss.activities" */
  eventboss_activities: Array<Eventboss_Activities>;
  /** fetch aggregated fields from the table: "eventboss.activities" */
  eventboss_activities_aggregate: Eventboss_Activities_Aggregate;
  /** fetch data from the table: "eventboss.activities" using primary key columns */
  eventboss_activities_by_pk: Maybe<Eventboss_Activities>;
  /** fetch data from the table in a streaming manner: "eventboss.activities" */
  eventboss_activities_stream: Array<Eventboss_Activities>;
  /** fetch data from the table: "eventboss.apps" */
  eventboss_apps: Array<Eventboss_Apps>;
  /** fetch aggregated fields from the table: "eventboss.apps" */
  eventboss_apps_aggregate: Eventboss_Apps_Aggregate;
  /** fetch data from the table: "eventboss.apps" using primary key columns */
  eventboss_apps_by_pk: Maybe<Eventboss_Apps>;
  /** fetch data from the table in a streaming manner: "eventboss.apps" */
  eventboss_apps_stream: Array<Eventboss_Apps>;
  /** fetch data from the table: "eventboss.environments" */
  eventboss_environments: Array<Eventboss_Environments>;
  /** fetch aggregated fields from the table: "eventboss.environments" */
  eventboss_environments_aggregate: Eventboss_Environments_Aggregate;
  /** fetch data from the table: "eventboss.environments" using primary key columns */
  eventboss_environments_by_pk: Maybe<Eventboss_Environments>;
  /** fetch data from the table in a streaming manner: "eventboss.environments" */
  eventboss_environments_stream: Array<Eventboss_Environments>;
  /** fetch data from the table: "eventboss.event_activities" */
  eventboss_event_activities: Array<Eventboss_Event_Activities>;
  /** fetch aggregated fields from the table: "eventboss.event_activities" */
  eventboss_event_activities_aggregate: Eventboss_Event_Activities_Aggregate;
  /** fetch data from the table: "eventboss.event_activities" using primary key columns */
  eventboss_event_activities_by_pk: Maybe<Eventboss_Event_Activities>;
  /** fetch data from the table in a streaming manner: "eventboss.event_activities" */
  eventboss_event_activities_stream: Array<Eventboss_Event_Activities>;
  /** fetch data from the table: "eventboss.event_executions" */
  eventboss_event_executions: Array<Eventboss_Event_Executions>;
  /** fetch aggregated fields from the table: "eventboss.event_executions" */
  eventboss_event_executions_aggregate: Eventboss_Event_Executions_Aggregate;
  /** fetch data from the table in a streaming manner: "eventboss.event_executions" */
  eventboss_event_executions_stream: Array<Eventboss_Event_Executions>;
  /** fetch data from the table: "eventboss.events" */
  eventboss_events: Array<Eventboss_Events>;
  /** fetch aggregated fields from the table: "eventboss.events" */
  eventboss_events_aggregate: Eventboss_Events_Aggregate;
  /** fetch data from the table: "eventboss.events" using primary key columns */
  eventboss_events_by_pk: Maybe<Eventboss_Events>;
  /** fetch data from the table in a streaming manner: "eventboss.events" */
  eventboss_events_stream: Array<Eventboss_Events>;
  /** fetch data from the table: "eventboss.task_logs" */
  eventboss_task_logs: Array<Eventboss_Task_Logs>;
  /** fetch aggregated fields from the table: "eventboss.task_logs" */
  eventboss_task_logs_aggregate: Eventboss_Task_Logs_Aggregate;
  /** fetch data from the table in a streaming manner: "eventboss.task_logs" */
  eventboss_task_logs_stream: Array<Eventboss_Task_Logs>;
  /** fetch data from the table: "eventboss.task_queue" */
  eventboss_task_queue: Array<Eventboss_Task_Queue>;
  /** fetch aggregated fields from the table: "eventboss.task_queue" */
  eventboss_task_queue_aggregate: Eventboss_Task_Queue_Aggregate;
  /** fetch data from the table: "eventboss.task_queue" using primary key columns */
  eventboss_task_queue_by_pk: Maybe<Eventboss_Task_Queue>;
  /** fetch data from the table in a streaming manner: "eventboss.task_queue" */
  eventboss_task_queue_stream: Array<Eventboss_Task_Queue>;
};


export type Subscription_RootEventboss_ActivitiesArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Activities_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Activities_Order_By>>;
  where: InputMaybe<Eventboss_Activities_Bool_Exp>;
};


export type Subscription_RootEventboss_Activities_AggregateArgs = {
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


export type Subscription_RootEventboss_Apps_AggregateArgs = {
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


export type Subscription_RootEventboss_Environments_AggregateArgs = {
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


export type Subscription_RootEventboss_Event_Activities_AggregateArgs = {
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


export type Subscription_RootEventboss_Event_Executions_AggregateArgs = {
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


export type Subscription_RootEventboss_Events_AggregateArgs = {
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


export type Subscription_RootEventboss_Task_Logs_AggregateArgs = {
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


export type Subscription_RootEventboss_Task_QueueArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Task_Queue_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Task_Queue_Order_By>>;
  where: InputMaybe<Eventboss_Task_Queue_Bool_Exp>;
};


export type Subscription_RootEventboss_Task_Queue_AggregateArgs = {
  distinct_on: InputMaybe<Array<Eventboss_Task_Queue_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Eventboss_Task_Queue_Order_By>>;
  where: InputMaybe<Eventboss_Task_Queue_Bool_Exp>;
};


export type Subscription_RootEventboss_Task_Queue_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEventboss_Task_Queue_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Eventboss_Task_Queue_Stream_Cursor_Input>>;
  where: InputMaybe<Eventboss_Task_Queue_Bool_Exp>;
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


export type AppsQuery = { eventboss_apps: Array<{ id: string }> };


export const AppsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Apps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventboss_apps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AppsQuery, AppsQueryVariables>;