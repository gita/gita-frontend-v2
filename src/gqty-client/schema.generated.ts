/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  date: any;
  timestamptz: any;
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export interface Boolean_comparison_exp {
  _eq?: InputMaybe<Scalars["Boolean"]>;
  _gt?: InputMaybe<Scalars["Boolean"]>;
  _gte?: InputMaybe<Scalars["Boolean"]>;
  _in?: InputMaybe<Array<Scalars["Boolean"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Boolean"]>;
  _lte?: InputMaybe<Scalars["Boolean"]>;
  _neq?: InputMaybe<Scalars["Boolean"]>;
  _nin?: InputMaybe<Array<Scalars["Boolean"]>>;
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export interface Int_comparison_exp {
  _eq?: InputMaybe<Scalars["Int"]>;
  _gt?: InputMaybe<Scalars["Int"]>;
  _gte?: InputMaybe<Scalars["Int"]>;
  _in?: InputMaybe<Array<Scalars["Int"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Int"]>;
  _lte?: InputMaybe<Scalars["Int"]>;
  _neq?: InputMaybe<Scalars["Int"]>;
  _nin?: InputMaybe<Array<Scalars["Int"]>>;
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export interface String_comparison_exp {
  _eq?: InputMaybe<Scalars["String"]>;
  _gt?: InputMaybe<Scalars["String"]>;
  _gte?: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>;
  _in?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>;
  _lt?: InputMaybe<Scalars["String"]>;
  _lte?: InputMaybe<Scalars["String"]>;
  _neq?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>;
  _nin?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>;
}

/** ordering argument of a cursor */
export const cursor_ordering = {
  /** ascending ordering of the cursor */
  ASC: "ASC",
  /** descending ordering of the cursor */
  DESC: "DESC",
} as const;

export type cursor_ordering =
  (typeof cursor_ordering)[keyof typeof cursor_ordering];
/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export interface date_comparison_exp {
  _eq?: InputMaybe<Scalars["date"]>;
  _gt?: InputMaybe<Scalars["date"]>;
  _gte?: InputMaybe<Scalars["date"]>;
  _in?: InputMaybe<Array<Scalars["date"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["date"]>;
  _lte?: InputMaybe<Scalars["date"]>;
  _neq?: InputMaybe<Scalars["date"]>;
  _nin?: InputMaybe<Array<Scalars["date"]>>;
}

/** Boolean expression to filter rows from the table "gita_authors". All fields are combined with a logical 'AND'. */
export interface gita_authors_bool_exp {
  _and?: InputMaybe<Array<gita_authors_bool_exp>>;
  _not?: InputMaybe<gita_authors_bool_exp>;
  _or?: InputMaybe<Array<gita_authors_bool_exp>>;
  gita_commentaries?: InputMaybe<gita_commentaries_bool_exp>;
  gita_commentaries_aggregate?: InputMaybe<gita_commentaries_aggregate_bool_exp>;
  gita_translations?: InputMaybe<gita_translations_bool_exp>;
  gita_translations_aggregate?: InputMaybe<gita_translations_aggregate_bool_exp>;
  id?: InputMaybe<Int_comparison_exp>;
  name?: InputMaybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "gita_authors" */
export const gita_authors_constraint = {
  /** unique or primary key constraint on columns "id" */
  gita_authors_pkey: "gita_authors_pkey",
} as const;

export type gita_authors_constraint =
  (typeof gita_authors_constraint)[keyof typeof gita_authors_constraint];
/** input type for incrementing numeric columns in table "gita_authors" */
export interface gita_authors_inc_input {
  id?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting data into table "gita_authors" */
export interface gita_authors_insert_input {
  gita_commentaries?: InputMaybe<gita_commentaries_arr_rel_insert_input>;
  gita_translations?: InputMaybe<gita_translations_arr_rel_insert_input>;
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
}

/** input type for inserting object relation for remote table "gita_authors" */
export interface gita_authors_obj_rel_insert_input {
  data: gita_authors_insert_input;
  /** upsert condition */
  on_conflict?: InputMaybe<gita_authors_on_conflict>;
}

/** on_conflict condition type for table "gita_authors" */
export interface gita_authors_on_conflict {
  constraint: gita_authors_constraint;
  update_columns?: Array<gita_authors_update_column>;
  where?: InputMaybe<gita_authors_bool_exp>;
}

/** Ordering options when selecting data from "gita_authors". */
export interface gita_authors_order_by {
  gita_commentaries_aggregate?: InputMaybe<gita_commentaries_aggregate_order_by>;
  gita_translations_aggregate?: InputMaybe<gita_translations_aggregate_order_by>;
  id?: InputMaybe<order_by>;
  name?: InputMaybe<order_by>;
}

/** primary key columns input for table: gita_authors */
export interface gita_authors_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "gita_authors" */
export const gita_authors_select_column = {
  /** column name */
  id: "id",
  /** column name */
  name: "name",
} as const;

export type gita_authors_select_column =
  (typeof gita_authors_select_column)[keyof typeof gita_authors_select_column];
/** input type for updating data in table "gita_authors" */
export interface gita_authors_set_input {
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
}

/** Streaming cursor of the table "gita_authors" */
export interface gita_authors_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gita_authors_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface gita_authors_stream_cursor_value_input {
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
}

/** update columns of table "gita_authors" */
export const gita_authors_update_column = {
  /** column name */
  id: "id",
  /** column name */
  name: "name",
} as const;

export type gita_authors_update_column =
  (typeof gita_authors_update_column)[keyof typeof gita_authors_update_column];
export interface gita_authors_updates {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<gita_authors_inc_input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<gita_authors_set_input>;
  /** filter the rows which have to be updated */
  where: gita_authors_bool_exp;
}

/** Boolean expression to filter rows from the table "gita_chapters". All fields are combined with a logical 'AND'. */
export interface gita_chapters_bool_exp {
  _and?: InputMaybe<Array<gita_chapters_bool_exp>>;
  _not?: InputMaybe<gita_chapters_bool_exp>;
  _or?: InputMaybe<Array<gita_chapters_bool_exp>>;
  chapter_number?: InputMaybe<Int_comparison_exp>;
  chapter_summary?: InputMaybe<String_comparison_exp>;
  chapter_summary_hindi?: InputMaybe<String_comparison_exp>;
  gita_verses?: InputMaybe<gita_verses_bool_exp>;
  gita_verses_aggregate?: InputMaybe<gita_verses_aggregate_bool_exp>;
  id?: InputMaybe<Int_comparison_exp>;
  name?: InputMaybe<String_comparison_exp>;
  name_meaning?: InputMaybe<String_comparison_exp>;
  name_translated?: InputMaybe<String_comparison_exp>;
  name_transliterated?: InputMaybe<String_comparison_exp>;
  slug?: InputMaybe<String_comparison_exp>;
  verses_count?: InputMaybe<Int_comparison_exp>;
}

/** unique or primary key constraints on table "gita_chapters" */
export const gita_chapters_constraint = {
  /** unique or primary key constraint on columns "id" */
  gita_chapters_pkey: "gita_chapters_pkey",
} as const;

export type gita_chapters_constraint =
  (typeof gita_chapters_constraint)[keyof typeof gita_chapters_constraint];
/** input type for incrementing numeric columns in table "gita_chapters" */
export interface gita_chapters_inc_input {
  chapter_number?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["Int"]>;
  verses_count?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting data into table "gita_chapters" */
export interface gita_chapters_insert_input {
  chapter_number?: InputMaybe<Scalars["Int"]>;
  chapter_summary?: InputMaybe<Scalars["String"]>;
  chapter_summary_hindi?: InputMaybe<Scalars["String"]>;
  gita_verses?: InputMaybe<gita_verses_arr_rel_insert_input>;
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_meaning?: InputMaybe<Scalars["String"]>;
  name_translated?: InputMaybe<Scalars["String"]>;
  name_transliterated?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  verses_count?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting object relation for remote table "gita_chapters" */
export interface gita_chapters_obj_rel_insert_input {
  data: gita_chapters_insert_input;
  /** upsert condition */
  on_conflict?: InputMaybe<gita_chapters_on_conflict>;
}

/** on_conflict condition type for table "gita_chapters" */
export interface gita_chapters_on_conflict {
  constraint: gita_chapters_constraint;
  update_columns?: Array<gita_chapters_update_column>;
  where?: InputMaybe<gita_chapters_bool_exp>;
}

/** Ordering options when selecting data from "gita_chapters". */
export interface gita_chapters_order_by {
  chapter_number?: InputMaybe<order_by>;
  chapter_summary?: InputMaybe<order_by>;
  chapter_summary_hindi?: InputMaybe<order_by>;
  gita_verses_aggregate?: InputMaybe<gita_verses_aggregate_order_by>;
  id?: InputMaybe<order_by>;
  name?: InputMaybe<order_by>;
  name_meaning?: InputMaybe<order_by>;
  name_translated?: InputMaybe<order_by>;
  name_transliterated?: InputMaybe<order_by>;
  slug?: InputMaybe<order_by>;
  verses_count?: InputMaybe<order_by>;
}

/** primary key columns input for table: gita_chapters */
export interface gita_chapters_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "gita_chapters" */
export const gita_chapters_select_column = {
  /** column name */
  chapter_number: "chapter_number",
  /** column name */
  chapter_summary: "chapter_summary",
  /** column name */
  chapter_summary_hindi: "chapter_summary_hindi",
  /** column name */
  id: "id",
  /** column name */
  name: "name",
  /** column name */
  name_meaning: "name_meaning",
  /** column name */
  name_translated: "name_translated",
  /** column name */
  name_transliterated: "name_transliterated",
  /** column name */
  slug: "slug",
  /** column name */
  verses_count: "verses_count",
} as const;

export type gita_chapters_select_column =
  (typeof gita_chapters_select_column)[keyof typeof gita_chapters_select_column];
/** input type for updating data in table "gita_chapters" */
export interface gita_chapters_set_input {
  chapter_number?: InputMaybe<Scalars["Int"]>;
  chapter_summary?: InputMaybe<Scalars["String"]>;
  chapter_summary_hindi?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_meaning?: InputMaybe<Scalars["String"]>;
  name_translated?: InputMaybe<Scalars["String"]>;
  name_transliterated?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  verses_count?: InputMaybe<Scalars["Int"]>;
}

/** Streaming cursor of the table "gita_chapters" */
export interface gita_chapters_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gita_chapters_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface gita_chapters_stream_cursor_value_input {
  chapter_number?: InputMaybe<Scalars["Int"]>;
  chapter_summary?: InputMaybe<Scalars["String"]>;
  chapter_summary_hindi?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  name_meaning?: InputMaybe<Scalars["String"]>;
  name_translated?: InputMaybe<Scalars["String"]>;
  name_transliterated?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  verses_count?: InputMaybe<Scalars["Int"]>;
}

/** update columns of table "gita_chapters" */
export const gita_chapters_update_column = {
  /** column name */
  chapter_number: "chapter_number",
  /** column name */
  chapter_summary: "chapter_summary",
  /** column name */
  chapter_summary_hindi: "chapter_summary_hindi",
  /** column name */
  id: "id",
  /** column name */
  name: "name",
  /** column name */
  name_meaning: "name_meaning",
  /** column name */
  name_translated: "name_translated",
  /** column name */
  name_transliterated: "name_transliterated",
  /** column name */
  slug: "slug",
  /** column name */
  verses_count: "verses_count",
} as const;

export type gita_chapters_update_column =
  (typeof gita_chapters_update_column)[keyof typeof gita_chapters_update_column];
export interface gita_chapters_updates {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<gita_chapters_inc_input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<gita_chapters_set_input>;
  /** filter the rows which have to be updated */
  where: gita_chapters_bool_exp;
}

export interface gita_commentaries_aggregate_bool_exp {
  count?: InputMaybe<gita_commentaries_aggregate_bool_exp_count>;
}

export interface gita_commentaries_aggregate_bool_exp_count {
  arguments?: InputMaybe<Array<gita_commentaries_select_column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<gita_commentaries_bool_exp>;
  predicate: Int_comparison_exp;
}

/** order by aggregate values of table "gita_commentaries" */
export interface gita_commentaries_aggregate_order_by {
  avg?: InputMaybe<gita_commentaries_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<gita_commentaries_max_order_by>;
  min?: InputMaybe<gita_commentaries_min_order_by>;
  stddev?: InputMaybe<gita_commentaries_stddev_order_by>;
  stddev_pop?: InputMaybe<gita_commentaries_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<gita_commentaries_stddev_samp_order_by>;
  sum?: InputMaybe<gita_commentaries_sum_order_by>;
  var_pop?: InputMaybe<gita_commentaries_var_pop_order_by>;
  var_samp?: InputMaybe<gita_commentaries_var_samp_order_by>;
  variance?: InputMaybe<gita_commentaries_variance_order_by>;
}

/** input type for inserting array relation for remote table "gita_commentaries" */
export interface gita_commentaries_arr_rel_insert_input {
  data: Array<gita_commentaries_insert_input>;
  /** upsert condition */
  on_conflict?: InputMaybe<gita_commentaries_on_conflict>;
}

/** order by avg() on columns of table "gita_commentaries" */
export interface gita_commentaries_avg_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** Boolean expression to filter rows from the table "gita_commentaries". All fields are combined with a logical 'AND'. */
export interface gita_commentaries_bool_exp {
  _and?: InputMaybe<Array<gita_commentaries_bool_exp>>;
  _not?: InputMaybe<gita_commentaries_bool_exp>;
  _or?: InputMaybe<Array<gita_commentaries_bool_exp>>;
  author_id?: InputMaybe<Int_comparison_exp>;
  author_name?: InputMaybe<String_comparison_exp>;
  description?: InputMaybe<String_comparison_exp>;
  gita_author?: InputMaybe<gita_authors_bool_exp>;
  gita_language?: InputMaybe<gita_languages_bool_exp>;
  gita_verse?: InputMaybe<gita_verses_bool_exp>;
  id?: InputMaybe<Int_comparison_exp>;
  language?: InputMaybe<String_comparison_exp>;
  language_id?: InputMaybe<Int_comparison_exp>;
  verse_id?: InputMaybe<Int_comparison_exp>;
}

/** unique or primary key constraints on table "gita_commentaries" */
export const gita_commentaries_constraint = {
  /** unique or primary key constraint on columns "id" */
  gita_commentaries_pkey: "gita_commentaries_pkey",
} as const;

export type gita_commentaries_constraint =
  (typeof gita_commentaries_constraint)[keyof typeof gita_commentaries_constraint];
/** input type for incrementing numeric columns in table "gita_commentaries" */
export interface gita_commentaries_inc_input {
  author_id?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["Int"]>;
  language_id?: InputMaybe<Scalars["Int"]>;
  verse_id?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting data into table "gita_commentaries" */
export interface gita_commentaries_insert_input {
  author_id?: InputMaybe<Scalars["Int"]>;
  author_name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  gita_author?: InputMaybe<gita_authors_obj_rel_insert_input>;
  gita_language?: InputMaybe<gita_languages_obj_rel_insert_input>;
  gita_verse?: InputMaybe<gita_verses_obj_rel_insert_input>;
  id?: InputMaybe<Scalars["Int"]>;
  language?: InputMaybe<Scalars["String"]>;
  language_id?: InputMaybe<Scalars["Int"]>;
  verse_id?: InputMaybe<Scalars["Int"]>;
}

/** order by max() on columns of table "gita_commentaries" */
export interface gita_commentaries_max_order_by {
  author_id?: InputMaybe<order_by>;
  author_name?: InputMaybe<order_by>;
  description?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by min() on columns of table "gita_commentaries" */
export interface gita_commentaries_min_order_by {
  author_id?: InputMaybe<order_by>;
  author_name?: InputMaybe<order_by>;
  description?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** on_conflict condition type for table "gita_commentaries" */
export interface gita_commentaries_on_conflict {
  constraint: gita_commentaries_constraint;
  update_columns?: Array<gita_commentaries_update_column>;
  where?: InputMaybe<gita_commentaries_bool_exp>;
}

/** Ordering options when selecting data from "gita_commentaries". */
export interface gita_commentaries_order_by {
  author_id?: InputMaybe<order_by>;
  author_name?: InputMaybe<order_by>;
  description?: InputMaybe<order_by>;
  gita_author?: InputMaybe<gita_authors_order_by>;
  gita_language?: InputMaybe<gita_languages_order_by>;
  gita_verse?: InputMaybe<gita_verses_order_by>;
  id?: InputMaybe<order_by>;
  language?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** primary key columns input for table: gita_commentaries */
export interface gita_commentaries_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "gita_commentaries" */
export const gita_commentaries_select_column = {
  /** column name */
  author_id: "author_id",
  /** column name */
  author_name: "author_name",
  /** column name */
  description: "description",
  /** column name */
  id: "id",
  /** column name */
  language: "language",
  /** column name */
  language_id: "language_id",
  /** column name */
  verse_id: "verse_id",
} as const;

export type gita_commentaries_select_column =
  (typeof gita_commentaries_select_column)[keyof typeof gita_commentaries_select_column];
/** input type for updating data in table "gita_commentaries" */
export interface gita_commentaries_set_input {
  author_id?: InputMaybe<Scalars["Int"]>;
  author_name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  language?: InputMaybe<Scalars["String"]>;
  language_id?: InputMaybe<Scalars["Int"]>;
  verse_id?: InputMaybe<Scalars["Int"]>;
}

/** order by stddev() on columns of table "gita_commentaries" */
export interface gita_commentaries_stddev_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by stddev_pop() on columns of table "gita_commentaries" */
export interface gita_commentaries_stddev_pop_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by stddev_samp() on columns of table "gita_commentaries" */
export interface gita_commentaries_stddev_samp_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** Streaming cursor of the table "gita_commentaries" */
export interface gita_commentaries_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gita_commentaries_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface gita_commentaries_stream_cursor_value_input {
  author_id?: InputMaybe<Scalars["Int"]>;
  author_name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  language?: InputMaybe<Scalars["String"]>;
  language_id?: InputMaybe<Scalars["Int"]>;
  verse_id?: InputMaybe<Scalars["Int"]>;
}

/** order by sum() on columns of table "gita_commentaries" */
export interface gita_commentaries_sum_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** update columns of table "gita_commentaries" */
export const gita_commentaries_update_column = {
  /** column name */
  author_id: "author_id",
  /** column name */
  author_name: "author_name",
  /** column name */
  description: "description",
  /** column name */
  id: "id",
  /** column name */
  language: "language",
  /** column name */
  language_id: "language_id",
  /** column name */
  verse_id: "verse_id",
} as const;

export type gita_commentaries_update_column =
  (typeof gita_commentaries_update_column)[keyof typeof gita_commentaries_update_column];
export interface gita_commentaries_updates {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<gita_commentaries_inc_input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<gita_commentaries_set_input>;
  /** filter the rows which have to be updated */
  where: gita_commentaries_bool_exp;
}

/** order by var_pop() on columns of table "gita_commentaries" */
export interface gita_commentaries_var_pop_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by var_samp() on columns of table "gita_commentaries" */
export interface gita_commentaries_var_samp_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by variance() on columns of table "gita_commentaries" */
export interface gita_commentaries_variance_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** Boolean expression to filter rows from the table "gita_languages". All fields are combined with a logical 'AND'. */
export interface gita_languages_bool_exp {
  _and?: InputMaybe<Array<gita_languages_bool_exp>>;
  _not?: InputMaybe<gita_languages_bool_exp>;
  _or?: InputMaybe<Array<gita_languages_bool_exp>>;
  gita_commentaries?: InputMaybe<gita_commentaries_bool_exp>;
  gita_commentaries_aggregate?: InputMaybe<gita_commentaries_aggregate_bool_exp>;
  gita_translations?: InputMaybe<gita_translations_bool_exp>;
  gita_translations_aggregate?: InputMaybe<gita_translations_aggregate_bool_exp>;
  id?: InputMaybe<Int_comparison_exp>;
  language?: InputMaybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "gita_languages" */
export const gita_languages_constraint = {
  /** unique or primary key constraint on columns "id" */
  gita_languages_pkey: "gita_languages_pkey",
} as const;

export type gita_languages_constraint =
  (typeof gita_languages_constraint)[keyof typeof gita_languages_constraint];
/** input type for incrementing numeric columns in table "gita_languages" */
export interface gita_languages_inc_input {
  id?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting data into table "gita_languages" */
export interface gita_languages_insert_input {
  gita_commentaries?: InputMaybe<gita_commentaries_arr_rel_insert_input>;
  gita_translations?: InputMaybe<gita_translations_arr_rel_insert_input>;
  id?: InputMaybe<Scalars["Int"]>;
  language?: InputMaybe<Scalars["String"]>;
}

/** input type for inserting object relation for remote table "gita_languages" */
export interface gita_languages_obj_rel_insert_input {
  data: gita_languages_insert_input;
  /** upsert condition */
  on_conflict?: InputMaybe<gita_languages_on_conflict>;
}

/** on_conflict condition type for table "gita_languages" */
export interface gita_languages_on_conflict {
  constraint: gita_languages_constraint;
  update_columns?: Array<gita_languages_update_column>;
  where?: InputMaybe<gita_languages_bool_exp>;
}

/** Ordering options when selecting data from "gita_languages". */
export interface gita_languages_order_by {
  gita_commentaries_aggregate?: InputMaybe<gita_commentaries_aggregate_order_by>;
  gita_translations_aggregate?: InputMaybe<gita_translations_aggregate_order_by>;
  id?: InputMaybe<order_by>;
  language?: InputMaybe<order_by>;
}

/** primary key columns input for table: gita_languages */
export interface gita_languages_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "gita_languages" */
export const gita_languages_select_column = {
  /** column name */
  id: "id",
  /** column name */
  language: "language",
} as const;

export type gita_languages_select_column =
  (typeof gita_languages_select_column)[keyof typeof gita_languages_select_column];
/** input type for updating data in table "gita_languages" */
export interface gita_languages_set_input {
  id?: InputMaybe<Scalars["Int"]>;
  language?: InputMaybe<Scalars["String"]>;
}

/** Streaming cursor of the table "gita_languages" */
export interface gita_languages_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gita_languages_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface gita_languages_stream_cursor_value_input {
  id?: InputMaybe<Scalars["Int"]>;
  language?: InputMaybe<Scalars["String"]>;
}

/** update columns of table "gita_languages" */
export const gita_languages_update_column = {
  /** column name */
  id: "id",
  /** column name */
  language: "language",
} as const;

export type gita_languages_update_column =
  (typeof gita_languages_update_column)[keyof typeof gita_languages_update_column];
export interface gita_languages_updates {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<gita_languages_inc_input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<gita_languages_set_input>;
  /** filter the rows which have to be updated */
  where: gita_languages_bool_exp;
}

export interface gita_translations_aggregate_bool_exp {
  count?: InputMaybe<gita_translations_aggregate_bool_exp_count>;
}

export interface gita_translations_aggregate_bool_exp_count {
  arguments?: InputMaybe<Array<gita_translations_select_column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<gita_translations_bool_exp>;
  predicate: Int_comparison_exp;
}

/** order by aggregate values of table "gita_translations" */
export interface gita_translations_aggregate_order_by {
  avg?: InputMaybe<gita_translations_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<gita_translations_max_order_by>;
  min?: InputMaybe<gita_translations_min_order_by>;
  stddev?: InputMaybe<gita_translations_stddev_order_by>;
  stddev_pop?: InputMaybe<gita_translations_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<gita_translations_stddev_samp_order_by>;
  sum?: InputMaybe<gita_translations_sum_order_by>;
  var_pop?: InputMaybe<gita_translations_var_pop_order_by>;
  var_samp?: InputMaybe<gita_translations_var_samp_order_by>;
  variance?: InputMaybe<gita_translations_variance_order_by>;
}

/** input type for inserting array relation for remote table "gita_translations" */
export interface gita_translations_arr_rel_insert_input {
  data: Array<gita_translations_insert_input>;
  /** upsert condition */
  on_conflict?: InputMaybe<gita_translations_on_conflict>;
}

/** order by avg() on columns of table "gita_translations" */
export interface gita_translations_avg_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** Boolean expression to filter rows from the table "gita_translations". All fields are combined with a logical 'AND'. */
export interface gita_translations_bool_exp {
  _and?: InputMaybe<Array<gita_translations_bool_exp>>;
  _not?: InputMaybe<gita_translations_bool_exp>;
  _or?: InputMaybe<Array<gita_translations_bool_exp>>;
  author_id?: InputMaybe<Int_comparison_exp>;
  author_name?: InputMaybe<String_comparison_exp>;
  description?: InputMaybe<String_comparison_exp>;
  gita_author?: InputMaybe<gita_authors_bool_exp>;
  gita_language?: InputMaybe<gita_languages_bool_exp>;
  gita_verse?: InputMaybe<gita_verses_bool_exp>;
  id?: InputMaybe<Int_comparison_exp>;
  language?: InputMaybe<String_comparison_exp>;
  language_id?: InputMaybe<Int_comparison_exp>;
  verse_id?: InputMaybe<Int_comparison_exp>;
}

/** unique or primary key constraints on table "gita_translations" */
export const gita_translations_constraint = {
  /** unique or primary key constraint on columns "id" */
  gita_translations_pkey: "gita_translations_pkey",
} as const;

export type gita_translations_constraint =
  (typeof gita_translations_constraint)[keyof typeof gita_translations_constraint];
/** input type for incrementing numeric columns in table "gita_translations" */
export interface gita_translations_inc_input {
  author_id?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["Int"]>;
  language_id?: InputMaybe<Scalars["Int"]>;
  verse_id?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting data into table "gita_translations" */
export interface gita_translations_insert_input {
  author_id?: InputMaybe<Scalars["Int"]>;
  author_name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  gita_author?: InputMaybe<gita_authors_obj_rel_insert_input>;
  gita_language?: InputMaybe<gita_languages_obj_rel_insert_input>;
  gita_verse?: InputMaybe<gita_verses_obj_rel_insert_input>;
  id?: InputMaybe<Scalars["Int"]>;
  language?: InputMaybe<Scalars["String"]>;
  language_id?: InputMaybe<Scalars["Int"]>;
  verse_id?: InputMaybe<Scalars["Int"]>;
}

/** order by max() on columns of table "gita_translations" */
export interface gita_translations_max_order_by {
  author_id?: InputMaybe<order_by>;
  author_name?: InputMaybe<order_by>;
  description?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by min() on columns of table "gita_translations" */
export interface gita_translations_min_order_by {
  author_id?: InputMaybe<order_by>;
  author_name?: InputMaybe<order_by>;
  description?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** on_conflict condition type for table "gita_translations" */
export interface gita_translations_on_conflict {
  constraint: gita_translations_constraint;
  update_columns?: Array<gita_translations_update_column>;
  where?: InputMaybe<gita_translations_bool_exp>;
}

/** Ordering options when selecting data from "gita_translations". */
export interface gita_translations_order_by {
  author_id?: InputMaybe<order_by>;
  author_name?: InputMaybe<order_by>;
  description?: InputMaybe<order_by>;
  gita_author?: InputMaybe<gita_authors_order_by>;
  gita_language?: InputMaybe<gita_languages_order_by>;
  gita_verse?: InputMaybe<gita_verses_order_by>;
  id?: InputMaybe<order_by>;
  language?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** primary key columns input for table: gita_translations */
export interface gita_translations_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "gita_translations" */
export const gita_translations_select_column = {
  /** column name */
  author_id: "author_id",
  /** column name */
  author_name: "author_name",
  /** column name */
  description: "description",
  /** column name */
  id: "id",
  /** column name */
  language: "language",
  /** column name */
  language_id: "language_id",
  /** column name */
  verse_id: "verse_id",
} as const;

export type gita_translations_select_column =
  (typeof gita_translations_select_column)[keyof typeof gita_translations_select_column];
/** input type for updating data in table "gita_translations" */
export interface gita_translations_set_input {
  author_id?: InputMaybe<Scalars["Int"]>;
  author_name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  language?: InputMaybe<Scalars["String"]>;
  language_id?: InputMaybe<Scalars["Int"]>;
  verse_id?: InputMaybe<Scalars["Int"]>;
}

/** order by stddev() on columns of table "gita_translations" */
export interface gita_translations_stddev_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by stddev_pop() on columns of table "gita_translations" */
export interface gita_translations_stddev_pop_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by stddev_samp() on columns of table "gita_translations" */
export interface gita_translations_stddev_samp_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** Streaming cursor of the table "gita_translations" */
export interface gita_translations_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gita_translations_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface gita_translations_stream_cursor_value_input {
  author_id?: InputMaybe<Scalars["Int"]>;
  author_name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  language?: InputMaybe<Scalars["String"]>;
  language_id?: InputMaybe<Scalars["Int"]>;
  verse_id?: InputMaybe<Scalars["Int"]>;
}

/** order by sum() on columns of table "gita_translations" */
export interface gita_translations_sum_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** update columns of table "gita_translations" */
export const gita_translations_update_column = {
  /** column name */
  author_id: "author_id",
  /** column name */
  author_name: "author_name",
  /** column name */
  description: "description",
  /** column name */
  id: "id",
  /** column name */
  language: "language",
  /** column name */
  language_id: "language_id",
  /** column name */
  verse_id: "verse_id",
} as const;

export type gita_translations_update_column =
  (typeof gita_translations_update_column)[keyof typeof gita_translations_update_column];
export interface gita_translations_updates {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<gita_translations_inc_input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<gita_translations_set_input>;
  /** filter the rows which have to be updated */
  where: gita_translations_bool_exp;
}

/** order by var_pop() on columns of table "gita_translations" */
export interface gita_translations_var_pop_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by var_samp() on columns of table "gita_translations" */
export interface gita_translations_var_samp_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** order by variance() on columns of table "gita_translations" */
export interface gita_translations_variance_order_by {
  author_id?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  language_id?: InputMaybe<order_by>;
  verse_id?: InputMaybe<order_by>;
}

/** Boolean expression to filter rows from the table "gita_users". All fields are combined with a logical 'AND'. */
export interface gita_users_bool_exp {
  _and?: InputMaybe<Array<gita_users_bool_exp>>;
  _not?: InputMaybe<gita_users_bool_exp>;
  _or?: InputMaybe<Array<gita_users_bool_exp>>;
  api_key?: InputMaybe<String_comparison_exp>;
  app_description?: InputMaybe<String_comparison_exp>;
  app_link?: InputMaybe<String_comparison_exp>;
  app_name?: InputMaybe<String_comparison_exp>;
  created_on?: InputMaybe<timestamptz_comparison_exp>;
  email?: InputMaybe<String_comparison_exp>;
  full_name?: InputMaybe<String_comparison_exp>;
  id?: InputMaybe<Int_comparison_exp>;
  is_active?: InputMaybe<Boolean_comparison_exp>;
}

/** unique or primary key constraints on table "gita_users" */
export const gita_users_constraint = {
  /** unique or primary key constraint on columns "id" */
  gita_users_pkey: "gita_users_pkey",
  /** unique or primary key constraint on columns "api_key" */
  ix_gita_users_api_key: "ix_gita_users_api_key",
  /** unique or primary key constraint on columns "email" */
  ix_gita_users_email: "ix_gita_users_email",
} as const;

export type gita_users_constraint =
  (typeof gita_users_constraint)[keyof typeof gita_users_constraint];
/** input type for incrementing numeric columns in table "gita_users" */
export interface gita_users_inc_input {
  id?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting data into table "gita_users" */
export interface gita_users_insert_input {
  api_key?: InputMaybe<Scalars["String"]>;
  app_description?: InputMaybe<Scalars["String"]>;
  app_link?: InputMaybe<Scalars["String"]>;
  app_name?: InputMaybe<Scalars["String"]>;
  created_on?: InputMaybe<Scalars["timestamptz"]>;
  email?: InputMaybe<Scalars["String"]>;
  full_name?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  is_active?: InputMaybe<Scalars["Boolean"]>;
}

/** on_conflict condition type for table "gita_users" */
export interface gita_users_on_conflict {
  constraint: gita_users_constraint;
  update_columns?: Array<gita_users_update_column>;
  where?: InputMaybe<gita_users_bool_exp>;
}

/** Ordering options when selecting data from "gita_users". */
export interface gita_users_order_by {
  api_key?: InputMaybe<order_by>;
  app_description?: InputMaybe<order_by>;
  app_link?: InputMaybe<order_by>;
  app_name?: InputMaybe<order_by>;
  created_on?: InputMaybe<order_by>;
  email?: InputMaybe<order_by>;
  full_name?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  is_active?: InputMaybe<order_by>;
}

/** primary key columns input for table: gita_users */
export interface gita_users_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "gita_users" */
export const gita_users_select_column = {
  /** column name */
  api_key: "api_key",
  /** column name */
  app_description: "app_description",
  /** column name */
  app_link: "app_link",
  /** column name */
  app_name: "app_name",
  /** column name */
  created_on: "created_on",
  /** column name */
  email: "email",
  /** column name */
  full_name: "full_name",
  /** column name */
  id: "id",
  /** column name */
  is_active: "is_active",
} as const;

export type gita_users_select_column =
  (typeof gita_users_select_column)[keyof typeof gita_users_select_column];
/** input type for updating data in table "gita_users" */
export interface gita_users_set_input {
  api_key?: InputMaybe<Scalars["String"]>;
  app_description?: InputMaybe<Scalars["String"]>;
  app_link?: InputMaybe<Scalars["String"]>;
  app_name?: InputMaybe<Scalars["String"]>;
  created_on?: InputMaybe<Scalars["timestamptz"]>;
  email?: InputMaybe<Scalars["String"]>;
  full_name?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  is_active?: InputMaybe<Scalars["Boolean"]>;
}

/** Streaming cursor of the table "gita_users" */
export interface gita_users_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gita_users_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface gita_users_stream_cursor_value_input {
  api_key?: InputMaybe<Scalars["String"]>;
  app_description?: InputMaybe<Scalars["String"]>;
  app_link?: InputMaybe<Scalars["String"]>;
  app_name?: InputMaybe<Scalars["String"]>;
  created_on?: InputMaybe<Scalars["timestamptz"]>;
  email?: InputMaybe<Scalars["String"]>;
  full_name?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  is_active?: InputMaybe<Scalars["Boolean"]>;
}

/** update columns of table "gita_users" */
export const gita_users_update_column = {
  /** column name */
  api_key: "api_key",
  /** column name */
  app_description: "app_description",
  /** column name */
  app_link: "app_link",
  /** column name */
  app_name: "app_name",
  /** column name */
  created_on: "created_on",
  /** column name */
  email: "email",
  /** column name */
  full_name: "full_name",
  /** column name */
  id: "id",
  /** column name */
  is_active: "is_active",
} as const;

export type gita_users_update_column =
  (typeof gita_users_update_column)[keyof typeof gita_users_update_column];
export interface gita_users_updates {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<gita_users_inc_input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<gita_users_set_input>;
  /** filter the rows which have to be updated */
  where: gita_users_bool_exp;
}

export interface gita_verses_aggregate_bool_exp {
  count?: InputMaybe<gita_verses_aggregate_bool_exp_count>;
}

export interface gita_verses_aggregate_bool_exp_count {
  arguments?: InputMaybe<Array<gita_verses_select_column>>;
  distinct?: InputMaybe<Scalars["Boolean"]>;
  filter?: InputMaybe<gita_verses_bool_exp>;
  predicate: Int_comparison_exp;
}

/** order by aggregate values of table "gita_verses" */
export interface gita_verses_aggregate_order_by {
  avg?: InputMaybe<gita_verses_avg_order_by>;
  count?: InputMaybe<order_by>;
  max?: InputMaybe<gita_verses_max_order_by>;
  min?: InputMaybe<gita_verses_min_order_by>;
  stddev?: InputMaybe<gita_verses_stddev_order_by>;
  stddev_pop?: InputMaybe<gita_verses_stddev_pop_order_by>;
  stddev_samp?: InputMaybe<gita_verses_stddev_samp_order_by>;
  sum?: InputMaybe<gita_verses_sum_order_by>;
  var_pop?: InputMaybe<gita_verses_var_pop_order_by>;
  var_samp?: InputMaybe<gita_verses_var_samp_order_by>;
  variance?: InputMaybe<gita_verses_variance_order_by>;
}

/** input type for inserting array relation for remote table "gita_verses" */
export interface gita_verses_arr_rel_insert_input {
  data: Array<gita_verses_insert_input>;
  /** upsert condition */
  on_conflict?: InputMaybe<gita_verses_on_conflict>;
}

/** order by avg() on columns of table "gita_verses" */
export interface gita_verses_avg_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
}

/** Boolean expression to filter rows from the table "gita_verses". All fields are combined with a logical 'AND'. */
export interface gita_verses_bool_exp {
  _and?: InputMaybe<Array<gita_verses_bool_exp>>;
  _not?: InputMaybe<gita_verses_bool_exp>;
  _or?: InputMaybe<Array<gita_verses_bool_exp>>;
  chapter_id?: InputMaybe<Int_comparison_exp>;
  chapter_number?: InputMaybe<Int_comparison_exp>;
  gita_chapter?: InputMaybe<gita_chapters_bool_exp>;
  gita_commentaries?: InputMaybe<gita_commentaries_bool_exp>;
  gita_commentaries_aggregate?: InputMaybe<gita_commentaries_aggregate_bool_exp>;
  gita_translations?: InputMaybe<gita_translations_bool_exp>;
  gita_translations_aggregate?: InputMaybe<gita_translations_aggregate_bool_exp>;
  id?: InputMaybe<Int_comparison_exp>;
  slug?: InputMaybe<String_comparison_exp>;
  text?: InputMaybe<String_comparison_exp>;
  transliteration?: InputMaybe<String_comparison_exp>;
  verse_number?: InputMaybe<Int_comparison_exp>;
  word_meanings?: InputMaybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "gita_verses" */
export const gita_verses_constraint = {
  /** unique or primary key constraint on columns "id" */
  gita_verses_pkey: "gita_verses_pkey",
} as const;

export type gita_verses_constraint =
  (typeof gita_verses_constraint)[keyof typeof gita_verses_constraint];
/** input type for incrementing numeric columns in table "gita_verses" */
export interface gita_verses_inc_input {
  chapter_id?: InputMaybe<Scalars["Int"]>;
  chapter_number?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["Int"]>;
  verse_number?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting data into table "gita_verses" */
export interface gita_verses_insert_input {
  chapter_id?: InputMaybe<Scalars["Int"]>;
  chapter_number?: InputMaybe<Scalars["Int"]>;
  gita_chapter?: InputMaybe<gita_chapters_obj_rel_insert_input>;
  gita_commentaries?: InputMaybe<gita_commentaries_arr_rel_insert_input>;
  gita_translations?: InputMaybe<gita_translations_arr_rel_insert_input>;
  id?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
  text?: InputMaybe<Scalars["String"]>;
  transliteration?: InputMaybe<Scalars["String"]>;
  verse_number?: InputMaybe<Scalars["Int"]>;
  word_meanings?: InputMaybe<Scalars["String"]>;
}

/** order by max() on columns of table "gita_verses" */
export interface gita_verses_max_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  slug?: InputMaybe<order_by>;
  text?: InputMaybe<order_by>;
  transliteration?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
  word_meanings?: InputMaybe<order_by>;
}

/** order by min() on columns of table "gita_verses" */
export interface gita_verses_min_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  slug?: InputMaybe<order_by>;
  text?: InputMaybe<order_by>;
  transliteration?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
  word_meanings?: InputMaybe<order_by>;
}

/** input type for inserting object relation for remote table "gita_verses" */
export interface gita_verses_obj_rel_insert_input {
  data: gita_verses_insert_input;
  /** upsert condition */
  on_conflict?: InputMaybe<gita_verses_on_conflict>;
}

/** on_conflict condition type for table "gita_verses" */
export interface gita_verses_on_conflict {
  constraint: gita_verses_constraint;
  update_columns?: Array<gita_verses_update_column>;
  where?: InputMaybe<gita_verses_bool_exp>;
}

/** Ordering options when selecting data from "gita_verses". */
export interface gita_verses_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  gita_chapter?: InputMaybe<gita_chapters_order_by>;
  gita_commentaries_aggregate?: InputMaybe<gita_commentaries_aggregate_order_by>;
  gita_translations_aggregate?: InputMaybe<gita_translations_aggregate_order_by>;
  id?: InputMaybe<order_by>;
  slug?: InputMaybe<order_by>;
  text?: InputMaybe<order_by>;
  transliteration?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
  word_meanings?: InputMaybe<order_by>;
}

/** primary key columns input for table: gita_verses */
export interface gita_verses_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "gita_verses" */
export const gita_verses_select_column = {
  /** column name */
  chapter_id: "chapter_id",
  /** column name */
  chapter_number: "chapter_number",
  /** column name */
  id: "id",
  /** column name */
  slug: "slug",
  /** column name */
  text: "text",
  /** column name */
  transliteration: "transliteration",
  /** column name */
  verse_number: "verse_number",
  /** column name */
  word_meanings: "word_meanings",
} as const;

export type gita_verses_select_column =
  (typeof gita_verses_select_column)[keyof typeof gita_verses_select_column];
/** input type for updating data in table "gita_verses" */
export interface gita_verses_set_input {
  chapter_id?: InputMaybe<Scalars["Int"]>;
  chapter_number?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
  text?: InputMaybe<Scalars["String"]>;
  transliteration?: InputMaybe<Scalars["String"]>;
  verse_number?: InputMaybe<Scalars["Int"]>;
  word_meanings?: InputMaybe<Scalars["String"]>;
}

/** order by stddev() on columns of table "gita_verses" */
export interface gita_verses_stddev_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
}

/** order by stddev_pop() on columns of table "gita_verses" */
export interface gita_verses_stddev_pop_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
}

/** order by stddev_samp() on columns of table "gita_verses" */
export interface gita_verses_stddev_samp_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
}

/** Streaming cursor of the table "gita_verses" */
export interface gita_verses_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gita_verses_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface gita_verses_stream_cursor_value_input {
  chapter_id?: InputMaybe<Scalars["Int"]>;
  chapter_number?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
  text?: InputMaybe<Scalars["String"]>;
  transliteration?: InputMaybe<Scalars["String"]>;
  verse_number?: InputMaybe<Scalars["Int"]>;
  word_meanings?: InputMaybe<Scalars["String"]>;
}

/** order by sum() on columns of table "gita_verses" */
export interface gita_verses_sum_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
}

/** update columns of table "gita_verses" */
export const gita_verses_update_column = {
  /** column name */
  chapter_id: "chapter_id",
  /** column name */
  chapter_number: "chapter_number",
  /** column name */
  id: "id",
  /** column name */
  slug: "slug",
  /** column name */
  text: "text",
  /** column name */
  transliteration: "transliteration",
  /** column name */
  verse_number: "verse_number",
  /** column name */
  word_meanings: "word_meanings",
} as const;

export type gita_verses_update_column =
  (typeof gita_verses_update_column)[keyof typeof gita_verses_update_column];
export interface gita_verses_updates {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<gita_verses_inc_input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<gita_verses_set_input>;
  /** filter the rows which have to be updated */
  where: gita_verses_bool_exp;
}

/** order by var_pop() on columns of table "gita_verses" */
export interface gita_verses_var_pop_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
}

/** order by var_samp() on columns of table "gita_verses" */
export interface gita_verses_var_samp_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
}

/** order by variance() on columns of table "gita_verses" */
export interface gita_verses_variance_order_by {
  chapter_id?: InputMaybe<order_by>;
  chapter_number?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  verse_number?: InputMaybe<order_by>;
}

/** Boolean expression to filter rows from the table "newsletter_subscriptions". All fields are combined with a logical 'AND'. */
export interface newsletter_subscriptions_bool_exp {
  _and?: InputMaybe<Array<newsletter_subscriptions_bool_exp>>;
  _not?: InputMaybe<newsletter_subscriptions_bool_exp>;
  _or?: InputMaybe<Array<newsletter_subscriptions_bool_exp>>;
  id?: InputMaybe<Int_comparison_exp>;
  user_email?: InputMaybe<String_comparison_exp>;
  user_name?: InputMaybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "newsletter_subscriptions" */
export const newsletter_subscriptions_constraint = {
  /** unique or primary key constraint on columns "id" */
  newsletter_subscriptions_pkey: "newsletter_subscriptions_pkey",
  /** unique or primary key constraint on columns "user_email" */
  newsletter_subscriptions_user_email_key:
    "newsletter_subscriptions_user_email_key",
} as const;

export type newsletter_subscriptions_constraint =
  (typeof newsletter_subscriptions_constraint)[keyof typeof newsletter_subscriptions_constraint];
/** input type for incrementing numeric columns in table "newsletter_subscriptions" */
export interface newsletter_subscriptions_inc_input {
  id?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting data into table "newsletter_subscriptions" */
export interface newsletter_subscriptions_insert_input {
  id?: InputMaybe<Scalars["Int"]>;
  user_email?: InputMaybe<Scalars["String"]>;
  user_name?: InputMaybe<Scalars["String"]>;
}

/** on_conflict condition type for table "newsletter_subscriptions" */
export interface newsletter_subscriptions_on_conflict {
  constraint: newsletter_subscriptions_constraint;
  update_columns?: Array<newsletter_subscriptions_update_column>;
  where?: InputMaybe<newsletter_subscriptions_bool_exp>;
}

/** Ordering options when selecting data from "newsletter_subscriptions". */
export interface newsletter_subscriptions_order_by {
  id?: InputMaybe<order_by>;
  user_email?: InputMaybe<order_by>;
  user_name?: InputMaybe<order_by>;
}

/** primary key columns input for table: newsletter_subscriptions */
export interface newsletter_subscriptions_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "newsletter_subscriptions" */
export const newsletter_subscriptions_select_column = {
  /** column name */
  id: "id",
  /** column name */
  user_email: "user_email",
  /** column name */
  user_name: "user_name",
} as const;

export type newsletter_subscriptions_select_column =
  (typeof newsletter_subscriptions_select_column)[keyof typeof newsletter_subscriptions_select_column];
/** input type for updating data in table "newsletter_subscriptions" */
export interface newsletter_subscriptions_set_input {
  id?: InputMaybe<Scalars["Int"]>;
  user_email?: InputMaybe<Scalars["String"]>;
  user_name?: InputMaybe<Scalars["String"]>;
}

/** Streaming cursor of the table "newsletter_subscriptions" */
export interface newsletter_subscriptions_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: newsletter_subscriptions_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface newsletter_subscriptions_stream_cursor_value_input {
  id?: InputMaybe<Scalars["Int"]>;
  user_email?: InputMaybe<Scalars["String"]>;
  user_name?: InputMaybe<Scalars["String"]>;
}

/** update columns of table "newsletter_subscriptions" */
export const newsletter_subscriptions_update_column = {
  /** column name */
  id: "id",
  /** column name */
  user_email: "user_email",
  /** column name */
  user_name: "user_name",
} as const;

export type newsletter_subscriptions_update_column =
  (typeof newsletter_subscriptions_update_column)[keyof typeof newsletter_subscriptions_update_column];
export interface newsletter_subscriptions_updates {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<newsletter_subscriptions_inc_input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<newsletter_subscriptions_set_input>;
  /** filter the rows which have to be updated */
  where: newsletter_subscriptions_bool_exp;
}

/** column ordering options */
export const order_by = {
  /** in ascending order, nulls last */
  asc: "asc",
  /** in ascending order, nulls first */
  asc_nulls_first: "asc_nulls_first",
  /** in ascending order, nulls last */
  asc_nulls_last: "asc_nulls_last",
  /** in descending order, nulls first */
  desc: "desc",
  /** in descending order, nulls first */
  desc_nulls_first: "desc_nulls_first",
  /** in descending order, nulls last */
  desc_nulls_last: "desc_nulls_last",
} as const;

export type order_by = (typeof order_by)[keyof typeof order_by];
/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export interface timestamptz_comparison_exp {
  _eq?: InputMaybe<Scalars["timestamptz"]>;
  _gt?: InputMaybe<Scalars["timestamptz"]>;
  _gte?: InputMaybe<Scalars["timestamptz"]>;
  _in?: InputMaybe<Array<Scalars["timestamptz"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["timestamptz"]>;
  _lte?: InputMaybe<Scalars["timestamptz"]>;
  _neq?: InputMaybe<Scalars["timestamptz"]>;
  _nin?: InputMaybe<Array<Scalars["timestamptz"]>>;
}

/** Boolean expression to filter rows from the table "verse_of_the_day". All fields are combined with a logical 'AND'. */
export interface verse_of_the_day_bool_exp {
  _and?: InputMaybe<Array<verse_of_the_day_bool_exp>>;
  _not?: InputMaybe<verse_of_the_day_bool_exp>;
  _or?: InputMaybe<Array<verse_of_the_day_bool_exp>>;
  date?: InputMaybe<date_comparison_exp>;
  id?: InputMaybe<Int_comparison_exp>;
  verse_order?: InputMaybe<Int_comparison_exp>;
}

/** unique or primary key constraints on table "verse_of_the_day" */
export const verse_of_the_day_constraint = {
  /** unique or primary key constraint on columns "id" */
  verse_of_the_day_pkey: "verse_of_the_day_pkey",
} as const;

export type verse_of_the_day_constraint =
  (typeof verse_of_the_day_constraint)[keyof typeof verse_of_the_day_constraint];
/** input type for incrementing numeric columns in table "verse_of_the_day" */
export interface verse_of_the_day_inc_input {
  id?: InputMaybe<Scalars["Int"]>;
  verse_order?: InputMaybe<Scalars["Int"]>;
}

/** input type for inserting data into table "verse_of_the_day" */
export interface verse_of_the_day_insert_input {
  date?: InputMaybe<Scalars["date"]>;
  id?: InputMaybe<Scalars["Int"]>;
  verse_order?: InputMaybe<Scalars["Int"]>;
}

/** on_conflict condition type for table "verse_of_the_day" */
export interface verse_of_the_day_on_conflict {
  constraint: verse_of_the_day_constraint;
  update_columns?: Array<verse_of_the_day_update_column>;
  where?: InputMaybe<verse_of_the_day_bool_exp>;
}

/** Ordering options when selecting data from "verse_of_the_day". */
export interface verse_of_the_day_order_by {
  date?: InputMaybe<order_by>;
  id?: InputMaybe<order_by>;
  verse_order?: InputMaybe<order_by>;
}

/** primary key columns input for table: verse_of_the_day */
export interface verse_of_the_day_pk_columns_input {
  id: Scalars["Int"];
}

/** select columns of table "verse_of_the_day" */
export const verse_of_the_day_select_column = {
  /** column name */
  date: "date",
  /** column name */
  id: "id",
  /** column name */
  verse_order: "verse_order",
} as const;

export type verse_of_the_day_select_column =
  (typeof verse_of_the_day_select_column)[keyof typeof verse_of_the_day_select_column];
/** input type for updating data in table "verse_of_the_day" */
export interface verse_of_the_day_set_input {
  date?: InputMaybe<Scalars["date"]>;
  id?: InputMaybe<Scalars["Int"]>;
  verse_order?: InputMaybe<Scalars["Int"]>;
}

/** Streaming cursor of the table "verse_of_the_day" */
export interface verse_of_the_day_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: verse_of_the_day_stream_cursor_value_input;
  /** cursor ordering */
  ordering?: InputMaybe<cursor_ordering>;
}

/** Initial value of the column from where the streaming should start */
export interface verse_of_the_day_stream_cursor_value_input {
  date?: InputMaybe<Scalars["date"]>;
  id?: InputMaybe<Scalars["Int"]>;
  verse_order?: InputMaybe<Scalars["Int"]>;
}

/** update columns of table "verse_of_the_day" */
export const verse_of_the_day_update_column = {
  /** column name */
  date: "date",
  /** column name */
  id: "id",
  /** column name */
  verse_order: "verse_order",
} as const;

export type verse_of_the_day_update_column =
  (typeof verse_of_the_day_update_column)[keyof typeof verse_of_the_day_update_column];
export interface verse_of_the_day_updates {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<verse_of_the_day_inc_input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<verse_of_the_day_set_input>;
  /** filter the rows which have to be updated */
  where: verse_of_the_day_bool_exp;
}

export const scalarsEnumsHash: import("gqty").ScalarsEnumsHash = {
  Boolean: true,
  Float: true,
  Int: true,
  String: true,
  cursor_ordering: true,
  date: true,
  gita_authors_constraint: true,
  gita_authors_select_column: true,
  gita_authors_update_column: true,
  gita_chapters_constraint: true,
  gita_chapters_select_column: true,
  gita_chapters_update_column: true,
  gita_commentaries_constraint: true,
  gita_commentaries_select_column: true,
  gita_commentaries_update_column: true,
  gita_languages_constraint: true,
  gita_languages_select_column: true,
  gita_languages_update_column: true,
  gita_translations_constraint: true,
  gita_translations_select_column: true,
  gita_translations_update_column: true,
  gita_users_constraint: true,
  gita_users_select_column: true,
  gita_users_update_column: true,
  gita_verses_constraint: true,
  gita_verses_select_column: true,
  gita_verses_update_column: true,
  newsletter_subscriptions_constraint: true,
  newsletter_subscriptions_select_column: true,
  newsletter_subscriptions_update_column: true,
  order_by: true,
  timestamptz: true,
  verse_of_the_day_constraint: true,
  verse_of_the_day_select_column: true,
  verse_of_the_day_update_column: true,
};
export const generatedSchema = {
  Boolean_comparison_exp: {
    _eq: { __type: "Boolean" },
    _gt: { __type: "Boolean" },
    _gte: { __type: "Boolean" },
    _in: { __type: "[Boolean!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "Boolean" },
    _lte: { __type: "Boolean" },
    _neq: { __type: "Boolean" },
    _nin: { __type: "[Boolean!]" },
  },
  Int_comparison_exp: {
    _eq: { __type: "Int" },
    _gt: { __type: "Int" },
    _gte: { __type: "Int" },
    _in: { __type: "[Int!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "Int" },
    _lte: { __type: "Int" },
    _neq: { __type: "Int" },
    _nin: { __type: "[Int!]" },
  },
  String_comparison_exp: {
    _eq: { __type: "String" },
    _gt: { __type: "String" },
    _gte: { __type: "String" },
    _ilike: { __type: "String" },
    _in: { __type: "[String!]" },
    _iregex: { __type: "String" },
    _is_null: { __type: "Boolean" },
    _like: { __type: "String" },
    _lt: { __type: "String" },
    _lte: { __type: "String" },
    _neq: { __type: "String" },
    _nilike: { __type: "String" },
    _nin: { __type: "[String!]" },
    _niregex: { __type: "String" },
    _nlike: { __type: "String" },
    _nregex: { __type: "String" },
    _nsimilar: { __type: "String" },
    _regex: { __type: "String" },
    _similar: { __type: "String" },
  },
  date_comparison_exp: {
    _eq: { __type: "date" },
    _gt: { __type: "date" },
    _gte: { __type: "date" },
    _in: { __type: "[date!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "date" },
    _lte: { __type: "date" },
    _neq: { __type: "date" },
    _nin: { __type: "[date!]" },
  },
  gita_authors: {
    __typename: { __type: "String!" },
    gita_commentaries: {
      __type: "[gita_commentaries!]!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_translations: {
      __type: "[gita_translations!]!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    id: { __type: "Int!" },
    name: { __type: "String" },
  },
  gita_authors_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "gita_authors_aggregate_fields" },
    nodes: { __type: "[gita_authors!]!" },
  },
  gita_authors_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "gita_authors_avg_fields" },
    count: {
      __type: "Int!",
      __args: { columns: "[gita_authors_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "gita_authors_max_fields" },
    min: { __type: "gita_authors_min_fields" },
    stddev: { __type: "gita_authors_stddev_fields" },
    stddev_pop: { __type: "gita_authors_stddev_pop_fields" },
    stddev_samp: { __type: "gita_authors_stddev_samp_fields" },
    sum: { __type: "gita_authors_sum_fields" },
    var_pop: { __type: "gita_authors_var_pop_fields" },
    var_samp: { __type: "gita_authors_var_samp_fields" },
    variance: { __type: "gita_authors_variance_fields" },
  },
  gita_authors_avg_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_authors_bool_exp: {
    _and: { __type: "[gita_authors_bool_exp!]" },
    _not: { __type: "gita_authors_bool_exp" },
    _or: { __type: "[gita_authors_bool_exp!]" },
    gita_commentaries: { __type: "gita_commentaries_bool_exp" },
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate_bool_exp",
    },
    gita_translations: { __type: "gita_translations_bool_exp" },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate_bool_exp",
    },
    id: { __type: "Int_comparison_exp" },
    name: { __type: "String_comparison_exp" },
  },
  gita_authors_inc_input: { id: { __type: "Int" } },
  gita_authors_insert_input: {
    gita_commentaries: { __type: "gita_commentaries_arr_rel_insert_input" },
    gita_translations: { __type: "gita_translations_arr_rel_insert_input" },
    id: { __type: "Int" },
    name: { __type: "String" },
  },
  gita_authors_max_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
    name: { __type: "String" },
  },
  gita_authors_min_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
    name: { __type: "String" },
  },
  gita_authors_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[gita_authors!]!" },
  },
  gita_authors_obj_rel_insert_input: {
    data: { __type: "gita_authors_insert_input!" },
    on_conflict: { __type: "gita_authors_on_conflict" },
  },
  gita_authors_on_conflict: {
    constraint: { __type: "gita_authors_constraint!" },
    update_columns: { __type: "[gita_authors_update_column!]!" },
    where: { __type: "gita_authors_bool_exp" },
  },
  gita_authors_order_by: {
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate_order_by",
    },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate_order_by",
    },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
  },
  gita_authors_pk_columns_input: { id: { __type: "Int!" } },
  gita_authors_set_input: { id: { __type: "Int" }, name: { __type: "String" } },
  gita_authors_stddev_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_authors_stddev_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_authors_stddev_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_authors_stream_cursor_input: {
    initial_value: { __type: "gita_authors_stream_cursor_value_input!" },
    ordering: { __type: "cursor_ordering" },
  },
  gita_authors_stream_cursor_value_input: {
    id: { __type: "Int" },
    name: { __type: "String" },
  },
  gita_authors_sum_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
  },
  gita_authors_updates: {
    _inc: { __type: "gita_authors_inc_input" },
    _set: { __type: "gita_authors_set_input" },
    where: { __type: "gita_authors_bool_exp!" },
  },
  gita_authors_var_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_authors_var_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_authors_variance_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_chapters: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Int" },
    chapter_summary: { __type: "String" },
    chapter_summary_hindi: { __type: "String" },
    gita_verses: {
      __type: "[gita_verses!]!",
      __args: {
        distinct_on: "[gita_verses_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_verses_order_by!]",
        where: "gita_verses_bool_exp",
      },
    },
    gita_verses_aggregate: {
      __type: "gita_verses_aggregate!",
      __args: {
        distinct_on: "[gita_verses_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_verses_order_by!]",
        where: "gita_verses_bool_exp",
      },
    },
    id: { __type: "Int!" },
    name: { __type: "String" },
    name_meaning: { __type: "String" },
    name_translated: { __type: "String" },
    name_transliterated: { __type: "String" },
    slug: { __type: "String" },
    verses_count: { __type: "Int" },
  },
  gita_chapters_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "gita_chapters_aggregate_fields" },
    nodes: { __type: "[gita_chapters!]!" },
  },
  gita_chapters_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "gita_chapters_avg_fields" },
    count: {
      __type: "Int!",
      __args: {
        columns: "[gita_chapters_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "gita_chapters_max_fields" },
    min: { __type: "gita_chapters_min_fields" },
    stddev: { __type: "gita_chapters_stddev_fields" },
    stddev_pop: { __type: "gita_chapters_stddev_pop_fields" },
    stddev_samp: { __type: "gita_chapters_stddev_samp_fields" },
    sum: { __type: "gita_chapters_sum_fields" },
    var_pop: { __type: "gita_chapters_var_pop_fields" },
    var_samp: { __type: "gita_chapters_var_samp_fields" },
    variance: { __type: "gita_chapters_variance_fields" },
  },
  gita_chapters_avg_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verses_count: { __type: "Float" },
  },
  gita_chapters_bool_exp: {
    _and: { __type: "[gita_chapters_bool_exp!]" },
    _not: { __type: "gita_chapters_bool_exp" },
    _or: { __type: "[gita_chapters_bool_exp!]" },
    chapter_number: { __type: "Int_comparison_exp" },
    chapter_summary: { __type: "String_comparison_exp" },
    chapter_summary_hindi: { __type: "String_comparison_exp" },
    gita_verses: { __type: "gita_verses_bool_exp" },
    gita_verses_aggregate: { __type: "gita_verses_aggregate_bool_exp" },
    id: { __type: "Int_comparison_exp" },
    name: { __type: "String_comparison_exp" },
    name_meaning: { __type: "String_comparison_exp" },
    name_translated: { __type: "String_comparison_exp" },
    name_transliterated: { __type: "String_comparison_exp" },
    slug: { __type: "String_comparison_exp" },
    verses_count: { __type: "Int_comparison_exp" },
  },
  gita_chapters_inc_input: {
    chapter_number: { __type: "Int" },
    id: { __type: "Int" },
    verses_count: { __type: "Int" },
  },
  gita_chapters_insert_input: {
    chapter_number: { __type: "Int" },
    chapter_summary: { __type: "String" },
    chapter_summary_hindi: { __type: "String" },
    gita_verses: { __type: "gita_verses_arr_rel_insert_input" },
    id: { __type: "Int" },
    name: { __type: "String" },
    name_meaning: { __type: "String" },
    name_translated: { __type: "String" },
    name_transliterated: { __type: "String" },
    slug: { __type: "String" },
    verses_count: { __type: "Int" },
  },
  gita_chapters_max_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Int" },
    chapter_summary: { __type: "String" },
    chapter_summary_hindi: { __type: "String" },
    id: { __type: "Int" },
    name: { __type: "String" },
    name_meaning: { __type: "String" },
    name_translated: { __type: "String" },
    name_transliterated: { __type: "String" },
    slug: { __type: "String" },
    verses_count: { __type: "Int" },
  },
  gita_chapters_min_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Int" },
    chapter_summary: { __type: "String" },
    chapter_summary_hindi: { __type: "String" },
    id: { __type: "Int" },
    name: { __type: "String" },
    name_meaning: { __type: "String" },
    name_translated: { __type: "String" },
    name_transliterated: { __type: "String" },
    slug: { __type: "String" },
    verses_count: { __type: "Int" },
  },
  gita_chapters_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[gita_chapters!]!" },
  },
  gita_chapters_obj_rel_insert_input: {
    data: { __type: "gita_chapters_insert_input!" },
    on_conflict: { __type: "gita_chapters_on_conflict" },
  },
  gita_chapters_on_conflict: {
    constraint: { __type: "gita_chapters_constraint!" },
    update_columns: { __type: "[gita_chapters_update_column!]!" },
    where: { __type: "gita_chapters_bool_exp" },
  },
  gita_chapters_order_by: {
    chapter_number: { __type: "order_by" },
    chapter_summary: { __type: "order_by" },
    chapter_summary_hindi: { __type: "order_by" },
    gita_verses_aggregate: { __type: "gita_verses_aggregate_order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
    name_meaning: { __type: "order_by" },
    name_translated: { __type: "order_by" },
    name_transliterated: { __type: "order_by" },
    slug: { __type: "order_by" },
    verses_count: { __type: "order_by" },
  },
  gita_chapters_pk_columns_input: { id: { __type: "Int!" } },
  gita_chapters_set_input: {
    chapter_number: { __type: "Int" },
    chapter_summary: { __type: "String" },
    chapter_summary_hindi: { __type: "String" },
    id: { __type: "Int" },
    name: { __type: "String" },
    name_meaning: { __type: "String" },
    name_translated: { __type: "String" },
    name_transliterated: { __type: "String" },
    slug: { __type: "String" },
    verses_count: { __type: "Int" },
  },
  gita_chapters_stddev_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verses_count: { __type: "Float" },
  },
  gita_chapters_stddev_pop_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verses_count: { __type: "Float" },
  },
  gita_chapters_stddev_samp_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verses_count: { __type: "Float" },
  },
  gita_chapters_stream_cursor_input: {
    initial_value: { __type: "gita_chapters_stream_cursor_value_input!" },
    ordering: { __type: "cursor_ordering" },
  },
  gita_chapters_stream_cursor_value_input: {
    chapter_number: { __type: "Int" },
    chapter_summary: { __type: "String" },
    chapter_summary_hindi: { __type: "String" },
    id: { __type: "Int" },
    name: { __type: "String" },
    name_meaning: { __type: "String" },
    name_translated: { __type: "String" },
    name_transliterated: { __type: "String" },
    slug: { __type: "String" },
    verses_count: { __type: "Int" },
  },
  gita_chapters_sum_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Int" },
    id: { __type: "Int" },
    verses_count: { __type: "Int" },
  },
  gita_chapters_updates: {
    _inc: { __type: "gita_chapters_inc_input" },
    _set: { __type: "gita_chapters_set_input" },
    where: { __type: "gita_chapters_bool_exp!" },
  },
  gita_chapters_var_pop_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verses_count: { __type: "Float" },
  },
  gita_chapters_var_samp_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verses_count: { __type: "Float" },
  },
  gita_chapters_variance_fields: {
    __typename: { __type: "String!" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verses_count: { __type: "Float" },
  },
  gita_commentaries: {
    __typename: { __type: "String!" },
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    gita_author: { __type: "gita_authors" },
    gita_language: { __type: "gita_languages" },
    gita_verse: { __type: "gita_verses" },
    id: { __type: "Int!" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_commentaries_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "gita_commentaries_aggregate_fields" },
    nodes: { __type: "[gita_commentaries!]!" },
  },
  gita_commentaries_aggregate_bool_exp: {
    count: { __type: "gita_commentaries_aggregate_bool_exp_count" },
  },
  gita_commentaries_aggregate_bool_exp_count: {
    arguments: { __type: "[gita_commentaries_select_column!]" },
    distinct: { __type: "Boolean" },
    filter: { __type: "gita_commentaries_bool_exp" },
    predicate: { __type: "Int_comparison_exp!" },
  },
  gita_commentaries_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "gita_commentaries_avg_fields" },
    count: {
      __type: "Int!",
      __args: {
        columns: "[gita_commentaries_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "gita_commentaries_max_fields" },
    min: { __type: "gita_commentaries_min_fields" },
    stddev: { __type: "gita_commentaries_stddev_fields" },
    stddev_pop: { __type: "gita_commentaries_stddev_pop_fields" },
    stddev_samp: { __type: "gita_commentaries_stddev_samp_fields" },
    sum: { __type: "gita_commentaries_sum_fields" },
    var_pop: { __type: "gita_commentaries_var_pop_fields" },
    var_samp: { __type: "gita_commentaries_var_samp_fields" },
    variance: { __type: "gita_commentaries_variance_fields" },
  },
  gita_commentaries_aggregate_order_by: {
    avg: { __type: "gita_commentaries_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "gita_commentaries_max_order_by" },
    min: { __type: "gita_commentaries_min_order_by" },
    stddev: { __type: "gita_commentaries_stddev_order_by" },
    stddev_pop: { __type: "gita_commentaries_stddev_pop_order_by" },
    stddev_samp: { __type: "gita_commentaries_stddev_samp_order_by" },
    sum: { __type: "gita_commentaries_sum_order_by" },
    var_pop: { __type: "gita_commentaries_var_pop_order_by" },
    var_samp: { __type: "gita_commentaries_var_samp_order_by" },
    variance: { __type: "gita_commentaries_variance_order_by" },
  },
  gita_commentaries_arr_rel_insert_input: {
    data: { __type: "[gita_commentaries_insert_input!]!" },
    on_conflict: { __type: "gita_commentaries_on_conflict" },
  },
  gita_commentaries_avg_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_commentaries_avg_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_bool_exp: {
    _and: { __type: "[gita_commentaries_bool_exp!]" },
    _not: { __type: "gita_commentaries_bool_exp" },
    _or: { __type: "[gita_commentaries_bool_exp!]" },
    author_id: { __type: "Int_comparison_exp" },
    author_name: { __type: "String_comparison_exp" },
    description: { __type: "String_comparison_exp" },
    gita_author: { __type: "gita_authors_bool_exp" },
    gita_language: { __type: "gita_languages_bool_exp" },
    gita_verse: { __type: "gita_verses_bool_exp" },
    id: { __type: "Int_comparison_exp" },
    language: { __type: "String_comparison_exp" },
    language_id: { __type: "Int_comparison_exp" },
    verse_id: { __type: "Int_comparison_exp" },
  },
  gita_commentaries_inc_input: {
    author_id: { __type: "Int" },
    id: { __type: "Int" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_commentaries_insert_input: {
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    gita_author: { __type: "gita_authors_obj_rel_insert_input" },
    gita_language: { __type: "gita_languages_obj_rel_insert_input" },
    gita_verse: { __type: "gita_verses_obj_rel_insert_input" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_commentaries_max_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_commentaries_max_order_by: {
    author_id: { __type: "order_by" },
    author_name: { __type: "order_by" },
    description: { __type: "order_by" },
    id: { __type: "order_by" },
    language: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_min_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_commentaries_min_order_by: {
    author_id: { __type: "order_by" },
    author_name: { __type: "order_by" },
    description: { __type: "order_by" },
    id: { __type: "order_by" },
    language: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[gita_commentaries!]!" },
  },
  gita_commentaries_on_conflict: {
    constraint: { __type: "gita_commentaries_constraint!" },
    update_columns: { __type: "[gita_commentaries_update_column!]!" },
    where: { __type: "gita_commentaries_bool_exp" },
  },
  gita_commentaries_order_by: {
    author_id: { __type: "order_by" },
    author_name: { __type: "order_by" },
    description: { __type: "order_by" },
    gita_author: { __type: "gita_authors_order_by" },
    gita_language: { __type: "gita_languages_order_by" },
    gita_verse: { __type: "gita_verses_order_by" },
    id: { __type: "order_by" },
    language: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_pk_columns_input: { id: { __type: "Int!" } },
  gita_commentaries_set_input: {
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_commentaries_stddev_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_commentaries_stddev_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_stddev_pop_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_commentaries_stddev_pop_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_stddev_samp_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_commentaries_stddev_samp_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_stream_cursor_input: {
    initial_value: { __type: "gita_commentaries_stream_cursor_value_input!" },
    ordering: { __type: "cursor_ordering" },
  },
  gita_commentaries_stream_cursor_value_input: {
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_commentaries_sum_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Int" },
    id: { __type: "Int" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_commentaries_sum_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_updates: {
    _inc: { __type: "gita_commentaries_inc_input" },
    _set: { __type: "gita_commentaries_set_input" },
    where: { __type: "gita_commentaries_bool_exp!" },
  },
  gita_commentaries_var_pop_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_commentaries_var_pop_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_var_samp_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_commentaries_var_samp_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_commentaries_variance_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_commentaries_variance_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_languages: {
    __typename: { __type: "String!" },
    gita_commentaries: {
      __type: "[gita_commentaries!]!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_translations: {
      __type: "[gita_translations!]!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    id: { __type: "Int!" },
    language: { __type: "String" },
  },
  gita_languages_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "gita_languages_aggregate_fields" },
    nodes: { __type: "[gita_languages!]!" },
  },
  gita_languages_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "gita_languages_avg_fields" },
    count: {
      __type: "Int!",
      __args: {
        columns: "[gita_languages_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "gita_languages_max_fields" },
    min: { __type: "gita_languages_min_fields" },
    stddev: { __type: "gita_languages_stddev_fields" },
    stddev_pop: { __type: "gita_languages_stddev_pop_fields" },
    stddev_samp: { __type: "gita_languages_stddev_samp_fields" },
    sum: { __type: "gita_languages_sum_fields" },
    var_pop: { __type: "gita_languages_var_pop_fields" },
    var_samp: { __type: "gita_languages_var_samp_fields" },
    variance: { __type: "gita_languages_variance_fields" },
  },
  gita_languages_avg_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_languages_bool_exp: {
    _and: { __type: "[gita_languages_bool_exp!]" },
    _not: { __type: "gita_languages_bool_exp" },
    _or: { __type: "[gita_languages_bool_exp!]" },
    gita_commentaries: { __type: "gita_commentaries_bool_exp" },
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate_bool_exp",
    },
    gita_translations: { __type: "gita_translations_bool_exp" },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate_bool_exp",
    },
    id: { __type: "Int_comparison_exp" },
    language: { __type: "String_comparison_exp" },
  },
  gita_languages_inc_input: { id: { __type: "Int" } },
  gita_languages_insert_input: {
    gita_commentaries: { __type: "gita_commentaries_arr_rel_insert_input" },
    gita_translations: { __type: "gita_translations_arr_rel_insert_input" },
    id: { __type: "Int" },
    language: { __type: "String" },
  },
  gita_languages_max_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
    language: { __type: "String" },
  },
  gita_languages_min_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
    language: { __type: "String" },
  },
  gita_languages_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[gita_languages!]!" },
  },
  gita_languages_obj_rel_insert_input: {
    data: { __type: "gita_languages_insert_input!" },
    on_conflict: { __type: "gita_languages_on_conflict" },
  },
  gita_languages_on_conflict: {
    constraint: { __type: "gita_languages_constraint!" },
    update_columns: { __type: "[gita_languages_update_column!]!" },
    where: { __type: "gita_languages_bool_exp" },
  },
  gita_languages_order_by: {
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate_order_by",
    },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate_order_by",
    },
    id: { __type: "order_by" },
    language: { __type: "order_by" },
  },
  gita_languages_pk_columns_input: { id: { __type: "Int!" } },
  gita_languages_set_input: {
    id: { __type: "Int" },
    language: { __type: "String" },
  },
  gita_languages_stddev_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_languages_stddev_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_languages_stddev_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_languages_stream_cursor_input: {
    initial_value: { __type: "gita_languages_stream_cursor_value_input!" },
    ordering: { __type: "cursor_ordering" },
  },
  gita_languages_stream_cursor_value_input: {
    id: { __type: "Int" },
    language: { __type: "String" },
  },
  gita_languages_sum_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
  },
  gita_languages_updates: {
    _inc: { __type: "gita_languages_inc_input" },
    _set: { __type: "gita_languages_set_input" },
    where: { __type: "gita_languages_bool_exp!" },
  },
  gita_languages_var_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_languages_var_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_languages_variance_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_translations: {
    __typename: { __type: "String!" },
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    gita_author: { __type: "gita_authors" },
    gita_language: { __type: "gita_languages" },
    gita_verse: { __type: "gita_verses" },
    id: { __type: "Int!" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_translations_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "gita_translations_aggregate_fields" },
    nodes: { __type: "[gita_translations!]!" },
  },
  gita_translations_aggregate_bool_exp: {
    count: { __type: "gita_translations_aggregate_bool_exp_count" },
  },
  gita_translations_aggregate_bool_exp_count: {
    arguments: { __type: "[gita_translations_select_column!]" },
    distinct: { __type: "Boolean" },
    filter: { __type: "gita_translations_bool_exp" },
    predicate: { __type: "Int_comparison_exp!" },
  },
  gita_translations_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "gita_translations_avg_fields" },
    count: {
      __type: "Int!",
      __args: {
        columns: "[gita_translations_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "gita_translations_max_fields" },
    min: { __type: "gita_translations_min_fields" },
    stddev: { __type: "gita_translations_stddev_fields" },
    stddev_pop: { __type: "gita_translations_stddev_pop_fields" },
    stddev_samp: { __type: "gita_translations_stddev_samp_fields" },
    sum: { __type: "gita_translations_sum_fields" },
    var_pop: { __type: "gita_translations_var_pop_fields" },
    var_samp: { __type: "gita_translations_var_samp_fields" },
    variance: { __type: "gita_translations_variance_fields" },
  },
  gita_translations_aggregate_order_by: {
    avg: { __type: "gita_translations_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "gita_translations_max_order_by" },
    min: { __type: "gita_translations_min_order_by" },
    stddev: { __type: "gita_translations_stddev_order_by" },
    stddev_pop: { __type: "gita_translations_stddev_pop_order_by" },
    stddev_samp: { __type: "gita_translations_stddev_samp_order_by" },
    sum: { __type: "gita_translations_sum_order_by" },
    var_pop: { __type: "gita_translations_var_pop_order_by" },
    var_samp: { __type: "gita_translations_var_samp_order_by" },
    variance: { __type: "gita_translations_variance_order_by" },
  },
  gita_translations_arr_rel_insert_input: {
    data: { __type: "[gita_translations_insert_input!]!" },
    on_conflict: { __type: "gita_translations_on_conflict" },
  },
  gita_translations_avg_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_translations_avg_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_bool_exp: {
    _and: { __type: "[gita_translations_bool_exp!]" },
    _not: { __type: "gita_translations_bool_exp" },
    _or: { __type: "[gita_translations_bool_exp!]" },
    author_id: { __type: "Int_comparison_exp" },
    author_name: { __type: "String_comparison_exp" },
    description: { __type: "String_comparison_exp" },
    gita_author: { __type: "gita_authors_bool_exp" },
    gita_language: { __type: "gita_languages_bool_exp" },
    gita_verse: { __type: "gita_verses_bool_exp" },
    id: { __type: "Int_comparison_exp" },
    language: { __type: "String_comparison_exp" },
    language_id: { __type: "Int_comparison_exp" },
    verse_id: { __type: "Int_comparison_exp" },
  },
  gita_translations_inc_input: {
    author_id: { __type: "Int" },
    id: { __type: "Int" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_translations_insert_input: {
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    gita_author: { __type: "gita_authors_obj_rel_insert_input" },
    gita_language: { __type: "gita_languages_obj_rel_insert_input" },
    gita_verse: { __type: "gita_verses_obj_rel_insert_input" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_translations_max_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_translations_max_order_by: {
    author_id: { __type: "order_by" },
    author_name: { __type: "order_by" },
    description: { __type: "order_by" },
    id: { __type: "order_by" },
    language: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_min_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_translations_min_order_by: {
    author_id: { __type: "order_by" },
    author_name: { __type: "order_by" },
    description: { __type: "order_by" },
    id: { __type: "order_by" },
    language: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[gita_translations!]!" },
  },
  gita_translations_on_conflict: {
    constraint: { __type: "gita_translations_constraint!" },
    update_columns: { __type: "[gita_translations_update_column!]!" },
    where: { __type: "gita_translations_bool_exp" },
  },
  gita_translations_order_by: {
    author_id: { __type: "order_by" },
    author_name: { __type: "order_by" },
    description: { __type: "order_by" },
    gita_author: { __type: "gita_authors_order_by" },
    gita_language: { __type: "gita_languages_order_by" },
    gita_verse: { __type: "gita_verses_order_by" },
    id: { __type: "order_by" },
    language: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_pk_columns_input: { id: { __type: "Int!" } },
  gita_translations_set_input: {
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_translations_stddev_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_translations_stddev_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_stddev_pop_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_translations_stddev_pop_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_stddev_samp_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_translations_stddev_samp_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_stream_cursor_input: {
    initial_value: { __type: "gita_translations_stream_cursor_value_input!" },
    ordering: { __type: "cursor_ordering" },
  },
  gita_translations_stream_cursor_value_input: {
    author_id: { __type: "Int" },
    author_name: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "Int" },
    language: { __type: "String" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_translations_sum_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Int" },
    id: { __type: "Int" },
    language_id: { __type: "Int" },
    verse_id: { __type: "Int" },
  },
  gita_translations_sum_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_updates: {
    _inc: { __type: "gita_translations_inc_input" },
    _set: { __type: "gita_translations_set_input" },
    where: { __type: "gita_translations_bool_exp!" },
  },
  gita_translations_var_pop_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_translations_var_pop_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_var_samp_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_translations_var_samp_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_translations_variance_fields: {
    __typename: { __type: "String!" },
    author_id: { __type: "Float" },
    id: { __type: "Float" },
    language_id: { __type: "Float" },
    verse_id: { __type: "Float" },
  },
  gita_translations_variance_order_by: {
    author_id: { __type: "order_by" },
    id: { __type: "order_by" },
    language_id: { __type: "order_by" },
    verse_id: { __type: "order_by" },
  },
  gita_users: {
    __typename: { __type: "String!" },
    api_key: { __type: "String" },
    app_description: { __type: "String" },
    app_link: { __type: "String" },
    app_name: { __type: "String" },
    created_on: { __type: "timestamptz" },
    email: { __type: "String" },
    full_name: { __type: "String" },
    id: { __type: "Int!" },
    is_active: { __type: "Boolean" },
  },
  gita_users_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "gita_users_aggregate_fields" },
    nodes: { __type: "[gita_users!]!" },
  },
  gita_users_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "gita_users_avg_fields" },
    count: {
      __type: "Int!",
      __args: { columns: "[gita_users_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "gita_users_max_fields" },
    min: { __type: "gita_users_min_fields" },
    stddev: { __type: "gita_users_stddev_fields" },
    stddev_pop: { __type: "gita_users_stddev_pop_fields" },
    stddev_samp: { __type: "gita_users_stddev_samp_fields" },
    sum: { __type: "gita_users_sum_fields" },
    var_pop: { __type: "gita_users_var_pop_fields" },
    var_samp: { __type: "gita_users_var_samp_fields" },
    variance: { __type: "gita_users_variance_fields" },
  },
  gita_users_avg_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_users_bool_exp: {
    _and: { __type: "[gita_users_bool_exp!]" },
    _not: { __type: "gita_users_bool_exp" },
    _or: { __type: "[gita_users_bool_exp!]" },
    api_key: { __type: "String_comparison_exp" },
    app_description: { __type: "String_comparison_exp" },
    app_link: { __type: "String_comparison_exp" },
    app_name: { __type: "String_comparison_exp" },
    created_on: { __type: "timestamptz_comparison_exp" },
    email: { __type: "String_comparison_exp" },
    full_name: { __type: "String_comparison_exp" },
    id: { __type: "Int_comparison_exp" },
    is_active: { __type: "Boolean_comparison_exp" },
  },
  gita_users_inc_input: { id: { __type: "Int" } },
  gita_users_insert_input: {
    api_key: { __type: "String" },
    app_description: { __type: "String" },
    app_link: { __type: "String" },
    app_name: { __type: "String" },
    created_on: { __type: "timestamptz" },
    email: { __type: "String" },
    full_name: { __type: "String" },
    id: { __type: "Int" },
    is_active: { __type: "Boolean" },
  },
  gita_users_max_fields: {
    __typename: { __type: "String!" },
    api_key: { __type: "String" },
    app_description: { __type: "String" },
    app_link: { __type: "String" },
    app_name: { __type: "String" },
    created_on: { __type: "timestamptz" },
    email: { __type: "String" },
    full_name: { __type: "String" },
    id: { __type: "Int" },
  },
  gita_users_min_fields: {
    __typename: { __type: "String!" },
    api_key: { __type: "String" },
    app_description: { __type: "String" },
    app_link: { __type: "String" },
    app_name: { __type: "String" },
    created_on: { __type: "timestamptz" },
    email: { __type: "String" },
    full_name: { __type: "String" },
    id: { __type: "Int" },
  },
  gita_users_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[gita_users!]!" },
  },
  gita_users_on_conflict: {
    constraint: { __type: "gita_users_constraint!" },
    update_columns: { __type: "[gita_users_update_column!]!" },
    where: { __type: "gita_users_bool_exp" },
  },
  gita_users_order_by: {
    api_key: { __type: "order_by" },
    app_description: { __type: "order_by" },
    app_link: { __type: "order_by" },
    app_name: { __type: "order_by" },
    created_on: { __type: "order_by" },
    email: { __type: "order_by" },
    full_name: { __type: "order_by" },
    id: { __type: "order_by" },
    is_active: { __type: "order_by" },
  },
  gita_users_pk_columns_input: { id: { __type: "Int!" } },
  gita_users_set_input: {
    api_key: { __type: "String" },
    app_description: { __type: "String" },
    app_link: { __type: "String" },
    app_name: { __type: "String" },
    created_on: { __type: "timestamptz" },
    email: { __type: "String" },
    full_name: { __type: "String" },
    id: { __type: "Int" },
    is_active: { __type: "Boolean" },
  },
  gita_users_stddev_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_users_stddev_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_users_stddev_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_users_stream_cursor_input: {
    initial_value: { __type: "gita_users_stream_cursor_value_input!" },
    ordering: { __type: "cursor_ordering" },
  },
  gita_users_stream_cursor_value_input: {
    api_key: { __type: "String" },
    app_description: { __type: "String" },
    app_link: { __type: "String" },
    app_name: { __type: "String" },
    created_on: { __type: "timestamptz" },
    email: { __type: "String" },
    full_name: { __type: "String" },
    id: { __type: "Int" },
    is_active: { __type: "Boolean" },
  },
  gita_users_sum_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
  },
  gita_users_updates: {
    _inc: { __type: "gita_users_inc_input" },
    _set: { __type: "gita_users_set_input" },
    where: { __type: "gita_users_bool_exp!" },
  },
  gita_users_var_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_users_var_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_users_variance_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  gita_verses: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Int" },
    chapter_number: { __type: "Int" },
    gita_chapter: { __type: "gita_chapters" },
    gita_commentaries: {
      __type: "[gita_commentaries!]!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_translations: {
      __type: "[gita_translations!]!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    id: { __type: "Int!" },
    slug: { __type: "String" },
    text: { __type: "String" },
    transliteration: { __type: "String" },
    verse_number: { __type: "Int" },
    word_meanings: { __type: "String" },
  },
  gita_verses_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "gita_verses_aggregate_fields" },
    nodes: { __type: "[gita_verses!]!" },
  },
  gita_verses_aggregate_bool_exp: {
    count: { __type: "gita_verses_aggregate_bool_exp_count" },
  },
  gita_verses_aggregate_bool_exp_count: {
    arguments: { __type: "[gita_verses_select_column!]" },
    distinct: { __type: "Boolean" },
    filter: { __type: "gita_verses_bool_exp" },
    predicate: { __type: "Int_comparison_exp!" },
  },
  gita_verses_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "gita_verses_avg_fields" },
    count: {
      __type: "Int!",
      __args: { columns: "[gita_verses_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "gita_verses_max_fields" },
    min: { __type: "gita_verses_min_fields" },
    stddev: { __type: "gita_verses_stddev_fields" },
    stddev_pop: { __type: "gita_verses_stddev_pop_fields" },
    stddev_samp: { __type: "gita_verses_stddev_samp_fields" },
    sum: { __type: "gita_verses_sum_fields" },
    var_pop: { __type: "gita_verses_var_pop_fields" },
    var_samp: { __type: "gita_verses_var_samp_fields" },
    variance: { __type: "gita_verses_variance_fields" },
  },
  gita_verses_aggregate_order_by: {
    avg: { __type: "gita_verses_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "gita_verses_max_order_by" },
    min: { __type: "gita_verses_min_order_by" },
    stddev: { __type: "gita_verses_stddev_order_by" },
    stddev_pop: { __type: "gita_verses_stddev_pop_order_by" },
    stddev_samp: { __type: "gita_verses_stddev_samp_order_by" },
    sum: { __type: "gita_verses_sum_order_by" },
    var_pop: { __type: "gita_verses_var_pop_order_by" },
    var_samp: { __type: "gita_verses_var_samp_order_by" },
    variance: { __type: "gita_verses_variance_order_by" },
  },
  gita_verses_arr_rel_insert_input: {
    data: { __type: "[gita_verses_insert_input!]!" },
    on_conflict: { __type: "gita_verses_on_conflict" },
  },
  gita_verses_avg_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Float" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verse_number: { __type: "Float" },
  },
  gita_verses_avg_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    verse_number: { __type: "order_by" },
  },
  gita_verses_bool_exp: {
    _and: { __type: "[gita_verses_bool_exp!]" },
    _not: { __type: "gita_verses_bool_exp" },
    _or: { __type: "[gita_verses_bool_exp!]" },
    chapter_id: { __type: "Int_comparison_exp" },
    chapter_number: { __type: "Int_comparison_exp" },
    gita_chapter: { __type: "gita_chapters_bool_exp" },
    gita_commentaries: { __type: "gita_commentaries_bool_exp" },
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate_bool_exp",
    },
    gita_translations: { __type: "gita_translations_bool_exp" },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate_bool_exp",
    },
    id: { __type: "Int_comparison_exp" },
    slug: { __type: "String_comparison_exp" },
    text: { __type: "String_comparison_exp" },
    transliteration: { __type: "String_comparison_exp" },
    verse_number: { __type: "Int_comparison_exp" },
    word_meanings: { __type: "String_comparison_exp" },
  },
  gita_verses_inc_input: {
    chapter_id: { __type: "Int" },
    chapter_number: { __type: "Int" },
    id: { __type: "Int" },
    verse_number: { __type: "Int" },
  },
  gita_verses_insert_input: {
    chapter_id: { __type: "Int" },
    chapter_number: { __type: "Int" },
    gita_chapter: { __type: "gita_chapters_obj_rel_insert_input" },
    gita_commentaries: { __type: "gita_commentaries_arr_rel_insert_input" },
    gita_translations: { __type: "gita_translations_arr_rel_insert_input" },
    id: { __type: "Int" },
    slug: { __type: "String" },
    text: { __type: "String" },
    transliteration: { __type: "String" },
    verse_number: { __type: "Int" },
    word_meanings: { __type: "String" },
  },
  gita_verses_max_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Int" },
    chapter_number: { __type: "Int" },
    id: { __type: "Int" },
    slug: { __type: "String" },
    text: { __type: "String" },
    transliteration: { __type: "String" },
    verse_number: { __type: "Int" },
    word_meanings: { __type: "String" },
  },
  gita_verses_max_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    slug: { __type: "order_by" },
    text: { __type: "order_by" },
    transliteration: { __type: "order_by" },
    verse_number: { __type: "order_by" },
    word_meanings: { __type: "order_by" },
  },
  gita_verses_min_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Int" },
    chapter_number: { __type: "Int" },
    id: { __type: "Int" },
    slug: { __type: "String" },
    text: { __type: "String" },
    transliteration: { __type: "String" },
    verse_number: { __type: "Int" },
    word_meanings: { __type: "String" },
  },
  gita_verses_min_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    slug: { __type: "order_by" },
    text: { __type: "order_by" },
    transliteration: { __type: "order_by" },
    verse_number: { __type: "order_by" },
    word_meanings: { __type: "order_by" },
  },
  gita_verses_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[gita_verses!]!" },
  },
  gita_verses_obj_rel_insert_input: {
    data: { __type: "gita_verses_insert_input!" },
    on_conflict: { __type: "gita_verses_on_conflict" },
  },
  gita_verses_on_conflict: {
    constraint: { __type: "gita_verses_constraint!" },
    update_columns: { __type: "[gita_verses_update_column!]!" },
    where: { __type: "gita_verses_bool_exp" },
  },
  gita_verses_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    gita_chapter: { __type: "gita_chapters_order_by" },
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate_order_by",
    },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate_order_by",
    },
    id: { __type: "order_by" },
    slug: { __type: "order_by" },
    text: { __type: "order_by" },
    transliteration: { __type: "order_by" },
    verse_number: { __type: "order_by" },
    word_meanings: { __type: "order_by" },
  },
  gita_verses_pk_columns_input: { id: { __type: "Int!" } },
  gita_verses_set_input: {
    chapter_id: { __type: "Int" },
    chapter_number: { __type: "Int" },
    id: { __type: "Int" },
    slug: { __type: "String" },
    text: { __type: "String" },
    transliteration: { __type: "String" },
    verse_number: { __type: "Int" },
    word_meanings: { __type: "String" },
  },
  gita_verses_stddev_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Float" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verse_number: { __type: "Float" },
  },
  gita_verses_stddev_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    verse_number: { __type: "order_by" },
  },
  gita_verses_stddev_pop_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Float" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verse_number: { __type: "Float" },
  },
  gita_verses_stddev_pop_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    verse_number: { __type: "order_by" },
  },
  gita_verses_stddev_samp_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Float" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verse_number: { __type: "Float" },
  },
  gita_verses_stddev_samp_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    verse_number: { __type: "order_by" },
  },
  gita_verses_stream_cursor_input: {
    initial_value: { __type: "gita_verses_stream_cursor_value_input!" },
    ordering: { __type: "cursor_ordering" },
  },
  gita_verses_stream_cursor_value_input: {
    chapter_id: { __type: "Int" },
    chapter_number: { __type: "Int" },
    id: { __type: "Int" },
    slug: { __type: "String" },
    text: { __type: "String" },
    transliteration: { __type: "String" },
    verse_number: { __type: "Int" },
    word_meanings: { __type: "String" },
  },
  gita_verses_sum_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Int" },
    chapter_number: { __type: "Int" },
    id: { __type: "Int" },
    verse_number: { __type: "Int" },
  },
  gita_verses_sum_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    verse_number: { __type: "order_by" },
  },
  gita_verses_updates: {
    _inc: { __type: "gita_verses_inc_input" },
    _set: { __type: "gita_verses_set_input" },
    where: { __type: "gita_verses_bool_exp!" },
  },
  gita_verses_var_pop_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Float" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verse_number: { __type: "Float" },
  },
  gita_verses_var_pop_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    verse_number: { __type: "order_by" },
  },
  gita_verses_var_samp_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Float" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verse_number: { __type: "Float" },
  },
  gita_verses_var_samp_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    verse_number: { __type: "order_by" },
  },
  gita_verses_variance_fields: {
    __typename: { __type: "String!" },
    chapter_id: { __type: "Float" },
    chapter_number: { __type: "Float" },
    id: { __type: "Float" },
    verse_number: { __type: "Float" },
  },
  gita_verses_variance_order_by: {
    chapter_id: { __type: "order_by" },
    chapter_number: { __type: "order_by" },
    id: { __type: "order_by" },
    verse_number: { __type: "order_by" },
  },
  mutation: {
    __typename: { __type: "String!" },
    delete_gita_authors: {
      __type: "gita_authors_mutation_response",
      __args: { where: "gita_authors_bool_exp!" },
    },
    delete_gita_authors_by_pk: {
      __type: "gita_authors",
      __args: { id: "Int!" },
    },
    delete_gita_chapters: {
      __type: "gita_chapters_mutation_response",
      __args: { where: "gita_chapters_bool_exp!" },
    },
    delete_gita_chapters_by_pk: {
      __type: "gita_chapters",
      __args: { id: "Int!" },
    },
    delete_gita_commentaries: {
      __type: "gita_commentaries_mutation_response",
      __args: { where: "gita_commentaries_bool_exp!" },
    },
    delete_gita_commentaries_by_pk: {
      __type: "gita_commentaries",
      __args: { id: "Int!" },
    },
    delete_gita_languages: {
      __type: "gita_languages_mutation_response",
      __args: { where: "gita_languages_bool_exp!" },
    },
    delete_gita_languages_by_pk: {
      __type: "gita_languages",
      __args: { id: "Int!" },
    },
    delete_gita_translations: {
      __type: "gita_translations_mutation_response",
      __args: { where: "gita_translations_bool_exp!" },
    },
    delete_gita_translations_by_pk: {
      __type: "gita_translations",
      __args: { id: "Int!" },
    },
    delete_gita_users: {
      __type: "gita_users_mutation_response",
      __args: { where: "gita_users_bool_exp!" },
    },
    delete_gita_users_by_pk: { __type: "gita_users", __args: { id: "Int!" } },
    delete_gita_verses: {
      __type: "gita_verses_mutation_response",
      __args: { where: "gita_verses_bool_exp!" },
    },
    delete_gita_verses_by_pk: { __type: "gita_verses", __args: { id: "Int!" } },
    delete_newsletter_subscriptions: {
      __type: "newsletter_subscriptions_mutation_response",
      __args: { where: "newsletter_subscriptions_bool_exp!" },
    },
    delete_newsletter_subscriptions_by_pk: {
      __type: "newsletter_subscriptions",
      __args: { id: "Int!" },
    },
    delete_verse_of_the_day: {
      __type: "verse_of_the_day_mutation_response",
      __args: { where: "verse_of_the_day_bool_exp!" },
    },
    delete_verse_of_the_day_by_pk: {
      __type: "verse_of_the_day",
      __args: { id: "Int!" },
    },
    insert_gita_authors: {
      __type: "gita_authors_mutation_response",
      __args: {
        objects: "[gita_authors_insert_input!]!",
        on_conflict: "gita_authors_on_conflict",
      },
    },
    insert_gita_authors_one: {
      __type: "gita_authors",
      __args: {
        object: "gita_authors_insert_input!",
        on_conflict: "gita_authors_on_conflict",
      },
    },
    insert_gita_chapters: {
      __type: "gita_chapters_mutation_response",
      __args: {
        objects: "[gita_chapters_insert_input!]!",
        on_conflict: "gita_chapters_on_conflict",
      },
    },
    insert_gita_chapters_one: {
      __type: "gita_chapters",
      __args: {
        object: "gita_chapters_insert_input!",
        on_conflict: "gita_chapters_on_conflict",
      },
    },
    insert_gita_commentaries: {
      __type: "gita_commentaries_mutation_response",
      __args: {
        objects: "[gita_commentaries_insert_input!]!",
        on_conflict: "gita_commentaries_on_conflict",
      },
    },
    insert_gita_commentaries_one: {
      __type: "gita_commentaries",
      __args: {
        object: "gita_commentaries_insert_input!",
        on_conflict: "gita_commentaries_on_conflict",
      },
    },
    insert_gita_languages: {
      __type: "gita_languages_mutation_response",
      __args: {
        objects: "[gita_languages_insert_input!]!",
        on_conflict: "gita_languages_on_conflict",
      },
    },
    insert_gita_languages_one: {
      __type: "gita_languages",
      __args: {
        object: "gita_languages_insert_input!",
        on_conflict: "gita_languages_on_conflict",
      },
    },
    insert_gita_translations: {
      __type: "gita_translations_mutation_response",
      __args: {
        objects: "[gita_translations_insert_input!]!",
        on_conflict: "gita_translations_on_conflict",
      },
    },
    insert_gita_translations_one: {
      __type: "gita_translations",
      __args: {
        object: "gita_translations_insert_input!",
        on_conflict: "gita_translations_on_conflict",
      },
    },
    insert_gita_users: {
      __type: "gita_users_mutation_response",
      __args: {
        objects: "[gita_users_insert_input!]!",
        on_conflict: "gita_users_on_conflict",
      },
    },
    insert_gita_users_one: {
      __type: "gita_users",
      __args: {
        object: "gita_users_insert_input!",
        on_conflict: "gita_users_on_conflict",
      },
    },
    insert_gita_verses: {
      __type: "gita_verses_mutation_response",
      __args: {
        objects: "[gita_verses_insert_input!]!",
        on_conflict: "gita_verses_on_conflict",
      },
    },
    insert_gita_verses_one: {
      __type: "gita_verses",
      __args: {
        object: "gita_verses_insert_input!",
        on_conflict: "gita_verses_on_conflict",
      },
    },
    insert_newsletter_subscriptions: {
      __type: "newsletter_subscriptions_mutation_response",
      __args: {
        objects: "[newsletter_subscriptions_insert_input!]!",
        on_conflict: "newsletter_subscriptions_on_conflict",
      },
    },
    insert_newsletter_subscriptions_one: {
      __type: "newsletter_subscriptions",
      __args: {
        object: "newsletter_subscriptions_insert_input!",
        on_conflict: "newsletter_subscriptions_on_conflict",
      },
    },
    insert_verse_of_the_day: {
      __type: "verse_of_the_day_mutation_response",
      __args: {
        objects: "[verse_of_the_day_insert_input!]!",
        on_conflict: "verse_of_the_day_on_conflict",
      },
    },
    insert_verse_of_the_day_one: {
      __type: "verse_of_the_day",
      __args: {
        object: "verse_of_the_day_insert_input!",
        on_conflict: "verse_of_the_day_on_conflict",
      },
    },
    update_gita_authors: {
      __type: "gita_authors_mutation_response",
      __args: {
        _inc: "gita_authors_inc_input",
        _set: "gita_authors_set_input",
        where: "gita_authors_bool_exp!",
      },
    },
    update_gita_authors_by_pk: {
      __type: "gita_authors",
      __args: {
        _inc: "gita_authors_inc_input",
        _set: "gita_authors_set_input",
        pk_columns: "gita_authors_pk_columns_input!",
      },
    },
    update_gita_authors_many: {
      __type: "[gita_authors_mutation_response]",
      __args: { updates: "[gita_authors_updates!]!" },
    },
    update_gita_chapters: {
      __type: "gita_chapters_mutation_response",
      __args: {
        _inc: "gita_chapters_inc_input",
        _set: "gita_chapters_set_input",
        where: "gita_chapters_bool_exp!",
      },
    },
    update_gita_chapters_by_pk: {
      __type: "gita_chapters",
      __args: {
        _inc: "gita_chapters_inc_input",
        _set: "gita_chapters_set_input",
        pk_columns: "gita_chapters_pk_columns_input!",
      },
    },
    update_gita_chapters_many: {
      __type: "[gita_chapters_mutation_response]",
      __args: { updates: "[gita_chapters_updates!]!" },
    },
    update_gita_commentaries: {
      __type: "gita_commentaries_mutation_response",
      __args: {
        _inc: "gita_commentaries_inc_input",
        _set: "gita_commentaries_set_input",
        where: "gita_commentaries_bool_exp!",
      },
    },
    update_gita_commentaries_by_pk: {
      __type: "gita_commentaries",
      __args: {
        _inc: "gita_commentaries_inc_input",
        _set: "gita_commentaries_set_input",
        pk_columns: "gita_commentaries_pk_columns_input!",
      },
    },
    update_gita_commentaries_many: {
      __type: "[gita_commentaries_mutation_response]",
      __args: { updates: "[gita_commentaries_updates!]!" },
    },
    update_gita_languages: {
      __type: "gita_languages_mutation_response",
      __args: {
        _inc: "gita_languages_inc_input",
        _set: "gita_languages_set_input",
        where: "gita_languages_bool_exp!",
      },
    },
    update_gita_languages_by_pk: {
      __type: "gita_languages",
      __args: {
        _inc: "gita_languages_inc_input",
        _set: "gita_languages_set_input",
        pk_columns: "gita_languages_pk_columns_input!",
      },
    },
    update_gita_languages_many: {
      __type: "[gita_languages_mutation_response]",
      __args: { updates: "[gita_languages_updates!]!" },
    },
    update_gita_translations: {
      __type: "gita_translations_mutation_response",
      __args: {
        _inc: "gita_translations_inc_input",
        _set: "gita_translations_set_input",
        where: "gita_translations_bool_exp!",
      },
    },
    update_gita_translations_by_pk: {
      __type: "gita_translations",
      __args: {
        _inc: "gita_translations_inc_input",
        _set: "gita_translations_set_input",
        pk_columns: "gita_translations_pk_columns_input!",
      },
    },
    update_gita_translations_many: {
      __type: "[gita_translations_mutation_response]",
      __args: { updates: "[gita_translations_updates!]!" },
    },
    update_gita_users: {
      __type: "gita_users_mutation_response",
      __args: {
        _inc: "gita_users_inc_input",
        _set: "gita_users_set_input",
        where: "gita_users_bool_exp!",
      },
    },
    update_gita_users_by_pk: {
      __type: "gita_users",
      __args: {
        _inc: "gita_users_inc_input",
        _set: "gita_users_set_input",
        pk_columns: "gita_users_pk_columns_input!",
      },
    },
    update_gita_users_many: {
      __type: "[gita_users_mutation_response]",
      __args: { updates: "[gita_users_updates!]!" },
    },
    update_gita_verses: {
      __type: "gita_verses_mutation_response",
      __args: {
        _inc: "gita_verses_inc_input",
        _set: "gita_verses_set_input",
        where: "gita_verses_bool_exp!",
      },
    },
    update_gita_verses_by_pk: {
      __type: "gita_verses",
      __args: {
        _inc: "gita_verses_inc_input",
        _set: "gita_verses_set_input",
        pk_columns: "gita_verses_pk_columns_input!",
      },
    },
    update_gita_verses_many: {
      __type: "[gita_verses_mutation_response]",
      __args: { updates: "[gita_verses_updates!]!" },
    },
    update_newsletter_subscriptions: {
      __type: "newsletter_subscriptions_mutation_response",
      __args: {
        _inc: "newsletter_subscriptions_inc_input",
        _set: "newsletter_subscriptions_set_input",
        where: "newsletter_subscriptions_bool_exp!",
      },
    },
    update_newsletter_subscriptions_by_pk: {
      __type: "newsletter_subscriptions",
      __args: {
        _inc: "newsletter_subscriptions_inc_input",
        _set: "newsletter_subscriptions_set_input",
        pk_columns: "newsletter_subscriptions_pk_columns_input!",
      },
    },
    update_newsletter_subscriptions_many: {
      __type: "[newsletter_subscriptions_mutation_response]",
      __args: { updates: "[newsletter_subscriptions_updates!]!" },
    },
    update_verse_of_the_day: {
      __type: "verse_of_the_day_mutation_response",
      __args: {
        _inc: "verse_of_the_day_inc_input",
        _set: "verse_of_the_day_set_input",
        where: "verse_of_the_day_bool_exp!",
      },
    },
    update_verse_of_the_day_by_pk: {
      __type: "verse_of_the_day",
      __args: {
        _inc: "verse_of_the_day_inc_input",
        _set: "verse_of_the_day_set_input",
        pk_columns: "verse_of_the_day_pk_columns_input!",
      },
    },
    update_verse_of_the_day_many: {
      __type: "[verse_of_the_day_mutation_response]",
      __args: { updates: "[verse_of_the_day_updates!]!" },
    },
  },
  newsletter_subscriptions: {
    __typename: { __type: "String!" },
    id: { __type: "Int!" },
    user_email: { __type: "String!" },
    user_name: { __type: "String!" },
  },
  newsletter_subscriptions_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "newsletter_subscriptions_aggregate_fields" },
    nodes: { __type: "[newsletter_subscriptions!]!" },
  },
  newsletter_subscriptions_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "newsletter_subscriptions_avg_fields" },
    count: {
      __type: "Int!",
      __args: {
        columns: "[newsletter_subscriptions_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "newsletter_subscriptions_max_fields" },
    min: { __type: "newsletter_subscriptions_min_fields" },
    stddev: { __type: "newsletter_subscriptions_stddev_fields" },
    stddev_pop: { __type: "newsletter_subscriptions_stddev_pop_fields" },
    stddev_samp: { __type: "newsletter_subscriptions_stddev_samp_fields" },
    sum: { __type: "newsletter_subscriptions_sum_fields" },
    var_pop: { __type: "newsletter_subscriptions_var_pop_fields" },
    var_samp: { __type: "newsletter_subscriptions_var_samp_fields" },
    variance: { __type: "newsletter_subscriptions_variance_fields" },
  },
  newsletter_subscriptions_avg_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  newsletter_subscriptions_bool_exp: {
    _and: { __type: "[newsletter_subscriptions_bool_exp!]" },
    _not: { __type: "newsletter_subscriptions_bool_exp" },
    _or: { __type: "[newsletter_subscriptions_bool_exp!]" },
    id: { __type: "Int_comparison_exp" },
    user_email: { __type: "String_comparison_exp" },
    user_name: { __type: "String_comparison_exp" },
  },
  newsletter_subscriptions_inc_input: { id: { __type: "Int" } },
  newsletter_subscriptions_insert_input: {
    id: { __type: "Int" },
    user_email: { __type: "String" },
    user_name: { __type: "String" },
  },
  newsletter_subscriptions_max_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
    user_email: { __type: "String" },
    user_name: { __type: "String" },
  },
  newsletter_subscriptions_min_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
    user_email: { __type: "String" },
    user_name: { __type: "String" },
  },
  newsletter_subscriptions_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[newsletter_subscriptions!]!" },
  },
  newsletter_subscriptions_on_conflict: {
    constraint: { __type: "newsletter_subscriptions_constraint!" },
    update_columns: { __type: "[newsletter_subscriptions_update_column!]!" },
    where: { __type: "newsletter_subscriptions_bool_exp" },
  },
  newsletter_subscriptions_order_by: {
    id: { __type: "order_by" },
    user_email: { __type: "order_by" },
    user_name: { __type: "order_by" },
  },
  newsletter_subscriptions_pk_columns_input: { id: { __type: "Int!" } },
  newsletter_subscriptions_set_input: {
    id: { __type: "Int" },
    user_email: { __type: "String" },
    user_name: { __type: "String" },
  },
  newsletter_subscriptions_stddev_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  newsletter_subscriptions_stddev_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  newsletter_subscriptions_stddev_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  newsletter_subscriptions_stream_cursor_input: {
    initial_value: {
      __type: "newsletter_subscriptions_stream_cursor_value_input!",
    },
    ordering: { __type: "cursor_ordering" },
  },
  newsletter_subscriptions_stream_cursor_value_input: {
    id: { __type: "Int" },
    user_email: { __type: "String" },
    user_name: { __type: "String" },
  },
  newsletter_subscriptions_sum_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
  },
  newsletter_subscriptions_updates: {
    _inc: { __type: "newsletter_subscriptions_inc_input" },
    _set: { __type: "newsletter_subscriptions_set_input" },
    where: { __type: "newsletter_subscriptions_bool_exp!" },
  },
  newsletter_subscriptions_var_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  newsletter_subscriptions_var_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  newsletter_subscriptions_variance_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
  },
  query: {
    __typename: { __type: "String!" },
    gita_authors: {
      __type: "[gita_authors!]!",
      __args: {
        distinct_on: "[gita_authors_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_authors_order_by!]",
        where: "gita_authors_bool_exp",
      },
    },
    gita_authors_aggregate: {
      __type: "gita_authors_aggregate!",
      __args: {
        distinct_on: "[gita_authors_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_authors_order_by!]",
        where: "gita_authors_bool_exp",
      },
    },
    gita_authors_by_pk: { __type: "gita_authors", __args: { id: "Int!" } },
    gita_chapters: {
      __type: "[gita_chapters!]!",
      __args: {
        distinct_on: "[gita_chapters_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_chapters_order_by!]",
        where: "gita_chapters_bool_exp",
      },
    },
    gita_chapters_aggregate: {
      __type: "gita_chapters_aggregate!",
      __args: {
        distinct_on: "[gita_chapters_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_chapters_order_by!]",
        where: "gita_chapters_bool_exp",
      },
    },
    gita_chapters_by_pk: { __type: "gita_chapters", __args: { id: "Int!" } },
    gita_commentaries: {
      __type: "[gita_commentaries!]!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_commentaries_by_pk: {
      __type: "gita_commentaries",
      __args: { id: "Int!" },
    },
    gita_languages: {
      __type: "[gita_languages!]!",
      __args: {
        distinct_on: "[gita_languages_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_languages_order_by!]",
        where: "gita_languages_bool_exp",
      },
    },
    gita_languages_aggregate: {
      __type: "gita_languages_aggregate!",
      __args: {
        distinct_on: "[gita_languages_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_languages_order_by!]",
        where: "gita_languages_bool_exp",
      },
    },
    gita_languages_by_pk: { __type: "gita_languages", __args: { id: "Int!" } },
    gita_translations: {
      __type: "[gita_translations!]!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    gita_translations_by_pk: {
      __type: "gita_translations",
      __args: { id: "Int!" },
    },
    gita_users: {
      __type: "[gita_users!]!",
      __args: {
        distinct_on: "[gita_users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_users_order_by!]",
        where: "gita_users_bool_exp",
      },
    },
    gita_users_aggregate: {
      __type: "gita_users_aggregate!",
      __args: {
        distinct_on: "[gita_users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_users_order_by!]",
        where: "gita_users_bool_exp",
      },
    },
    gita_users_by_pk: { __type: "gita_users", __args: { id: "Int!" } },
    gita_verses: {
      __type: "[gita_verses!]!",
      __args: {
        distinct_on: "[gita_verses_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_verses_order_by!]",
        where: "gita_verses_bool_exp",
      },
    },
    gita_verses_aggregate: {
      __type: "gita_verses_aggregate!",
      __args: {
        distinct_on: "[gita_verses_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_verses_order_by!]",
        where: "gita_verses_bool_exp",
      },
    },
    gita_verses_by_pk: { __type: "gita_verses", __args: { id: "Int!" } },
    newsletter_subscriptions: {
      __type: "[newsletter_subscriptions!]!",
      __args: {
        distinct_on: "[newsletter_subscriptions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[newsletter_subscriptions_order_by!]",
        where: "newsletter_subscriptions_bool_exp",
      },
    },
    newsletter_subscriptions_aggregate: {
      __type: "newsletter_subscriptions_aggregate!",
      __args: {
        distinct_on: "[newsletter_subscriptions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[newsletter_subscriptions_order_by!]",
        where: "newsletter_subscriptions_bool_exp",
      },
    },
    newsletter_subscriptions_by_pk: {
      __type: "newsletter_subscriptions",
      __args: { id: "Int!" },
    },
    verse_of_the_day: {
      __type: "[verse_of_the_day!]!",
      __args: {
        distinct_on: "[verse_of_the_day_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[verse_of_the_day_order_by!]",
        where: "verse_of_the_day_bool_exp",
      },
    },
    verse_of_the_day_aggregate: {
      __type: "verse_of_the_day_aggregate!",
      __args: {
        distinct_on: "[verse_of_the_day_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[verse_of_the_day_order_by!]",
        where: "verse_of_the_day_bool_exp",
      },
    },
    verse_of_the_day_by_pk: {
      __type: "verse_of_the_day",
      __args: { id: "Int!" },
    },
  },
  subscription: {
    __typename: { __type: "String!" },
    gita_authors: {
      __type: "[gita_authors!]!",
      __args: {
        distinct_on: "[gita_authors_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_authors_order_by!]",
        where: "gita_authors_bool_exp",
      },
    },
    gita_authors_aggregate: {
      __type: "gita_authors_aggregate!",
      __args: {
        distinct_on: "[gita_authors_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_authors_order_by!]",
        where: "gita_authors_bool_exp",
      },
    },
    gita_authors_by_pk: { __type: "gita_authors", __args: { id: "Int!" } },
    gita_authors_stream: {
      __type: "[gita_authors!]!",
      __args: {
        batch_size: "Int!",
        cursor: "[gita_authors_stream_cursor_input]!",
        where: "gita_authors_bool_exp",
      },
    },
    gita_chapters: {
      __type: "[gita_chapters!]!",
      __args: {
        distinct_on: "[gita_chapters_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_chapters_order_by!]",
        where: "gita_chapters_bool_exp",
      },
    },
    gita_chapters_aggregate: {
      __type: "gita_chapters_aggregate!",
      __args: {
        distinct_on: "[gita_chapters_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_chapters_order_by!]",
        where: "gita_chapters_bool_exp",
      },
    },
    gita_chapters_by_pk: { __type: "gita_chapters", __args: { id: "Int!" } },
    gita_chapters_stream: {
      __type: "[gita_chapters!]!",
      __args: {
        batch_size: "Int!",
        cursor: "[gita_chapters_stream_cursor_input]!",
        where: "gita_chapters_bool_exp",
      },
    },
    gita_commentaries: {
      __type: "[gita_commentaries!]!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_commentaries_aggregate: {
      __type: "gita_commentaries_aggregate!",
      __args: {
        distinct_on: "[gita_commentaries_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_commentaries_order_by!]",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_commentaries_by_pk: {
      __type: "gita_commentaries",
      __args: { id: "Int!" },
    },
    gita_commentaries_stream: {
      __type: "[gita_commentaries!]!",
      __args: {
        batch_size: "Int!",
        cursor: "[gita_commentaries_stream_cursor_input]!",
        where: "gita_commentaries_bool_exp",
      },
    },
    gita_languages: {
      __type: "[gita_languages!]!",
      __args: {
        distinct_on: "[gita_languages_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_languages_order_by!]",
        where: "gita_languages_bool_exp",
      },
    },
    gita_languages_aggregate: {
      __type: "gita_languages_aggregate!",
      __args: {
        distinct_on: "[gita_languages_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_languages_order_by!]",
        where: "gita_languages_bool_exp",
      },
    },
    gita_languages_by_pk: { __type: "gita_languages", __args: { id: "Int!" } },
    gita_languages_stream: {
      __type: "[gita_languages!]!",
      __args: {
        batch_size: "Int!",
        cursor: "[gita_languages_stream_cursor_input]!",
        where: "gita_languages_bool_exp",
      },
    },
    gita_translations: {
      __type: "[gita_translations!]!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    gita_translations_aggregate: {
      __type: "gita_translations_aggregate!",
      __args: {
        distinct_on: "[gita_translations_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_translations_order_by!]",
        where: "gita_translations_bool_exp",
      },
    },
    gita_translations_by_pk: {
      __type: "gita_translations",
      __args: { id: "Int!" },
    },
    gita_translations_stream: {
      __type: "[gita_translations!]!",
      __args: {
        batch_size: "Int!",
        cursor: "[gita_translations_stream_cursor_input]!",
        where: "gita_translations_bool_exp",
      },
    },
    gita_users: {
      __type: "[gita_users!]!",
      __args: {
        distinct_on: "[gita_users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_users_order_by!]",
        where: "gita_users_bool_exp",
      },
    },
    gita_users_aggregate: {
      __type: "gita_users_aggregate!",
      __args: {
        distinct_on: "[gita_users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_users_order_by!]",
        where: "gita_users_bool_exp",
      },
    },
    gita_users_by_pk: { __type: "gita_users", __args: { id: "Int!" } },
    gita_users_stream: {
      __type: "[gita_users!]!",
      __args: {
        batch_size: "Int!",
        cursor: "[gita_users_stream_cursor_input]!",
        where: "gita_users_bool_exp",
      },
    },
    gita_verses: {
      __type: "[gita_verses!]!",
      __args: {
        distinct_on: "[gita_verses_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_verses_order_by!]",
        where: "gita_verses_bool_exp",
      },
    },
    gita_verses_aggregate: {
      __type: "gita_verses_aggregate!",
      __args: {
        distinct_on: "[gita_verses_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[gita_verses_order_by!]",
        where: "gita_verses_bool_exp",
      },
    },
    gita_verses_by_pk: { __type: "gita_verses", __args: { id: "Int!" } },
    gita_verses_stream: {
      __type: "[gita_verses!]!",
      __args: {
        batch_size: "Int!",
        cursor: "[gita_verses_stream_cursor_input]!",
        where: "gita_verses_bool_exp",
      },
    },
    newsletter_subscriptions: {
      __type: "[newsletter_subscriptions!]!",
      __args: {
        distinct_on: "[newsletter_subscriptions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[newsletter_subscriptions_order_by!]",
        where: "newsletter_subscriptions_bool_exp",
      },
    },
    newsletter_subscriptions_aggregate: {
      __type: "newsletter_subscriptions_aggregate!",
      __args: {
        distinct_on: "[newsletter_subscriptions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[newsletter_subscriptions_order_by!]",
        where: "newsletter_subscriptions_bool_exp",
      },
    },
    newsletter_subscriptions_by_pk: {
      __type: "newsletter_subscriptions",
      __args: { id: "Int!" },
    },
    newsletter_subscriptions_stream: {
      __type: "[newsletter_subscriptions!]!",
      __args: {
        batch_size: "Int!",
        cursor: "[newsletter_subscriptions_stream_cursor_input]!",
        where: "newsletter_subscriptions_bool_exp",
      },
    },
    verse_of_the_day: {
      __type: "[verse_of_the_day!]!",
      __args: {
        distinct_on: "[verse_of_the_day_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[verse_of_the_day_order_by!]",
        where: "verse_of_the_day_bool_exp",
      },
    },
    verse_of_the_day_aggregate: {
      __type: "verse_of_the_day_aggregate!",
      __args: {
        distinct_on: "[verse_of_the_day_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[verse_of_the_day_order_by!]",
        where: "verse_of_the_day_bool_exp",
      },
    },
    verse_of_the_day_by_pk: {
      __type: "verse_of_the_day",
      __args: { id: "Int!" },
    },
    verse_of_the_day_stream: {
      __type: "[verse_of_the_day!]!",
      __args: {
        batch_size: "Int!",
        cursor: "[verse_of_the_day_stream_cursor_input]!",
        where: "verse_of_the_day_bool_exp",
      },
    },
  },
  timestamptz_comparison_exp: {
    _eq: { __type: "timestamptz" },
    _gt: { __type: "timestamptz" },
    _gte: { __type: "timestamptz" },
    _in: { __type: "[timestamptz!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "timestamptz" },
    _lte: { __type: "timestamptz" },
    _neq: { __type: "timestamptz" },
    _nin: { __type: "[timestamptz!]" },
  },
  verse_of_the_day: {
    __typename: { __type: "String!" },
    date: { __type: "date" },
    id: { __type: "Int!" },
    verse_order: { __type: "Int" },
  },
  verse_of_the_day_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "verse_of_the_day_aggregate_fields" },
    nodes: { __type: "[verse_of_the_day!]!" },
  },
  verse_of_the_day_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "verse_of_the_day_avg_fields" },
    count: {
      __type: "Int!",
      __args: {
        columns: "[verse_of_the_day_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "verse_of_the_day_max_fields" },
    min: { __type: "verse_of_the_day_min_fields" },
    stddev: { __type: "verse_of_the_day_stddev_fields" },
    stddev_pop: { __type: "verse_of_the_day_stddev_pop_fields" },
    stddev_samp: { __type: "verse_of_the_day_stddev_samp_fields" },
    sum: { __type: "verse_of_the_day_sum_fields" },
    var_pop: { __type: "verse_of_the_day_var_pop_fields" },
    var_samp: { __type: "verse_of_the_day_var_samp_fields" },
    variance: { __type: "verse_of_the_day_variance_fields" },
  },
  verse_of_the_day_avg_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    verse_order: { __type: "Float" },
  },
  verse_of_the_day_bool_exp: {
    _and: { __type: "[verse_of_the_day_bool_exp!]" },
    _not: { __type: "verse_of_the_day_bool_exp" },
    _or: { __type: "[verse_of_the_day_bool_exp!]" },
    date: { __type: "date_comparison_exp" },
    id: { __type: "Int_comparison_exp" },
    verse_order: { __type: "Int_comparison_exp" },
  },
  verse_of_the_day_inc_input: {
    id: { __type: "Int" },
    verse_order: { __type: "Int" },
  },
  verse_of_the_day_insert_input: {
    date: { __type: "date" },
    id: { __type: "Int" },
    verse_order: { __type: "Int" },
  },
  verse_of_the_day_max_fields: {
    __typename: { __type: "String!" },
    date: { __type: "date" },
    id: { __type: "Int" },
    verse_order: { __type: "Int" },
  },
  verse_of_the_day_min_fields: {
    __typename: { __type: "String!" },
    date: { __type: "date" },
    id: { __type: "Int" },
    verse_order: { __type: "Int" },
  },
  verse_of_the_day_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[verse_of_the_day!]!" },
  },
  verse_of_the_day_on_conflict: {
    constraint: { __type: "verse_of_the_day_constraint!" },
    update_columns: { __type: "[verse_of_the_day_update_column!]!" },
    where: { __type: "verse_of_the_day_bool_exp" },
  },
  verse_of_the_day_order_by: {
    date: { __type: "order_by" },
    id: { __type: "order_by" },
    verse_order: { __type: "order_by" },
  },
  verse_of_the_day_pk_columns_input: { id: { __type: "Int!" } },
  verse_of_the_day_set_input: {
    date: { __type: "date" },
    id: { __type: "Int" },
    verse_order: { __type: "Int" },
  },
  verse_of_the_day_stddev_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    verse_order: { __type: "Float" },
  },
  verse_of_the_day_stddev_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    verse_order: { __type: "Float" },
  },
  verse_of_the_day_stddev_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    verse_order: { __type: "Float" },
  },
  verse_of_the_day_stream_cursor_input: {
    initial_value: { __type: "verse_of_the_day_stream_cursor_value_input!" },
    ordering: { __type: "cursor_ordering" },
  },
  verse_of_the_day_stream_cursor_value_input: {
    date: { __type: "date" },
    id: { __type: "Int" },
    verse_order: { __type: "Int" },
  },
  verse_of_the_day_sum_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Int" },
    verse_order: { __type: "Int" },
  },
  verse_of_the_day_updates: {
    _inc: { __type: "verse_of_the_day_inc_input" },
    _set: { __type: "verse_of_the_day_set_input" },
    where: { __type: "verse_of_the_day_bool_exp!" },
  },
  verse_of_the_day_var_pop_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    verse_order: { __type: "Float" },
  },
  verse_of_the_day_var_samp_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    verse_order: { __type: "Float" },
  },
  verse_of_the_day_variance_fields: {
    __typename: { __type: "String!" },
    id: { __type: "Float" },
    verse_order: { __type: "Float" },
  },
} as const;

