import { appSettings } from 'api-contracts';
import { createAuthClient, createAuthHooks } from '@/utils/typed-doc-fetch';
import getConfig from '@/config';

export const appHooks = createAuthHooks(appSettings, getConfig('API') + '/app');
export const appClient = createAuthClient(appSettings, getConfig('API') + '/app');
