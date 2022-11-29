import { actionContract } from 'api-contracts';
import { createAuthClient, createAuthHooks } from '@/utils/typed-doc-fetch';
import getConfig from '@/config';

export const actionHooks = createAuthHooks(actionContract, getConfig('API') + '/actions');
export const actionClient = createAuthClient(actionContract, getConfig('API') + '/actions');