/**
 * columns and relationships of "gita_authors"
 */
export interface gita_authors {
  __typename?: "gita_authors";
  /**
   * An array relationship
   */
  gita_commentaries: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => Array<gita_commentaries>;
  /**
   * An aggregate relationship
   */
  gita_commentaries_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => gita_commentaries_aggregate;
  /**
   * An array relationship
   */
  gita_translations: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_translations_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_translations_bool_exp>;
  }) => Array<gita_translations>;
  /**
   * An aggregate relationship
   */
  gita_translations_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_translations_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_translations_bool_exp>;
  }) => gita_translations_aggregate;
  id: ScalarsEnums["Int"];
  name?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregated selection of "gita_authors"
 */
export interface gita_authors_aggregate {
  __typename?: "gita_authors_aggregate";
  aggregate?: Maybe<gita_authors_aggregate_fields>;
  nodes: Array<gita_authors>;
}

/**
 * aggregate fields of "gita_authors"
 */
export interface gita_authors_aggregate_fields {
  __typename?: "gita_authors_aggregate_fields";
  avg?: Maybe<gita_authors_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<gita_authors_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => ScalarsEnums["Int"];
  max?: Maybe<gita_authors_max_fields>;
  min?: Maybe<gita_authors_min_fields>;
  stddev?: Maybe<gita_authors_stddev_fields>;
  stddev_pop?: Maybe<gita_authors_stddev_pop_fields>;
  stddev_samp?: Maybe<gita_authors_stddev_samp_fields>;
  sum?: Maybe<gita_authors_sum_fields>;
  var_pop?: Maybe<gita_authors_var_pop_fields>;
  var_samp?: Maybe<gita_authors_var_samp_fields>;
  variance?: Maybe<gita_authors_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface gita_authors_avg_fields {
  __typename?: "gita_authors_avg_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface gita_authors_max_fields {
  __typename?: "gita_authors_max_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
  name?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface gita_authors_min_fields {
  __typename?: "gita_authors_min_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
  name?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "gita_authors"
 */
export interface gita_authors_mutation_response {
  __typename?: "gita_authors_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data from the rows affected by the mutation
   */
  returning: Array<gita_authors>;
}

/**
 * aggregate stddev on columns
 */
export interface gita_authors_stddev_fields {
  __typename?: "gita_authors_stddev_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface gita_authors_stddev_pop_fields {
  __typename?: "gita_authors_stddev_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface gita_authors_stddev_samp_fields {
  __typename?: "gita_authors_stddev_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface gita_authors_sum_fields {
  __typename?: "gita_authors_sum_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface gita_authors_var_pop_fields {
  __typename?: "gita_authors_var_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface gita_authors_var_samp_fields {
  __typename?: "gita_authors_var_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface gita_authors_variance_fields {
  __typename?: "gita_authors_variance_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "gita_chapters"
 */
export interface gita_chapters {
  __typename?: "gita_chapters";
  chapter_number?: Maybe<ScalarsEnums["Int"]>;
  chapter_summary?: Maybe<ScalarsEnums["String"]>;
  chapter_summary_hindi?: Maybe<ScalarsEnums["String"]>;
  /**
   * An array relationship
   */
  gita_verses: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_verses_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_verses_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_verses_bool_exp>;
  }) => Array<gita_verses>;
  /**
   * An aggregate relationship
   */
  gita_verses_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_verses_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_verses_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_verses_bool_exp>;
  }) => gita_verses_aggregate;
  id: ScalarsEnums["Int"];
  name?: Maybe<ScalarsEnums["String"]>;
  name_meaning?: Maybe<ScalarsEnums["String"]>;
  name_translated?: Maybe<ScalarsEnums["String"]>;
  name_transliterated?: Maybe<ScalarsEnums["String"]>;
  slug?: Maybe<ScalarsEnums["String"]>;
  verses_count?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregated selection of "gita_chapters"
 */
export interface gita_chapters_aggregate {
  __typename?: "gita_chapters_aggregate";
  aggregate?: Maybe<gita_chapters_aggregate_fields>;
  nodes: Array<gita_chapters>;
}

/**
 * aggregate fields of "gita_chapters"
 */
export interface gita_chapters_aggregate_fields {
  __typename?: "gita_chapters_aggregate_fields";
  avg?: Maybe<gita_chapters_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<gita_chapters_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => ScalarsEnums["Int"];
  max?: Maybe<gita_chapters_max_fields>;
  min?: Maybe<gita_chapters_min_fields>;
  stddev?: Maybe<gita_chapters_stddev_fields>;
  stddev_pop?: Maybe<gita_chapters_stddev_pop_fields>;
  stddev_samp?: Maybe<gita_chapters_stddev_samp_fields>;
  sum?: Maybe<gita_chapters_sum_fields>;
  var_pop?: Maybe<gita_chapters_var_pop_fields>;
  var_samp?: Maybe<gita_chapters_var_samp_fields>;
  variance?: Maybe<gita_chapters_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface gita_chapters_avg_fields {
  __typename?: "gita_chapters_avg_fields";
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verses_count?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface gita_chapters_max_fields {
  __typename?: "gita_chapters_max_fields";
  chapter_number?: Maybe<ScalarsEnums["Int"]>;
  chapter_summary?: Maybe<ScalarsEnums["String"]>;
  chapter_summary_hindi?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  name_meaning?: Maybe<ScalarsEnums["String"]>;
  name_translated?: Maybe<ScalarsEnums["String"]>;
  name_transliterated?: Maybe<ScalarsEnums["String"]>;
  slug?: Maybe<ScalarsEnums["String"]>;
  verses_count?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate min on columns
 */
export interface gita_chapters_min_fields {
  __typename?: "gita_chapters_min_fields";
  chapter_number?: Maybe<ScalarsEnums["Int"]>;
  chapter_summary?: Maybe<ScalarsEnums["String"]>;
  chapter_summary_hindi?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  name_meaning?: Maybe<ScalarsEnums["String"]>;
  name_translated?: Maybe<ScalarsEnums["String"]>;
  name_transliterated?: Maybe<ScalarsEnums["String"]>;
  slug?: Maybe<ScalarsEnums["String"]>;
  verses_count?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * response of any mutation on the table "gita_chapters"
 */
export interface gita_chapters_mutation_response {
  __typename?: "gita_chapters_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data from the rows affected by the mutation
   */
  returning: Array<gita_chapters>;
}

/**
 * aggregate stddev on columns
 */
export interface gita_chapters_stddev_fields {
  __typename?: "gita_chapters_stddev_fields";
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verses_count?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface gita_chapters_stddev_pop_fields {
  __typename?: "gita_chapters_stddev_pop_fields";
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verses_count?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface gita_chapters_stddev_samp_fields {
  __typename?: "gita_chapters_stddev_samp_fields";
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verses_count?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface gita_chapters_sum_fields {
  __typename?: "gita_chapters_sum_fields";
  chapter_number?: Maybe<ScalarsEnums["Int"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  verses_count?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface gita_chapters_var_pop_fields {
  __typename?: "gita_chapters_var_pop_fields";
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verses_count?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface gita_chapters_var_samp_fields {
  __typename?: "gita_chapters_var_samp_fields";
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verses_count?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface gita_chapters_variance_fields {
  __typename?: "gita_chapters_variance_fields";
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verses_count?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "gita_commentaries"
 */
export interface gita_commentaries {
  __typename?: "gita_commentaries";
  author_id?: Maybe<ScalarsEnums["Int"]>;
  author_name?: Maybe<ScalarsEnums["String"]>;
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * An object relationship
   */
  gita_author?: Maybe<gita_authors>;
  /**
   * An object relationship
   */
  gita_language?: Maybe<gita_languages>;
  /**
   * An object relationship
   */
  gita_verse?: Maybe<gita_verses>;
  id: ScalarsEnums["Int"];
  language?: Maybe<ScalarsEnums["String"]>;
  language_id?: Maybe<ScalarsEnums["Int"]>;
  verse_id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregated selection of "gita_commentaries"
 */
export interface gita_commentaries_aggregate {
  __typename?: "gita_commentaries_aggregate";
  aggregate?: Maybe<gita_commentaries_aggregate_fields>;
  nodes: Array<gita_commentaries>;
}

/**
 * aggregate fields of "gita_commentaries"
 */
export interface gita_commentaries_aggregate_fields {
  __typename?: "gita_commentaries_aggregate_fields";
  avg?: Maybe<gita_commentaries_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<gita_commentaries_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => ScalarsEnums["Int"];
  max?: Maybe<gita_commentaries_max_fields>;
  min?: Maybe<gita_commentaries_min_fields>;
  stddev?: Maybe<gita_commentaries_stddev_fields>;
  stddev_pop?: Maybe<gita_commentaries_stddev_pop_fields>;
  stddev_samp?: Maybe<gita_commentaries_stddev_samp_fields>;
  sum?: Maybe<gita_commentaries_sum_fields>;
  var_pop?: Maybe<gita_commentaries_var_pop_fields>;
  var_samp?: Maybe<gita_commentaries_var_samp_fields>;
  variance?: Maybe<gita_commentaries_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface gita_commentaries_avg_fields {
  __typename?: "gita_commentaries_avg_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface gita_commentaries_max_fields {
  __typename?: "gita_commentaries_max_fields";
  author_id?: Maybe<ScalarsEnums["Int"]>;
  author_name?: Maybe<ScalarsEnums["String"]>;
  description?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  language?: Maybe<ScalarsEnums["String"]>;
  language_id?: Maybe<ScalarsEnums["Int"]>;
  verse_id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate min on columns
 */
export interface gita_commentaries_min_fields {
  __typename?: "gita_commentaries_min_fields";
  author_id?: Maybe<ScalarsEnums["Int"]>;
  author_name?: Maybe<ScalarsEnums["String"]>;
  description?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  language?: Maybe<ScalarsEnums["String"]>;
  language_id?: Maybe<ScalarsEnums["Int"]>;
  verse_id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * response of any mutation on the table "gita_commentaries"
 */
export interface gita_commentaries_mutation_response {
  __typename?: "gita_commentaries_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data from the rows affected by the mutation
   */
  returning: Array<gita_commentaries>;
}

/**
 * aggregate stddev on columns
 */
export interface gita_commentaries_stddev_fields {
  __typename?: "gita_commentaries_stddev_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface gita_commentaries_stddev_pop_fields {
  __typename?: "gita_commentaries_stddev_pop_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface gita_commentaries_stddev_samp_fields {
  __typename?: "gita_commentaries_stddev_samp_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface gita_commentaries_sum_fields {
  __typename?: "gita_commentaries_sum_fields";
  author_id?: Maybe<ScalarsEnums["Int"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  language_id?: Maybe<ScalarsEnums["Int"]>;
  verse_id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface gita_commentaries_var_pop_fields {
  __typename?: "gita_commentaries_var_pop_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface gita_commentaries_var_samp_fields {
  __typename?: "gita_commentaries_var_samp_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface gita_commentaries_variance_fields {
  __typename?: "gita_commentaries_variance_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "gita_languages"
 */
export interface gita_languages {
  __typename?: "gita_languages";
  /**
   * An array relationship
   */
  gita_commentaries: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => Array<gita_commentaries>;
  /**
   * An aggregate relationship
   */
  gita_commentaries_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => gita_commentaries_aggregate;
  /**
   * An array relationship
   */
  gita_translations: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_translations_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_translations_bool_exp>;
  }) => Array<gita_translations>;
  /**
   * An aggregate relationship
   */
  gita_translations_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_translations_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_translations_bool_exp>;
  }) => gita_translations_aggregate;
  id: ScalarsEnums["Int"];
  language?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregated selection of "gita_languages"
 */
export interface gita_languages_aggregate {
  __typename?: "gita_languages_aggregate";
  aggregate?: Maybe<gita_languages_aggregate_fields>;
  nodes: Array<gita_languages>;
}

/**
 * aggregate fields of "gita_languages"
 */
export interface gita_languages_aggregate_fields {
  __typename?: "gita_languages_aggregate_fields";
  avg?: Maybe<gita_languages_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<gita_languages_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => ScalarsEnums["Int"];
  max?: Maybe<gita_languages_max_fields>;
  min?: Maybe<gita_languages_min_fields>;
  stddev?: Maybe<gita_languages_stddev_fields>;
  stddev_pop?: Maybe<gita_languages_stddev_pop_fields>;
  stddev_samp?: Maybe<gita_languages_stddev_samp_fields>;
  sum?: Maybe<gita_languages_sum_fields>;
  var_pop?: Maybe<gita_languages_var_pop_fields>;
  var_samp?: Maybe<gita_languages_var_samp_fields>;
  variance?: Maybe<gita_languages_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface gita_languages_avg_fields {
  __typename?: "gita_languages_avg_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface gita_languages_max_fields {
  __typename?: "gita_languages_max_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
  language?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface gita_languages_min_fields {
  __typename?: "gita_languages_min_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
  language?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "gita_languages"
 */
export interface gita_languages_mutation_response {
  __typename?: "gita_languages_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data from the rows affected by the mutation
   */
  returning: Array<gita_languages>;
}

/**
 * aggregate stddev on columns
 */
export interface gita_languages_stddev_fields {
  __typename?: "gita_languages_stddev_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface gita_languages_stddev_pop_fields {
  __typename?: "gita_languages_stddev_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface gita_languages_stddev_samp_fields {
  __typename?: "gita_languages_stddev_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface gita_languages_sum_fields {
  __typename?: "gita_languages_sum_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface gita_languages_var_pop_fields {
  __typename?: "gita_languages_var_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface gita_languages_var_samp_fields {
  __typename?: "gita_languages_var_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface gita_languages_variance_fields {
  __typename?: "gita_languages_variance_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "gita_translations"
 */
export interface gita_translations {
  __typename?: "gita_translations";
  author_id?: Maybe<ScalarsEnums["Int"]>;
  author_name?: Maybe<ScalarsEnums["String"]>;
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * An object relationship
   */
  gita_author?: Maybe<gita_authors>;
  /**
   * An object relationship
   */
  gita_language?: Maybe<gita_languages>;
  /**
   * An object relationship
   */
  gita_verse?: Maybe<gita_verses>;
  id: ScalarsEnums["Int"];
  language?: Maybe<ScalarsEnums["String"]>;
  language_id?: Maybe<ScalarsEnums["Int"]>;
  verse_id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregated selection of "gita_translations"
 */
export interface gita_translations_aggregate {
  __typename?: "gita_translations_aggregate";
  aggregate?: Maybe<gita_translations_aggregate_fields>;
  nodes: Array<gita_translations>;
}

/**
 * aggregate fields of "gita_translations"
 */
export interface gita_translations_aggregate_fields {
  __typename?: "gita_translations_aggregate_fields";
  avg?: Maybe<gita_translations_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<gita_translations_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => ScalarsEnums["Int"];
  max?: Maybe<gita_translations_max_fields>;
  min?: Maybe<gita_translations_min_fields>;
  stddev?: Maybe<gita_translations_stddev_fields>;
  stddev_pop?: Maybe<gita_translations_stddev_pop_fields>;
  stddev_samp?: Maybe<gita_translations_stddev_samp_fields>;
  sum?: Maybe<gita_translations_sum_fields>;
  var_pop?: Maybe<gita_translations_var_pop_fields>;
  var_samp?: Maybe<gita_translations_var_samp_fields>;
  variance?: Maybe<gita_translations_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface gita_translations_avg_fields {
  __typename?: "gita_translations_avg_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface gita_translations_max_fields {
  __typename?: "gita_translations_max_fields";
  author_id?: Maybe<ScalarsEnums["Int"]>;
  author_name?: Maybe<ScalarsEnums["String"]>;
  description?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  language?: Maybe<ScalarsEnums["String"]>;
  language_id?: Maybe<ScalarsEnums["Int"]>;
  verse_id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate min on columns
 */
export interface gita_translations_min_fields {
  __typename?: "gita_translations_min_fields";
  author_id?: Maybe<ScalarsEnums["Int"]>;
  author_name?: Maybe<ScalarsEnums["String"]>;
  description?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  language?: Maybe<ScalarsEnums["String"]>;
  language_id?: Maybe<ScalarsEnums["Int"]>;
  verse_id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * response of any mutation on the table "gita_translations"
 */
export interface gita_translations_mutation_response {
  __typename?: "gita_translations_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data from the rows affected by the mutation
   */
  returning: Array<gita_translations>;
}

/**
 * aggregate stddev on columns
 */
export interface gita_translations_stddev_fields {
  __typename?: "gita_translations_stddev_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface gita_translations_stddev_pop_fields {
  __typename?: "gita_translations_stddev_pop_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface gita_translations_stddev_samp_fields {
  __typename?: "gita_translations_stddev_samp_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface gita_translations_sum_fields {
  __typename?: "gita_translations_sum_fields";
  author_id?: Maybe<ScalarsEnums["Int"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  language_id?: Maybe<ScalarsEnums["Int"]>;
  verse_id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface gita_translations_var_pop_fields {
  __typename?: "gita_translations_var_pop_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface gita_translations_var_samp_fields {
  __typename?: "gita_translations_var_samp_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface gita_translations_variance_fields {
  __typename?: "gita_translations_variance_fields";
  author_id?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  language_id?: Maybe<ScalarsEnums["Float"]>;
  verse_id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "gita_users"
 */
export interface gita_users {
  __typename?: "gita_users";
  api_key?: Maybe<ScalarsEnums["String"]>;
  app_description?: Maybe<ScalarsEnums["String"]>;
  app_link?: Maybe<ScalarsEnums["String"]>;
  app_name?: Maybe<ScalarsEnums["String"]>;
  created_on?: Maybe<ScalarsEnums["timestamptz"]>;
  email?: Maybe<ScalarsEnums["String"]>;
  full_name?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["Int"];
  is_active?: Maybe<ScalarsEnums["Boolean"]>;
}

/**
 * aggregated selection of "gita_users"
 */
export interface gita_users_aggregate {
  __typename?: "gita_users_aggregate";
  aggregate?: Maybe<gita_users_aggregate_fields>;
  nodes: Array<gita_users>;
}

/**
 * aggregate fields of "gita_users"
 */
export interface gita_users_aggregate_fields {
  __typename?: "gita_users_aggregate_fields";
  avg?: Maybe<gita_users_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<gita_users_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => ScalarsEnums["Int"];
  max?: Maybe<gita_users_max_fields>;
  min?: Maybe<gita_users_min_fields>;
  stddev?: Maybe<gita_users_stddev_fields>;
  stddev_pop?: Maybe<gita_users_stddev_pop_fields>;
  stddev_samp?: Maybe<gita_users_stddev_samp_fields>;
  sum?: Maybe<gita_users_sum_fields>;
  var_pop?: Maybe<gita_users_var_pop_fields>;
  var_samp?: Maybe<gita_users_var_samp_fields>;
  variance?: Maybe<gita_users_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface gita_users_avg_fields {
  __typename?: "gita_users_avg_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface gita_users_max_fields {
  __typename?: "gita_users_max_fields";
  api_key?: Maybe<ScalarsEnums["String"]>;
  app_description?: Maybe<ScalarsEnums["String"]>;
  app_link?: Maybe<ScalarsEnums["String"]>;
  app_name?: Maybe<ScalarsEnums["String"]>;
  created_on?: Maybe<ScalarsEnums["timestamptz"]>;
  email?: Maybe<ScalarsEnums["String"]>;
  full_name?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate min on columns
 */
export interface gita_users_min_fields {
  __typename?: "gita_users_min_fields";
  api_key?: Maybe<ScalarsEnums["String"]>;
  app_description?: Maybe<ScalarsEnums["String"]>;
  app_link?: Maybe<ScalarsEnums["String"]>;
  app_name?: Maybe<ScalarsEnums["String"]>;
  created_on?: Maybe<ScalarsEnums["timestamptz"]>;
  email?: Maybe<ScalarsEnums["String"]>;
  full_name?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * response of any mutation on the table "gita_users"
 */
export interface gita_users_mutation_response {
  __typename?: "gita_users_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data from the rows affected by the mutation
   */
  returning: Array<gita_users>;
}

/**
 * aggregate stddev on columns
 */
export interface gita_users_stddev_fields {
  __typename?: "gita_users_stddev_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface gita_users_stddev_pop_fields {
  __typename?: "gita_users_stddev_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface gita_users_stddev_samp_fields {
  __typename?: "gita_users_stddev_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface gita_users_sum_fields {
  __typename?: "gita_users_sum_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface gita_users_var_pop_fields {
  __typename?: "gita_users_var_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface gita_users_var_samp_fields {
  __typename?: "gita_users_var_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface gita_users_variance_fields {
  __typename?: "gita_users_variance_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "gita_verses"
 */
export interface gita_verses {
  __typename?: "gita_verses";
  chapter_id?: Maybe<ScalarsEnums["Int"]>;
  chapter_number?: Maybe<ScalarsEnums["Int"]>;
  /**
   * An object relationship
   */
  gita_chapter?: Maybe<gita_chapters>;
  /**
   * An array relationship
   */
  gita_commentaries: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => Array<gita_commentaries>;
  /**
   * An aggregate relationship
   */
  gita_commentaries_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => gita_commentaries_aggregate;
  /**
   * An array relationship
   */
  gita_translations: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_translations_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_translations_bool_exp>;
  }) => Array<gita_translations>;
  /**
   * An aggregate relationship
   */
  gita_translations_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    /**
     * limit the number of rows returned
     */
    limit?: Maybe<Scalars["Int"]>;
    /**
     * skip the first n rows. Use only with order_by
     */
    offset?: Maybe<Scalars["Int"]>;
    /**
     * sort the rows by one or more columns
     */
    order_by?: Maybe<Array<gita_translations_order_by>>;
    /**
     * filter the rows returned
     */
    where?: Maybe<gita_translations_bool_exp>;
  }) => gita_translations_aggregate;
  id: ScalarsEnums["Int"];
  slug?: Maybe<ScalarsEnums["String"]>;
  text?: Maybe<ScalarsEnums["String"]>;
  transliteration?: Maybe<ScalarsEnums["String"]>;
  verse_number?: Maybe<ScalarsEnums["Int"]>;
  word_meanings?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregated selection of "gita_verses"
 */
export interface gita_verses_aggregate {
  __typename?: "gita_verses_aggregate";
  aggregate?: Maybe<gita_verses_aggregate_fields>;
  nodes: Array<gita_verses>;
}

/**
 * aggregate fields of "gita_verses"
 */
export interface gita_verses_aggregate_fields {
  __typename?: "gita_verses_aggregate_fields";
  avg?: Maybe<gita_verses_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<gita_verses_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => ScalarsEnums["Int"];
  max?: Maybe<gita_verses_max_fields>;
  min?: Maybe<gita_verses_min_fields>;
  stddev?: Maybe<gita_verses_stddev_fields>;
  stddev_pop?: Maybe<gita_verses_stddev_pop_fields>;
  stddev_samp?: Maybe<gita_verses_stddev_samp_fields>;
  sum?: Maybe<gita_verses_sum_fields>;
  var_pop?: Maybe<gita_verses_var_pop_fields>;
  var_samp?: Maybe<gita_verses_var_samp_fields>;
  variance?: Maybe<gita_verses_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface gita_verses_avg_fields {
  __typename?: "gita_verses_avg_fields";
  chapter_id?: Maybe<ScalarsEnums["Float"]>;
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_number?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface gita_verses_max_fields {
  __typename?: "gita_verses_max_fields";
  chapter_id?: Maybe<ScalarsEnums["Int"]>;
  chapter_number?: Maybe<ScalarsEnums["Int"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  slug?: Maybe<ScalarsEnums["String"]>;
  text?: Maybe<ScalarsEnums["String"]>;
  transliteration?: Maybe<ScalarsEnums["String"]>;
  verse_number?: Maybe<ScalarsEnums["Int"]>;
  word_meanings?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface gita_verses_min_fields {
  __typename?: "gita_verses_min_fields";
  chapter_id?: Maybe<ScalarsEnums["Int"]>;
  chapter_number?: Maybe<ScalarsEnums["Int"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  slug?: Maybe<ScalarsEnums["String"]>;
  text?: Maybe<ScalarsEnums["String"]>;
  transliteration?: Maybe<ScalarsEnums["String"]>;
  verse_number?: Maybe<ScalarsEnums["Int"]>;
  word_meanings?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "gita_verses"
 */
export interface gita_verses_mutation_response {
  __typename?: "gita_verses_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data from the rows affected by the mutation
   */
  returning: Array<gita_verses>;
}

/**
 * aggregate stddev on columns
 */
export interface gita_verses_stddev_fields {
  __typename?: "gita_verses_stddev_fields";
  chapter_id?: Maybe<ScalarsEnums["Float"]>;
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_number?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface gita_verses_stddev_pop_fields {
  __typename?: "gita_verses_stddev_pop_fields";
  chapter_id?: Maybe<ScalarsEnums["Float"]>;
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_number?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface gita_verses_stddev_samp_fields {
  __typename?: "gita_verses_stddev_samp_fields";
  chapter_id?: Maybe<ScalarsEnums["Float"]>;
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_number?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface gita_verses_sum_fields {
  __typename?: "gita_verses_sum_fields";
  chapter_id?: Maybe<ScalarsEnums["Int"]>;
  chapter_number?: Maybe<ScalarsEnums["Int"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  verse_number?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface gita_verses_var_pop_fields {
  __typename?: "gita_verses_var_pop_fields";
  chapter_id?: Maybe<ScalarsEnums["Float"]>;
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_number?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface gita_verses_var_samp_fields {
  __typename?: "gita_verses_var_samp_fields";
  chapter_id?: Maybe<ScalarsEnums["Float"]>;
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_number?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface gita_verses_variance_fields {
  __typename?: "gita_verses_variance_fields";
  chapter_id?: Maybe<ScalarsEnums["Float"]>;
  chapter_number?: Maybe<ScalarsEnums["Float"]>;
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_number?: Maybe<ScalarsEnums["Float"]>;
}

export interface Mutation {
  __typename?: "Mutation";
  delete_gita_authors: (args: {
    where: gita_authors_bool_exp;
  }) => Maybe<gita_authors_mutation_response>;
  delete_gita_authors_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_authors>;
  delete_gita_chapters: (args: {
    where: gita_chapters_bool_exp;
  }) => Maybe<gita_chapters_mutation_response>;
  delete_gita_chapters_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_chapters>;
  delete_gita_commentaries: (args: {
    where: gita_commentaries_bool_exp;
  }) => Maybe<gita_commentaries_mutation_response>;
  delete_gita_commentaries_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_commentaries>;
  delete_gita_languages: (args: {
    where: gita_languages_bool_exp;
  }) => Maybe<gita_languages_mutation_response>;
  delete_gita_languages_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_languages>;
  delete_gita_translations: (args: {
    where: gita_translations_bool_exp;
  }) => Maybe<gita_translations_mutation_response>;
  delete_gita_translations_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_translations>;
  delete_gita_users: (args: {
    where: gita_users_bool_exp;
  }) => Maybe<gita_users_mutation_response>;
  delete_gita_users_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_users>;
  delete_gita_verses: (args: {
    where: gita_verses_bool_exp;
  }) => Maybe<gita_verses_mutation_response>;
  delete_gita_verses_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_verses>;
  delete_newsletter_subscriptions: (args: {
    where: newsletter_subscriptions_bool_exp;
  }) => Maybe<newsletter_subscriptions_mutation_response>;
  delete_newsletter_subscriptions_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<newsletter_subscriptions>;
  delete_verse_of_the_day: (args: {
    where: verse_of_the_day_bool_exp;
  }) => Maybe<verse_of_the_day_mutation_response>;
  delete_verse_of_the_day_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<verse_of_the_day>;
  insert_gita_authors: (args: {
    objects: Array<gita_authors_insert_input>;
    on_conflict?: Maybe<gita_authors_on_conflict>;
  }) => Maybe<gita_authors_mutation_response>;
  insert_gita_authors_one: (args: {
    object: gita_authors_insert_input;
    on_conflict?: Maybe<gita_authors_on_conflict>;
  }) => Maybe<gita_authors>;
  insert_gita_chapters: (args: {
    objects: Array<gita_chapters_insert_input>;
    on_conflict?: Maybe<gita_chapters_on_conflict>;
  }) => Maybe<gita_chapters_mutation_response>;
  insert_gita_chapters_one: (args: {
    object: gita_chapters_insert_input;
    on_conflict?: Maybe<gita_chapters_on_conflict>;
  }) => Maybe<gita_chapters>;
  insert_gita_commentaries: (args: {
    objects: Array<gita_commentaries_insert_input>;
    on_conflict?: Maybe<gita_commentaries_on_conflict>;
  }) => Maybe<gita_commentaries_mutation_response>;
  insert_gita_commentaries_one: (args: {
    object: gita_commentaries_insert_input;
    on_conflict?: Maybe<gita_commentaries_on_conflict>;
  }) => Maybe<gita_commentaries>;
  insert_gita_languages: (args: {
    objects: Array<gita_languages_insert_input>;
    on_conflict?: Maybe<gita_languages_on_conflict>;
  }) => Maybe<gita_languages_mutation_response>;
  insert_gita_languages_one: (args: {
    object: gita_languages_insert_input;
    on_conflict?: Maybe<gita_languages_on_conflict>;
  }) => Maybe<gita_languages>;
  insert_gita_translations: (args: {
    objects: Array<gita_translations_insert_input>;
    on_conflict?: Maybe<gita_translations_on_conflict>;
  }) => Maybe<gita_translations_mutation_response>;
  insert_gita_translations_one: (args: {
    object: gita_translations_insert_input;
    on_conflict?: Maybe<gita_translations_on_conflict>;
  }) => Maybe<gita_translations>;
  insert_gita_users: (args: {
    objects: Array<gita_users_insert_input>;
    on_conflict?: Maybe<gita_users_on_conflict>;
  }) => Maybe<gita_users_mutation_response>;
  insert_gita_users_one: (args: {
    object: gita_users_insert_input;
    on_conflict?: Maybe<gita_users_on_conflict>;
  }) => Maybe<gita_users>;
  insert_gita_verses: (args: {
    objects: Array<gita_verses_insert_input>;
    on_conflict?: Maybe<gita_verses_on_conflict>;
  }) => Maybe<gita_verses_mutation_response>;
  insert_gita_verses_one: (args: {
    object: gita_verses_insert_input;
    on_conflict?: Maybe<gita_verses_on_conflict>;
  }) => Maybe<gita_verses>;
  insert_newsletter_subscriptions: (args: {
    objects: Array<newsletter_subscriptions_insert_input>;
    on_conflict?: Maybe<newsletter_subscriptions_on_conflict>;
  }) => Maybe<newsletter_subscriptions_mutation_response>;
  insert_newsletter_subscriptions_one: (args: {
    object: newsletter_subscriptions_insert_input;
    on_conflict?: Maybe<newsletter_subscriptions_on_conflict>;
  }) => Maybe<newsletter_subscriptions>;
  insert_verse_of_the_day: (args: {
    objects: Array<verse_of_the_day_insert_input>;
    on_conflict?: Maybe<verse_of_the_day_on_conflict>;
  }) => Maybe<verse_of_the_day_mutation_response>;
  insert_verse_of_the_day_one: (args: {
    object: verse_of_the_day_insert_input;
    on_conflict?: Maybe<verse_of_the_day_on_conflict>;
  }) => Maybe<verse_of_the_day>;
  update_gita_authors: (args: {
    _inc?: Maybe<gita_authors_inc_input>;
    _set?: Maybe<gita_authors_set_input>;
    where: gita_authors_bool_exp;
  }) => Maybe<gita_authors_mutation_response>;
  update_gita_authors_by_pk: (args: {
    _inc?: Maybe<gita_authors_inc_input>;
    _set?: Maybe<gita_authors_set_input>;
    pk_columns: gita_authors_pk_columns_input;
  }) => Maybe<gita_authors>;
  update_gita_authors_many: (args: {
    updates: Array<gita_authors_updates>;
  }) => Maybe<Array<Maybe<gita_authors_mutation_response>>>;
  update_gita_chapters: (args: {
    _inc?: Maybe<gita_chapters_inc_input>;
    _set?: Maybe<gita_chapters_set_input>;
    where: gita_chapters_bool_exp;
  }) => Maybe<gita_chapters_mutation_response>;
  update_gita_chapters_by_pk: (args: {
    _inc?: Maybe<gita_chapters_inc_input>;
    _set?: Maybe<gita_chapters_set_input>;
    pk_columns: gita_chapters_pk_columns_input;
  }) => Maybe<gita_chapters>;
  update_gita_chapters_many: (args: {
    updates: Array<gita_chapters_updates>;
  }) => Maybe<Array<Maybe<gita_chapters_mutation_response>>>;
  update_gita_commentaries: (args: {
    _inc?: Maybe<gita_commentaries_inc_input>;
    _set?: Maybe<gita_commentaries_set_input>;
    where: gita_commentaries_bool_exp;
  }) => Maybe<gita_commentaries_mutation_response>;
  update_gita_commentaries_by_pk: (args: {
    _inc?: Maybe<gita_commentaries_inc_input>;
    _set?: Maybe<gita_commentaries_set_input>;
    pk_columns: gita_commentaries_pk_columns_input;
  }) => Maybe<gita_commentaries>;
  update_gita_commentaries_many: (args: {
    updates: Array<gita_commentaries_updates>;
  }) => Maybe<Array<Maybe<gita_commentaries_mutation_response>>>;
  update_gita_languages: (args: {
    _inc?: Maybe<gita_languages_inc_input>;
    _set?: Maybe<gita_languages_set_input>;
    where: gita_languages_bool_exp;
  }) => Maybe<gita_languages_mutation_response>;
  update_gita_languages_by_pk: (args: {
    _inc?: Maybe<gita_languages_inc_input>;
    _set?: Maybe<gita_languages_set_input>;
    pk_columns: gita_languages_pk_columns_input;
  }) => Maybe<gita_languages>;
  update_gita_languages_many: (args: {
    updates: Array<gita_languages_updates>;
  }) => Maybe<Array<Maybe<gita_languages_mutation_response>>>;
  update_gita_translations: (args: {
    _inc?: Maybe<gita_translations_inc_input>;
    _set?: Maybe<gita_translations_set_input>;
    where: gita_translations_bool_exp;
  }) => Maybe<gita_translations_mutation_response>;
  update_gita_translations_by_pk: (args: {
    _inc?: Maybe<gita_translations_inc_input>;
    _set?: Maybe<gita_translations_set_input>;
    pk_columns: gita_translations_pk_columns_input;
  }) => Maybe<gita_translations>;
  update_gita_translations_many: (args: {
    updates: Array<gita_translations_updates>;
  }) => Maybe<Array<Maybe<gita_translations_mutation_response>>>;
  update_gita_users: (args: {
    _inc?: Maybe<gita_users_inc_input>;
    _set?: Maybe<gita_users_set_input>;
    where: gita_users_bool_exp;
  }) => Maybe<gita_users_mutation_response>;
  update_gita_users_by_pk: (args: {
    _inc?: Maybe<gita_users_inc_input>;
    _set?: Maybe<gita_users_set_input>;
    pk_columns: gita_users_pk_columns_input;
  }) => Maybe<gita_users>;
  update_gita_users_many: (args: {
    updates: Array<gita_users_updates>;
  }) => Maybe<Array<Maybe<gita_users_mutation_response>>>;
  update_gita_verses: (args: {
    _inc?: Maybe<gita_verses_inc_input>;
    _set?: Maybe<gita_verses_set_input>;
    where: gita_verses_bool_exp;
  }) => Maybe<gita_verses_mutation_response>;
  update_gita_verses_by_pk: (args: {
    _inc?: Maybe<gita_verses_inc_input>;
    _set?: Maybe<gita_verses_set_input>;
    pk_columns: gita_verses_pk_columns_input;
  }) => Maybe<gita_verses>;
  update_gita_verses_many: (args: {
    updates: Array<gita_verses_updates>;
  }) => Maybe<Array<Maybe<gita_verses_mutation_response>>>;
  update_newsletter_subscriptions: (args: {
    _inc?: Maybe<newsletter_subscriptions_inc_input>;
    _set?: Maybe<newsletter_subscriptions_set_input>;
    where: newsletter_subscriptions_bool_exp;
  }) => Maybe<newsletter_subscriptions_mutation_response>;
  update_newsletter_subscriptions_by_pk: (args: {
    _inc?: Maybe<newsletter_subscriptions_inc_input>;
    _set?: Maybe<newsletter_subscriptions_set_input>;
    pk_columns: newsletter_subscriptions_pk_columns_input;
  }) => Maybe<newsletter_subscriptions>;
  update_newsletter_subscriptions_many: (args: {
    updates: Array<newsletter_subscriptions_updates>;
  }) => Maybe<Array<Maybe<newsletter_subscriptions_mutation_response>>>;
  update_verse_of_the_day: (args: {
    _inc?: Maybe<verse_of_the_day_inc_input>;
    _set?: Maybe<verse_of_the_day_set_input>;
    where: verse_of_the_day_bool_exp;
  }) => Maybe<verse_of_the_day_mutation_response>;
  update_verse_of_the_day_by_pk: (args: {
    _inc?: Maybe<verse_of_the_day_inc_input>;
    _set?: Maybe<verse_of_the_day_set_input>;
    pk_columns: verse_of_the_day_pk_columns_input;
  }) => Maybe<verse_of_the_day>;
  update_verse_of_the_day_many: (args: {
    updates: Array<verse_of_the_day_updates>;
  }) => Maybe<Array<Maybe<verse_of_the_day_mutation_response>>>;
}

/**
 * columns and relationships of "newsletter_subscriptions"
 */
export interface newsletter_subscriptions {
  __typename?: "newsletter_subscriptions";
  id: ScalarsEnums["Int"];
  user_email: ScalarsEnums["String"];
  user_name: ScalarsEnums["String"];
}

/**
 * aggregated selection of "newsletter_subscriptions"
 */
export interface newsletter_subscriptions_aggregate {
  __typename?: "newsletter_subscriptions_aggregate";
  aggregate?: Maybe<newsletter_subscriptions_aggregate_fields>;
  nodes: Array<newsletter_subscriptions>;
}

/**
 * aggregate fields of "newsletter_subscriptions"
 */
export interface newsletter_subscriptions_aggregate_fields {
  __typename?: "newsletter_subscriptions_aggregate_fields";
  avg?: Maybe<newsletter_subscriptions_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<newsletter_subscriptions_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => ScalarsEnums["Int"];
  max?: Maybe<newsletter_subscriptions_max_fields>;
  min?: Maybe<newsletter_subscriptions_min_fields>;
  stddev?: Maybe<newsletter_subscriptions_stddev_fields>;
  stddev_pop?: Maybe<newsletter_subscriptions_stddev_pop_fields>;
  stddev_samp?: Maybe<newsletter_subscriptions_stddev_samp_fields>;
  sum?: Maybe<newsletter_subscriptions_sum_fields>;
  var_pop?: Maybe<newsletter_subscriptions_var_pop_fields>;
  var_samp?: Maybe<newsletter_subscriptions_var_samp_fields>;
  variance?: Maybe<newsletter_subscriptions_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface newsletter_subscriptions_avg_fields {
  __typename?: "newsletter_subscriptions_avg_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface newsletter_subscriptions_max_fields {
  __typename?: "newsletter_subscriptions_max_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
  user_email?: Maybe<ScalarsEnums["String"]>;
  user_name?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface newsletter_subscriptions_min_fields {
  __typename?: "newsletter_subscriptions_min_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
  user_email?: Maybe<ScalarsEnums["String"]>;
  user_name?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "newsletter_subscriptions"
 */
export interface newsletter_subscriptions_mutation_response {
  __typename?: "newsletter_subscriptions_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data from the rows affected by the mutation
   */
  returning: Array<newsletter_subscriptions>;
}

/**
 * aggregate stddev on columns
 */
export interface newsletter_subscriptions_stddev_fields {
  __typename?: "newsletter_subscriptions_stddev_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface newsletter_subscriptions_stddev_pop_fields {
  __typename?: "newsletter_subscriptions_stddev_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface newsletter_subscriptions_stddev_samp_fields {
  __typename?: "newsletter_subscriptions_stddev_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface newsletter_subscriptions_sum_fields {
  __typename?: "newsletter_subscriptions_sum_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface newsletter_subscriptions_var_pop_fields {
  __typename?: "newsletter_subscriptions_var_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface newsletter_subscriptions_var_samp_fields {
  __typename?: "newsletter_subscriptions_var_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface newsletter_subscriptions_variance_fields {
  __typename?: "newsletter_subscriptions_variance_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
}

export interface Query {
  __typename?: "Query";
  gita_authors: (args?: {
    distinct_on?: Maybe<Array<gita_authors_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_authors_order_by>>;
    where?: Maybe<gita_authors_bool_exp>;
  }) => Array<gita_authors>;
  gita_authors_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_authors_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_authors_order_by>>;
    where?: Maybe<gita_authors_bool_exp>;
  }) => gita_authors_aggregate;
  gita_authors_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_authors>;
  gita_chapters: (args?: {
    distinct_on?: Maybe<Array<gita_chapters_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_chapters_order_by>>;
    where?: Maybe<gita_chapters_bool_exp>;
  }) => Array<gita_chapters>;
  gita_chapters_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_chapters_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_chapters_order_by>>;
    where?: Maybe<gita_chapters_bool_exp>;
  }) => gita_chapters_aggregate;
  gita_chapters_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_chapters>;
  gita_commentaries: (args?: {
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => Array<gita_commentaries>;
  gita_commentaries_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => gita_commentaries_aggregate;
  gita_commentaries_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_commentaries>;
  gita_languages: (args?: {
    distinct_on?: Maybe<Array<gita_languages_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_languages_order_by>>;
    where?: Maybe<gita_languages_bool_exp>;
  }) => Array<gita_languages>;
  gita_languages_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_languages_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_languages_order_by>>;
    where?: Maybe<gita_languages_bool_exp>;
  }) => gita_languages_aggregate;
  gita_languages_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_languages>;
  gita_translations: (args?: {
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_translations_order_by>>;
    where?: Maybe<gita_translations_bool_exp>;
  }) => Array<gita_translations>;
  gita_translations_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_translations_order_by>>;
    where?: Maybe<gita_translations_bool_exp>;
  }) => gita_translations_aggregate;
  gita_translations_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_translations>;
  gita_users: (args?: {
    distinct_on?: Maybe<Array<gita_users_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_users_order_by>>;
    where?: Maybe<gita_users_bool_exp>;
  }) => Array<gita_users>;
  gita_users_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_users_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_users_order_by>>;
    where?: Maybe<gita_users_bool_exp>;
  }) => gita_users_aggregate;
  gita_users_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_users>;
  gita_verses: (args?: {
    distinct_on?: Maybe<Array<gita_verses_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_verses_order_by>>;
    where?: Maybe<gita_verses_bool_exp>;
  }) => Array<gita_verses>;
  gita_verses_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_verses_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_verses_order_by>>;
    where?: Maybe<gita_verses_bool_exp>;
  }) => gita_verses_aggregate;
  gita_verses_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_verses>;
  newsletter_subscriptions: (args?: {
    distinct_on?: Maybe<Array<newsletter_subscriptions_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<newsletter_subscriptions_order_by>>;
    where?: Maybe<newsletter_subscriptions_bool_exp>;
  }) => Array<newsletter_subscriptions>;
  newsletter_subscriptions_aggregate: (args?: {
    distinct_on?: Maybe<Array<newsletter_subscriptions_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<newsletter_subscriptions_order_by>>;
    where?: Maybe<newsletter_subscriptions_bool_exp>;
  }) => newsletter_subscriptions_aggregate;
  newsletter_subscriptions_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<newsletter_subscriptions>;
  verse_of_the_day: (args?: {
    distinct_on?: Maybe<Array<verse_of_the_day_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<verse_of_the_day_order_by>>;
    where?: Maybe<verse_of_the_day_bool_exp>;
  }) => Array<verse_of_the_day>;
  verse_of_the_day_aggregate: (args?: {
    distinct_on?: Maybe<Array<verse_of_the_day_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<verse_of_the_day_order_by>>;
    where?: Maybe<verse_of_the_day_bool_exp>;
  }) => verse_of_the_day_aggregate;
  verse_of_the_day_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<verse_of_the_day>;
}

export interface Subscription {
  __typename?: "Subscription";
  gita_authors: (args?: {
    distinct_on?: Maybe<Array<gita_authors_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_authors_order_by>>;
    where?: Maybe<gita_authors_bool_exp>;
  }) => Array<gita_authors>;
  gita_authors_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_authors_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_authors_order_by>>;
    where?: Maybe<gita_authors_bool_exp>;
  }) => gita_authors_aggregate;
  gita_authors_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_authors>;
  gita_authors_stream: (args: {
    batch_size: Scalars["Int"];
    cursor: Array<Maybe<gita_authors_stream_cursor_input>>;
    where?: Maybe<gita_authors_bool_exp>;
  }) => Array<gita_authors>;
  gita_chapters: (args?: {
    distinct_on?: Maybe<Array<gita_chapters_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_chapters_order_by>>;
    where?: Maybe<gita_chapters_bool_exp>;
  }) => Array<gita_chapters>;
  gita_chapters_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_chapters_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_chapters_order_by>>;
    where?: Maybe<gita_chapters_bool_exp>;
  }) => gita_chapters_aggregate;
  gita_chapters_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_chapters>;
  gita_chapters_stream: (args: {
    batch_size: Scalars["Int"];
    cursor: Array<Maybe<gita_chapters_stream_cursor_input>>;
    where?: Maybe<gita_chapters_bool_exp>;
  }) => Array<gita_chapters>;
  gita_commentaries: (args?: {
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => Array<gita_commentaries>;
  gita_commentaries_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_commentaries_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_commentaries_order_by>>;
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => gita_commentaries_aggregate;
  gita_commentaries_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_commentaries>;
  gita_commentaries_stream: (args: {
    batch_size: Scalars["Int"];
    cursor: Array<Maybe<gita_commentaries_stream_cursor_input>>;
    where?: Maybe<gita_commentaries_bool_exp>;
  }) => Array<gita_commentaries>;
  gita_languages: (args?: {
    distinct_on?: Maybe<Array<gita_languages_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_languages_order_by>>;
    where?: Maybe<gita_languages_bool_exp>;
  }) => Array<gita_languages>;
  gita_languages_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_languages_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_languages_order_by>>;
    where?: Maybe<gita_languages_bool_exp>;
  }) => gita_languages_aggregate;
  gita_languages_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_languages>;
  gita_languages_stream: (args: {
    batch_size: Scalars["Int"];
    cursor: Array<Maybe<gita_languages_stream_cursor_input>>;
    where?: Maybe<gita_languages_bool_exp>;
  }) => Array<gita_languages>;
  gita_translations: (args?: {
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_translations_order_by>>;
    where?: Maybe<gita_translations_bool_exp>;
  }) => Array<gita_translations>;
  gita_translations_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_translations_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_translations_order_by>>;
    where?: Maybe<gita_translations_bool_exp>;
  }) => gita_translations_aggregate;
  gita_translations_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<gita_translations>;
  gita_translations_stream: (args: {
    batch_size: Scalars["Int"];
    cursor: Array<Maybe<gita_translations_stream_cursor_input>>;
    where?: Maybe<gita_translations_bool_exp>;
  }) => Array<gita_translations>;
  gita_users: (args?: {
    distinct_on?: Maybe<Array<gita_users_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_users_order_by>>;
    where?: Maybe<gita_users_bool_exp>;
  }) => Array<gita_users>;
  gita_users_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_users_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_users_order_by>>;
    where?: Maybe<gita_users_bool_exp>;
  }) => gita_users_aggregate;
  gita_users_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_users>;
  gita_users_stream: (args: {
    batch_size: Scalars["Int"];
    cursor: Array<Maybe<gita_users_stream_cursor_input>>;
    where?: Maybe<gita_users_bool_exp>;
  }) => Array<gita_users>;
  gita_verses: (args?: {
    distinct_on?: Maybe<Array<gita_verses_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_verses_order_by>>;
    where?: Maybe<gita_verses_bool_exp>;
  }) => Array<gita_verses>;
  gita_verses_aggregate: (args?: {
    distinct_on?: Maybe<Array<gita_verses_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<gita_verses_order_by>>;
    where?: Maybe<gita_verses_bool_exp>;
  }) => gita_verses_aggregate;
  gita_verses_by_pk: (args: { id: Scalars["Int"] }) => Maybe<gita_verses>;
  gita_verses_stream: (args: {
    batch_size: Scalars["Int"];
    cursor: Array<Maybe<gita_verses_stream_cursor_input>>;
    where?: Maybe<gita_verses_bool_exp>;
  }) => Array<gita_verses>;
  newsletter_subscriptions: (args?: {
    distinct_on?: Maybe<Array<newsletter_subscriptions_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<newsletter_subscriptions_order_by>>;
    where?: Maybe<newsletter_subscriptions_bool_exp>;
  }) => Array<newsletter_subscriptions>;
  newsletter_subscriptions_aggregate: (args?: {
    distinct_on?: Maybe<Array<newsletter_subscriptions_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<newsletter_subscriptions_order_by>>;
    where?: Maybe<newsletter_subscriptions_bool_exp>;
  }) => newsletter_subscriptions_aggregate;
  newsletter_subscriptions_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<newsletter_subscriptions>;
  newsletter_subscriptions_stream: (args: {
    batch_size: Scalars["Int"];
    cursor: Array<Maybe<newsletter_subscriptions_stream_cursor_input>>;
    where?: Maybe<newsletter_subscriptions_bool_exp>;
  }) => Array<newsletter_subscriptions>;
  verse_of_the_day: (args?: {
    distinct_on?: Maybe<Array<verse_of_the_day_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<verse_of_the_day_order_by>>;
    where?: Maybe<verse_of_the_day_bool_exp>;
  }) => Array<verse_of_the_day>;
  verse_of_the_day_aggregate: (args?: {
    distinct_on?: Maybe<Array<verse_of_the_day_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<verse_of_the_day_order_by>>;
    where?: Maybe<verse_of_the_day_bool_exp>;
  }) => verse_of_the_day_aggregate;
  verse_of_the_day_by_pk: (args: {
    id: Scalars["Int"];
  }) => Maybe<verse_of_the_day>;
  verse_of_the_day_stream: (args: {
    batch_size: Scalars["Int"];
    cursor: Array<Maybe<verse_of_the_day_stream_cursor_input>>;
    where?: Maybe<verse_of_the_day_bool_exp>;
  }) => Array<verse_of_the_day>;
}

/**
 * columns and relationships of "verse_of_the_day"
 */
export interface verse_of_the_day {
  __typename?: "verse_of_the_day";
  date?: Maybe<ScalarsEnums["date"]>;
  id: ScalarsEnums["Int"];
  verse_order?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregated selection of "verse_of_the_day"
 */
export interface verse_of_the_day_aggregate {
  __typename?: "verse_of_the_day_aggregate";
  aggregate?: Maybe<verse_of_the_day_aggregate_fields>;
  nodes: Array<verse_of_the_day>;
}

/**
 * aggregate fields of "verse_of_the_day"
 */
export interface verse_of_the_day_aggregate_fields {
  __typename?: "verse_of_the_day_aggregate_fields";
  avg?: Maybe<verse_of_the_day_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<verse_of_the_day_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => ScalarsEnums["Int"];
  max?: Maybe<verse_of_the_day_max_fields>;
  min?: Maybe<verse_of_the_day_min_fields>;
  stddev?: Maybe<verse_of_the_day_stddev_fields>;
  stddev_pop?: Maybe<verse_of_the_day_stddev_pop_fields>;
  stddev_samp?: Maybe<verse_of_the_day_stddev_samp_fields>;
  sum?: Maybe<verse_of_the_day_sum_fields>;
  var_pop?: Maybe<verse_of_the_day_var_pop_fields>;
  var_samp?: Maybe<verse_of_the_day_var_samp_fields>;
  variance?: Maybe<verse_of_the_day_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface verse_of_the_day_avg_fields {
  __typename?: "verse_of_the_day_avg_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_order?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface verse_of_the_day_max_fields {
  __typename?: "verse_of_the_day_max_fields";
  date?: Maybe<ScalarsEnums["date"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  verse_order?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate min on columns
 */
export interface verse_of_the_day_min_fields {
  __typename?: "verse_of_the_day_min_fields";
  date?: Maybe<ScalarsEnums["date"]>;
  id?: Maybe<ScalarsEnums["Int"]>;
  verse_order?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * response of any mutation on the table "verse_of_the_day"
 */
export interface verse_of_the_day_mutation_response {
  __typename?: "verse_of_the_day_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data from the rows affected by the mutation
   */
  returning: Array<verse_of_the_day>;
}

/**
 * aggregate stddev on columns
 */
export interface verse_of_the_day_stddev_fields {
  __typename?: "verse_of_the_day_stddev_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_order?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface verse_of_the_day_stddev_pop_fields {
  __typename?: "verse_of_the_day_stddev_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_order?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface verse_of_the_day_stddev_samp_fields {
  __typename?: "verse_of_the_day_stddev_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_order?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface verse_of_the_day_sum_fields {
  __typename?: "verse_of_the_day_sum_fields";
  id?: Maybe<ScalarsEnums["Int"]>;
  verse_order?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface verse_of_the_day_var_pop_fields {
  __typename?: "verse_of_the_day_var_pop_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_order?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface verse_of_the_day_var_samp_fields {
  __typename?: "verse_of_the_day_var_samp_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_order?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface verse_of_the_day_variance_fields {
  __typename?: "verse_of_the_day_variance_fields";
  id?: Maybe<ScalarsEnums["Float"]>;
  verse_order?: Maybe<ScalarsEnums["Float"]>;
}

export interface SchemaObjectTypes {
  Mutation: Mutation;
  Query: Query;
  Subscription: Subscription;
  gita_authors: gita_authors;
  gita_authors_aggregate: gita_authors_aggregate;
  gita_authors_aggregate_fields: gita_authors_aggregate_fields;
  gita_authors_avg_fields: gita_authors_avg_fields;
  gita_authors_max_fields: gita_authors_max_fields;
  gita_authors_min_fields: gita_authors_min_fields;
  gita_authors_mutation_response: gita_authors_mutation_response;
  gita_authors_stddev_fields: gita_authors_stddev_fields;
  gita_authors_stddev_pop_fields: gita_authors_stddev_pop_fields;
  gita_authors_stddev_samp_fields: gita_authors_stddev_samp_fields;
  gita_authors_sum_fields: gita_authors_sum_fields;
  gita_authors_var_pop_fields: gita_authors_var_pop_fields;
  gita_authors_var_samp_fields: gita_authors_var_samp_fields;
  gita_authors_variance_fields: gita_authors_variance_fields;
  gita_chapters: gita_chapters;
  gita_chapters_aggregate: gita_chapters_aggregate;
  gita_chapters_aggregate_fields: gita_chapters_aggregate_fields;
  gita_chapters_avg_fields: gita_chapters_avg_fields;
  gita_chapters_max_fields: gita_chapters_max_fields;
  gita_chapters_min_fields: gita_chapters_min_fields;
  gita_chapters_mutation_response: gita_chapters_mutation_response;
  gita_chapters_stddev_fields: gita_chapters_stddev_fields;
  gita_chapters_stddev_pop_fields: gita_chapters_stddev_pop_fields;
  gita_chapters_stddev_samp_fields: gita_chapters_stddev_samp_fields;
  gita_chapters_sum_fields: gita_chapters_sum_fields;
  gita_chapters_var_pop_fields: gita_chapters_var_pop_fields;
  gita_chapters_var_samp_fields: gita_chapters_var_samp_fields;
  gita_chapters_variance_fields: gita_chapters_variance_fields;
  gita_commentaries: gita_commentaries;
  gita_commentaries_aggregate: gita_commentaries_aggregate;
  gita_commentaries_aggregate_fields: gita_commentaries_aggregate_fields;
  gita_commentaries_avg_fields: gita_commentaries_avg_fields;
  gita_commentaries_max_fields: gita_commentaries_max_fields;
  gita_commentaries_min_fields: gita_commentaries_min_fields;
  gita_commentaries_mutation_response: gita_commentaries_mutation_response;
  gita_commentaries_stddev_fields: gita_commentaries_stddev_fields;
  gita_commentaries_stddev_pop_fields: gita_commentaries_stddev_pop_fields;
  gita_commentaries_stddev_samp_fields: gita_commentaries_stddev_samp_fields;
  gita_commentaries_sum_fields: gita_commentaries_sum_fields;
  gita_commentaries_var_pop_fields: gita_commentaries_var_pop_fields;
  gita_commentaries_var_samp_fields: gita_commentaries_var_samp_fields;
  gita_commentaries_variance_fields: gita_commentaries_variance_fields;
  gita_languages: gita_languages;
  gita_languages_aggregate: gita_languages_aggregate;
  gita_languages_aggregate_fields: gita_languages_aggregate_fields;
  gita_languages_avg_fields: gita_languages_avg_fields;
  gita_languages_max_fields: gita_languages_max_fields;
  gita_languages_min_fields: gita_languages_min_fields;
  gita_languages_mutation_response: gita_languages_mutation_response;
  gita_languages_stddev_fields: gita_languages_stddev_fields;
  gita_languages_stddev_pop_fields: gita_languages_stddev_pop_fields;
  gita_languages_stddev_samp_fields: gita_languages_stddev_samp_fields;
  gita_languages_sum_fields: gita_languages_sum_fields;
  gita_languages_var_pop_fields: gita_languages_var_pop_fields;
  gita_languages_var_samp_fields: gita_languages_var_samp_fields;
  gita_languages_variance_fields: gita_languages_variance_fields;
  gita_translations: gita_translations;
  gita_translations_aggregate: gita_translations_aggregate;
  gita_translations_aggregate_fields: gita_translations_aggregate_fields;
  gita_translations_avg_fields: gita_translations_avg_fields;
  gita_translations_max_fields: gita_translations_max_fields;
  gita_translations_min_fields: gita_translations_min_fields;
  gita_translations_mutation_response: gita_translations_mutation_response;
  gita_translations_stddev_fields: gita_translations_stddev_fields;
  gita_translations_stddev_pop_fields: gita_translations_stddev_pop_fields;
  gita_translations_stddev_samp_fields: gita_translations_stddev_samp_fields;
  gita_translations_sum_fields: gita_translations_sum_fields;
  gita_translations_var_pop_fields: gita_translations_var_pop_fields;
  gita_translations_var_samp_fields: gita_translations_var_samp_fields;
  gita_translations_variance_fields: gita_translations_variance_fields;
  gita_users: gita_users;
  gita_users_aggregate: gita_users_aggregate;
  gita_users_aggregate_fields: gita_users_aggregate_fields;
  gita_users_avg_fields: gita_users_avg_fields;
  gita_users_max_fields: gita_users_max_fields;
  gita_users_min_fields: gita_users_min_fields;
  gita_users_mutation_response: gita_users_mutation_response;
  gita_users_stddev_fields: gita_users_stddev_fields;
  gita_users_stddev_pop_fields: gita_users_stddev_pop_fields;
  gita_users_stddev_samp_fields: gita_users_stddev_samp_fields;
  gita_users_sum_fields: gita_users_sum_fields;
  gita_users_var_pop_fields: gita_users_var_pop_fields;
  gita_users_var_samp_fields: gita_users_var_samp_fields;
  gita_users_variance_fields: gita_users_variance_fields;
  gita_verses: gita_verses;
  gita_verses_aggregate: gita_verses_aggregate;
  gita_verses_aggregate_fields: gita_verses_aggregate_fields;
  gita_verses_avg_fields: gita_verses_avg_fields;
  gita_verses_max_fields: gita_verses_max_fields;
  gita_verses_min_fields: gita_verses_min_fields;
  gita_verses_mutation_response: gita_verses_mutation_response;
  gita_verses_stddev_fields: gita_verses_stddev_fields;
  gita_verses_stddev_pop_fields: gita_verses_stddev_pop_fields;
  gita_verses_stddev_samp_fields: gita_verses_stddev_samp_fields;
  gita_verses_sum_fields: gita_verses_sum_fields;
  gita_verses_var_pop_fields: gita_verses_var_pop_fields;
  gita_verses_var_samp_fields: gita_verses_var_samp_fields;
  gita_verses_variance_fields: gita_verses_variance_fields;
  newsletter_subscriptions: newsletter_subscriptions;
  newsletter_subscriptions_aggregate: newsletter_subscriptions_aggregate;
  newsletter_subscriptions_aggregate_fields: newsletter_subscriptions_aggregate_fields;
  newsletter_subscriptions_avg_fields: newsletter_subscriptions_avg_fields;
  newsletter_subscriptions_max_fields: newsletter_subscriptions_max_fields;
  newsletter_subscriptions_min_fields: newsletter_subscriptions_min_fields;
  newsletter_subscriptions_mutation_response: newsletter_subscriptions_mutation_response;
  newsletter_subscriptions_stddev_fields: newsletter_subscriptions_stddev_fields;
  newsletter_subscriptions_stddev_pop_fields: newsletter_subscriptions_stddev_pop_fields;
  newsletter_subscriptions_stddev_samp_fields: newsletter_subscriptions_stddev_samp_fields;
  newsletter_subscriptions_sum_fields: newsletter_subscriptions_sum_fields;
  newsletter_subscriptions_var_pop_fields: newsletter_subscriptions_var_pop_fields;
  newsletter_subscriptions_var_samp_fields: newsletter_subscriptions_var_samp_fields;
  newsletter_subscriptions_variance_fields: newsletter_subscriptions_variance_fields;
  verse_of_the_day: verse_of_the_day;
  verse_of_the_day_aggregate: verse_of_the_day_aggregate;
  verse_of_the_day_aggregate_fields: verse_of_the_day_aggregate_fields;
  verse_of_the_day_avg_fields: verse_of_the_day_avg_fields;
  verse_of_the_day_max_fields: verse_of_the_day_max_fields;
  verse_of_the_day_min_fields: verse_of_the_day_min_fields;
  verse_of_the_day_mutation_response: verse_of_the_day_mutation_response;
  verse_of_the_day_stddev_fields: verse_of_the_day_stddev_fields;
  verse_of_the_day_stddev_pop_fields: verse_of_the_day_stddev_pop_fields;
  verse_of_the_day_stddev_samp_fields: verse_of_the_day_stddev_samp_fields;
  verse_of_the_day_sum_fields: verse_of_the_day_sum_fields;
  verse_of_the_day_var_pop_fields: verse_of_the_day_var_pop_fields;
  verse_of_the_day_var_samp_fields: verse_of_the_day_var_samp_fields;
  verse_of_the_day_variance_fields: verse_of_the_day_variance_fields;
}
export type SchemaObjectTypesNames =
  | "Mutation"
  | "Query"
  | "Subscription"
  | "gita_authors"
  | "gita_authors_aggregate"
  | "gita_authors_aggregate_fields"
  | "gita_authors_avg_fields"
  | "gita_authors_max_fields"
  | "gita_authors_min_fields"
  | "gita_authors_mutation_response"
  | "gita_authors_stddev_fields"
  | "gita_authors_stddev_pop_fields"
  | "gita_authors_stddev_samp_fields"
  | "gita_authors_sum_fields"
  | "gita_authors_var_pop_fields"
  | "gita_authors_var_samp_fields"
  | "gita_authors_variance_fields"
  | "gita_chapters"
  | "gita_chapters_aggregate"
  | "gita_chapters_aggregate_fields"
  | "gita_chapters_avg_fields"
  | "gita_chapters_max_fields"
  | "gita_chapters_min_fields"
  | "gita_chapters_mutation_response"
  | "gita_chapters_stddev_fields"
  | "gita_chapters_stddev_pop_fields"
  | "gita_chapters_stddev_samp_fields"
  | "gita_chapters_sum_fields"
  | "gita_chapters_var_pop_fields"
  | "gita_chapters_var_samp_fields"
  | "gita_chapters_variance_fields"
  | "gita_commentaries"
  | "gita_commentaries_aggregate"
  | "gita_commentaries_aggregate_fields"
  | "gita_commentaries_avg_fields"
  | "gita_commentaries_max_fields"
  | "gita_commentaries_min_fields"
  | "gita_commentaries_mutation_response"
  | "gita_commentaries_stddev_fields"
  | "gita_commentaries_stddev_pop_fields"
  | "gita_commentaries_stddev_samp_fields"
  | "gita_commentaries_sum_fields"
  | "gita_commentaries_var_pop_fields"
  | "gita_commentaries_var_samp_fields"
  | "gita_commentaries_variance_fields"
  | "gita_languages"
  | "gita_languages_aggregate"
  | "gita_languages_aggregate_fields"
  | "gita_languages_avg_fields"
  | "gita_languages_max_fields"
  | "gita_languages_min_fields"
  | "gita_languages_mutation_response"
  | "gita_languages_stddev_fields"
  | "gita_languages_stddev_pop_fields"
  | "gita_languages_stddev_samp_fields"
  | "gita_languages_sum_fields"
  | "gita_languages_var_pop_fields"
  | "gita_languages_var_samp_fields"
  | "gita_languages_variance_fields"
  | "gita_translations"
  | "gita_translations_aggregate"
  | "gita_translations_aggregate_fields"
  | "gita_translations_avg_fields"
  | "gita_translations_max_fields"
  | "gita_translations_min_fields"
  | "gita_translations_mutation_response"
  | "gita_translations_stddev_fields"
  | "gita_translations_stddev_pop_fields"
  | "gita_translations_stddev_samp_fields"
  | "gita_translations_sum_fields"
  | "gita_translations_var_pop_fields"
  | "gita_translations_var_samp_fields"
  | "gita_translations_variance_fields"
  | "gita_users"
  | "gita_users_aggregate"
  | "gita_users_aggregate_fields"
  | "gita_users_avg_fields"
  | "gita_users_max_fields"
  | "gita_users_min_fields"
  | "gita_users_mutation_response"
  | "gita_users_stddev_fields"
  | "gita_users_stddev_pop_fields"
  | "gita_users_stddev_samp_fields"
  | "gita_users_sum_fields"
  | "gita_users_var_pop_fields"
  | "gita_users_var_samp_fields"
  | "gita_users_variance_fields"
  | "gita_verses"
  | "gita_verses_aggregate"
  | "gita_verses_aggregate_fields"
  | "gita_verses_avg_fields"
  | "gita_verses_max_fields"
  | "gita_verses_min_fields"
  | "gita_verses_mutation_response"
  | "gita_verses_stddev_fields"
  | "gita_verses_stddev_pop_fields"
  | "gita_verses_stddev_samp_fields"
  | "gita_verses_sum_fields"
  | "gita_verses_var_pop_fields"
  | "gita_verses_var_samp_fields"
  | "gita_verses_variance_fields"
  | "newsletter_subscriptions"
  | "newsletter_subscriptions_aggregate"
  | "newsletter_subscriptions_aggregate_fields"
  | "newsletter_subscriptions_avg_fields"
  | "newsletter_subscriptions_max_fields"
  | "newsletter_subscriptions_min_fields"
  | "newsletter_subscriptions_mutation_response"
  | "newsletter_subscriptions_stddev_fields"
  | "newsletter_subscriptions_stddev_pop_fields"
  | "newsletter_subscriptions_stddev_samp_fields"
  | "newsletter_subscriptions_sum_fields"
  | "newsletter_subscriptions_var_pop_fields"
  | "newsletter_subscriptions_var_samp_fields"
  | "newsletter_subscriptions_variance_fields"
  | "verse_of_the_day"
  | "verse_of_the_day_aggregate"
  | "verse_of_the_day_aggregate_fields"
  | "verse_of_the_day_avg_fields"
  | "verse_of_the_day_max_fields"
  | "verse_of_the_day_min_fields"
  | "verse_of_the_day_mutation_response"
  | "verse_of_the_day_stddev_fields"
  | "verse_of_the_day_stddev_pop_fields"
  | "verse_of_the_day_stddev_samp_fields"
  | "verse_of_the_day_sum_fields"
  | "verse_of_the_day_var_pop_fields"
  | "verse_of_the_day_var_samp_fields"
  | "verse_of_the_day_variance_fields";

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {
  cursor_ordering: cursor_ordering | undefined;
  gita_authors_constraint: gita_authors_constraint | undefined;
  gita_authors_select_column: gita_authors_select_column | undefined;
  gita_authors_update_column: gita_authors_update_column | undefined;
  gita_chapters_constraint: gita_chapters_constraint | undefined;
  gita_chapters_select_column: gita_chapters_select_column | undefined;
  gita_chapters_update_column: gita_chapters_update_column | undefined;
  gita_commentaries_constraint: gita_commentaries_constraint | undefined;
  gita_commentaries_select_column: gita_commentaries_select_column | undefined;
  gita_commentaries_update_column: gita_commentaries_update_column | undefined;
  gita_languages_constraint: gita_languages_constraint | undefined;
  gita_languages_select_column: gita_languages_select_column | undefined;
  gita_languages_update_column: gita_languages_update_column | undefined;
  gita_translations_constraint: gita_translations_constraint | undefined;
  gita_translations_select_column: gita_translations_select_column | undefined;
  gita_translations_update_column: gita_translations_update_column | undefined;
  gita_users_constraint: gita_users_constraint | undefined;
  gita_users_select_column: gita_users_select_column | undefined;
  gita_users_update_column: gita_users_update_column | undefined;
  gita_verses_constraint: gita_verses_constraint | undefined;
  gita_verses_select_column: gita_verses_select_column | undefined;
  gita_verses_update_column: gita_verses_update_column | undefined;
  newsletter_subscriptions_constraint:
    | newsletter_subscriptions_constraint
    | undefined;
  newsletter_subscriptions_select_column:
    | newsletter_subscriptions_select_column
    | undefined;
  newsletter_subscriptions_update_column:
    | newsletter_subscriptions_update_column
    | undefined;
  order_by: order_by | undefined;
  verse_of_the_day_constraint: verse_of_the_day_constraint | undefined;
  verse_of_the_day_select_column: verse_of_the_day_select_column | undefined;
  verse_of_the_day_update_column: verse_of_the_day_update_column | undefined;
}
