import { systemContract } from 'api-contracts';
import { createRPCClient } from '@/utils/typed-doc-fetch';
import getConfig from '@/config';

export const systemClient = createRPCClient(systemContract, getConfig('API') + '/s');
