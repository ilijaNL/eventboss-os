import { activityContract } from 'api-contracts';
import { createAuthClient, createAuthHooks } from '@/utils/typed-doc-fetch';
import getConfig from '@/config';

export const actionHooks = createAuthHooks(activityContract, getConfig('API') + '/actions');
export const actionClient = createAuthClient(activityContract, getConfig('API') + '/actions');
