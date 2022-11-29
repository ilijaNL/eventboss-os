import { DB } from '@/__generated__/db';
import {
  CompiledQuery,
  DeleteQueryBuilder,
  DummyDriver,
  InsertQueryBuilder,
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from 'kysely';

export interface TypedCompiledQuery<Result> extends CompiledQuery {
  __result?: Result;
}

const sqlBuilder = new Kysely<DB>({
  dialect: {
    createAdapter: () => new PostgresAdapter(),
    createDriver: () => new DummyDriver(),
    createIntrospector: (db) => new PostgresIntrospector(db),
    createQueryCompiler: () => new PostgresQueryCompiler(),
  },
});

export function compileTyped<O>(
  q:
    | SelectQueryBuilder<any, any, O>
    | DeleteQueryBuilder<any, any, O>
    | UpdateQueryBuilder<any, any, any, O>
    | InsertQueryBuilder<any, any, O>
): TypedCompiledQuery<O> {
  return q.compile();
}

export default sqlBuilder;
