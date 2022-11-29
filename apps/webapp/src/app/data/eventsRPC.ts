import { eventsContract } from 'api-contracts';
import { createAuthClient, createAuthHooks } from '@/utils/typed-doc-fetch';
import getConfig from '@/config';

export const eventHooks = createAuthHooks(eventsContract, getConfig('API') + '/events');
export const eventClient = createAuthClient(eventsContract, getConfig('API') + '/events');
