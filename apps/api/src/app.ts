require('dotenv-safe').config({
  allowEmptyValues: true,
});

import { FastifyPluginAsync, FastifyServerOptions, RouteOptions } from 'fastify';
import fp from 'fastify-plugin';
import fastifyHelmet from '@fastify/helmet';
import _ from 'lodash';
import sensible from '@fastify/sensible';
import db from './db';
import managementService from './services/management';
import { sdkService } from './services/sdk';
import { isAllowedDomain } from '@/domains';
import cors from '@fastify/cors';
import authService from './services/auth';

let ENVIRONMENT = process.env.NODE_ENV ?? 'development';

const IS_PROD = ENVIRONMENT === 'production';

const app: FastifyPluginAsync = async (fastify) => {
  if (IS_PROD) {
    fastify.register(fastifyHelmet);
  }

  fastify.register(cors, {
    credentials: true,
    // if allowedHeaders not set, the all headers are allowed
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (isAllowedDomain(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed'), false);
    },
  });

  if (!IS_PROD) {
    fastify.register(
      fp(function (instance) {
        instance.addHook('onRoute', (route: RouteOptions) => {
          instance.log.info(`${route.url}`);
        });

        return Promise.resolve();
      })
    );
  }

  fastify.register(sensible);

  fastify.register(sdkService, { prefix: '/sdk' });
  fastify.register(authService, { prefix: '/auth' });
  fastify.register(managementService, { prefix: '/management' });

  fastify.get('/health', async () => {
    return {
      success: true,
    };
  });

  fastify.addHook('onClose', async () => {
    await db.destroy();
  });
};

// this will be used by fastify cli
export const options: FastifyServerOptions = {
  trustProxy: true,
};

export default app;
