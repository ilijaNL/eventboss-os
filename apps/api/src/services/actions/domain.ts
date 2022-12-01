import { ActionInfo } from 'api-contracts';
import { createActionFromEvent, createEventsFactory } from '@/utils/ddd';

export const actionEvents = createEventsFactory({
  action_created: ActionInfo,
  action_updated: ActionInfo,
});

export const create_action = createActionFromEvent(actionEvents, 'action_created');
export const update_action = createActionFromEvent(actionEvents, 'action_updated');
