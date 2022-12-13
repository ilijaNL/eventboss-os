import { ActivityInfo } from 'api-contracts';
import { createActionFromEvent, createEventsFactory } from '@/utils/ddd';

export const activityEvents = createEventsFactory({
  activity_created: ActivityInfo,
  activity_updated: ActivityInfo,
});

export const create_activity = createActionFromEvent(activityEvents, 'activity_created');
export const update_activity = createActionFromEvent(activityEvents, 'activity_updated');
