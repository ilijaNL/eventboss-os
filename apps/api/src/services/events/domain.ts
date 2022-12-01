import { EventData, eventsContract } from 'api-contracts';
import { createEventsFactory, createActionFromEvent } from '@/utils/ddd';

export const eventEvents = createEventsFactory({
  event_created: EventData,
  event_updated: EventData,
  action_assigned: eventsContract.assign_action.input,
});

export const create_event = createActionFromEvent(eventEvents, 'event_created');
export const edit_event = createActionFromEvent(eventEvents, 'event_updated');
export const assign_action = createActionFromEvent(eventEvents, 'action_assigned');
