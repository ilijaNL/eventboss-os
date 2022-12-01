import { appContract } from 'api-contracts';
import { createAuthClient, createAuthHooks } from '@/utils/typed-doc-fetch';
import getConfig from '@/config';

export const appHooks = createAuthHooks(appContract, getConfig('API') + '/app');
export const appClient = createAuthClient(appContract, getConfig('API') + '/app');
