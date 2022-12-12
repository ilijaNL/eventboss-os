import { activityContract } from 'api-contracts';
import { createAuthClient, createAuthHooks } from '@/utils/typed-doc-fetch';
import getConfig from '@/config';

export const activityHooks = createAuthHooks(activityContract, getConfig('API') + '/activities');
export const activityClient = createAuthClient(activityContract, getConfig('API') + '/activities');
