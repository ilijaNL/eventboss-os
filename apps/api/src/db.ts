import { CompiledQuery, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from './__generated__/db';
import pgp from 'pg-promise';

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION!,
  max: 15,
});

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: pool,
  }),
});

const pgpInstance = pgp({});

export async function execute(queries: (CompiledQuery | CompiledQuery[])[]) {
  console.time('concat query');
  const sql = pgpInstance.helpers.concat(queries.flat().map((q) => ({ query: q.sql, values: q.parameters })));
  console.timeEnd('concat query');
  await pool.query(sql);
}

export default db;
