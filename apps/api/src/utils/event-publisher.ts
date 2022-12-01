import { Static, TSchema } from '@sinclair/typebox';
import { EventEmitter as _EventEmitter } from 'events';
import { ActionResult, Event, EventFactory, OutputEvent } from './ddd';

export interface Entity {
  id: string;
  version: number;
}

export type EventHandler<TName, TData, TCommand, Ctx> = (props: {
  ctx: Ctx;
  event: OutputEvent<Event<TName, TData>>;
}) => TCommand[] | TCommand;

export function createEventListener<TName, T extends TSchema>(factory: EventFactory<TName, T>) {
  function handler<Ctx, TCommand>(
    handler: EventHandler<TName, Static<T>, TCommand, Ctx>
  ): { event_name: TName; handle: EventHandler<TName, Static<T>, TCommand, Ctx> } {
    return {
      event_name: factory.event_name,
      handle: handler,
    };
  }

  return handler;
}

export type CreateHandlerResult<TCommand, Ctx = any> = {
  event_name: unknown;
  handle: EventHandler<unknown, unknown, TCommand, Ctx>;
};

export const createPublisherFactory = <TCommand>(listeners: Array<CreateHandlerResult<TCommand>>) => {
  return function create<Ctx>(ctx: Ctx) {
    const _commands: Array<TCommand> = [];
    const _events: Array<OutputEvent<Event>> = [];

    /**
     * Emit events and execute the listeners which listen to those events
     * @param props
     * @returns the enityt with new version (old version + amount of events)
     */
    function emit<TEvent extends Event>(props: { events: ReadonlyArray<TEvent>; entity: Entity }): Entity {
      const events = props.events;
      console.log({ events });
      const outputEvents: Array<OutputEvent<TEvent>> = events.map((e, idx) => ({
        _agg_id: props.entity.id,
        _version: props.entity.version + 1 + idx,
        ...e,
      }));

      const resultingCommands = outputEvents
        .map((e) => {
          return listeners
            .filter((l) => l.event_name === e.event_name)
            .flatMap((lis) => lis.handle({ ctx: ctx, event: e }));
        })
        .flat();

      _commands.push(...resultingCommands);
      _events.push(...outputEvents);

      const lastEvent = outputEvents[outputEvents.length - 1];

      return lastEvent ? { id: lastEvent._agg_id, version: lastEvent._version } : props.entity;
    }

    return {
      emit,
      getCommands() {
        return [..._commands];
      },
      getEvents(): Array<OutputEvent<Event>> {
        return [..._events];
      },
    };
  };
};
