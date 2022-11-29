import { Static, TSchema } from '@sinclair/typebox';

export interface Event<Name = string, Data = {}> {
  event_name: Name;
  data: Data;
}

interface EventsSpecification {
  [name: string]: TSchema;
}

export type EventsFactory<T extends EventsSpecification> = {
  [P in keyof T]: EventFactory<P, T[P]>;
};

export interface EventFactory<TName, T extends TSchema> {
  (payload: Static<T>): Event<TName, Static<T>>;
  schema: T;
  event_name: TName;
}

export type OutputEvent<TEvent> = TEvent & { _agg_id: string; _version: number };

export type InferEvents<T extends EventsFactory<any>> = {
  [P in keyof T]: ReturnType<T[P]>;
}[keyof T];

export type Effects<T extends Event, R, Context = unknown> = {
  [P in T['event_name']]: (event: T extends { event_name: P } ? OutputEvent<T> : never, context: Context) => R;
};

export const createEventsFactory = <T extends EventsSpecification>(definitions: T): EventsFactory<T> => {
  return (Object.keys(definitions) as Array<keyof T>).reduce((agg, event_name) => {
    function factory<TData>(input: TData): Event<keyof T, TData> {
      // todo create validation
      return {
        event_name: event_name,
        data: input,
      };
    }

    factory.event_name = event_name;
    factory.schema = definitions[event_name];

    agg[event_name] = factory;
    return agg;
  }, {} as EventsFactory<T>);
};

export interface ActionDefinition<TEvent extends Event<string, any>, T, TState> {
  input?: T;
  resolve(state: TState, input: T extends TSchema ? Static<T> : undefined): ReadonlyArray<TEvent>;
}

export function toCommands<T extends Event, R, C = {}>(mapper: Effects<T, R, C>) {
  function mapping(events: Array<OutputEvent<T>>, ctx: C): Array<R> {
    return events.map((event) => {
      const name = event.event_name as T['event_name'];
      const convert = mapper[name];
      return convert(event as any, ctx);
    });
  }

  return mapping;
}

export interface ActionResult<TEvent extends Event<string, any>> {
  events: ReadonlyArray<TEvent>;
}

export const createAction = <T extends TSchema, TState, TEvent extends Event<string, any>>(
  definition: ActionDefinition<TEvent, T, TState>
) => {
  function run(state: TState, input: Static<T>): ActionResult<TEvent> {
    const events = definition.resolve(state, (input ?? undefined) as any);

    return {
      events,
    };
  }
  run.schema = definition.input;
  return run;
};

export const createActionFromEvent = <T extends EventsSpecification, Name extends Extract<keyof T, string>>(
  factories: EventsFactory<T>,
  name: Name
) => {
  const fac = factories[name];

  return createAction<typeof fac.schema, null, Event<Name, Static<typeof fac.schema>>>({
    input: fac.schema,
    resolve: (_: null, input: Static<typeof fac.schema>) => {
      return [fac(input)] as const;
    },
  });
};

export interface Executor<TCommand, TContext> {
  add: <TEvent extends Event<string, {}>>(props: {
    result: ActionResult<TEvent>;
    entity: {
      id: string;
      version: number;
    };
    effects: Effects<TEvent, TCommand[], TContext>;
  }) => { id: string; version: number };
  commit: (context?: TContext) => Promise<any>;
}
