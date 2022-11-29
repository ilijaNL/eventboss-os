require('dotenv-safe').config({
  allowEmptyValues: true,
});

import { FastifyPluginAsync, FastifyServerOptions, RouteOptions } from 'fastify';
import fp from 'fastify-plugin';
import fastifyHelmet from '@fastify/helmet';
import cors from '@fastify/cors';
import _ from 'lodash';
import sensible from '@fastify/sensible';
import pgBoss from './plugins/pg-boss';
import { isAllowedDomain } from './domains';
import db from './db';
import services from './services';

let ENVIRONMENT = process.env.NODE_ENV ?? 'development';

const app: FastifyPluginAsync = async (fastify) => {
  if (ENVIRONMENT === 'production') {
    fastify.register(fastifyHelmet);
  }

  fastify.register(cors, {
    credentials: true,
    // if not set, the all headers are allowed
    // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
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

  fastify.register(
    fp(function (instance) {
      instance.addHook('onRoute', (route: RouteOptions) => {
        instance.log.info(`${route.url}`);
      });

      return Promise.resolve();
    })
  );

  fastify.register(sensible);

  fastify.register(pgBoss, {
    options: {
      connectionString: process.env.PG_CONNECTION,
      max: 5,
      schema: 'system',
      noScheduling: true,
      uuid: 'v4',
    },
  });

  fastify.register(services, {});

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
