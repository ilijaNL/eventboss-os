import { CompiledQuery, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from './__generated__/db';
import pgp from 'pg-promise';
import { ActionResult, Event, Executor, OutputEvent, Effects } from './utils/ddd';

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

export const createExecutor = <TContext>(context: TContext): Executor<CompiledQuery, TContext> => {
  const _commands: Array<CompiledQuery> = [];
  const _events: Array<OutputEvent<Event>> = [];

  function add<TEvent extends Event>(props: {
    result: ActionResult<TEvent>;
    entity: { id: string; version: number };
    effects: Effects<TEvent, CompiledQuery[], TContext>;
  }) {
    const events = props.result.events;
    const outputEvents: Array<OutputEvent<TEvent>> = events.map((e, idx) => ({
      _agg_id: props.entity.id,
      _version: props.entity.version + 1 + idx,
      ...e,
    }));

    const cmds = outputEvents.reduce((agg, curr) => {
      const name = curr.event_name as TEvent['event_name'];
      const mapper = props.effects[name];
      return [...agg, ...mapper(curr as any, context)];
    }, [] as Array<CompiledQuery>);

    _events.push(...outputEvents);
    _commands.push(...cmds);

    const lastEvent = outputEvents[outputEvents.length - 1];

    return lastEvent ? { id: lastEvent._agg_id, version: lastEvent._version } : props.entity;
  }

  /**
   * Commit the stacked commands in order
   */
  async function commit(_?: TContext) {
    await execute(_commands);
    _commands.length = 0;
  }

  return { add, commit };
};

export default db;
