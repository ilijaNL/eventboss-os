import {
  AccessToken,
  createRefreshToken,
  getJWTPayloadForUser,
  signAccessToken,
  signRefreshToken,
  signRequestToken,
  verifyAndGetData,
  verifyRequestToken,
} from './utils';
import { oauth } from './oauth';
import rateLimit from '@fastify/rate-limit';
import _merge from 'lodash/merge';
import { getUserByEmail, getUserById, assertRedirect } from './infra';
import _ from 'lodash';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';
import { createActivitySub } from '@/utils/eventboss/activity';
import { emitEvent } from '@/utils/eventboss/event';
import createEventBoss from '@/utils/eventboss';
import createHttpError from 'http-errors';

type LoginEmailRequestedEvent = {
  event_name: 'login-email-requested';
  email: string;
  redirectUrl: string;
};

const sendLoginEmailActivity = createActivitySub<LoginEmailRequestedEvent>({
  slug: 'send-login-link',
  maxConcurrency: 10,
  fetchSize: 10,
  poolInterval: 1500,
  async handler(data) {
    const requestUrl = createRequestUrl({
      email: data.email,
      redirectUrl: `${data.redirectUrl}/api/auth/acquire`,
    });

    console.log({ requestUrl });

    // await emailClient.send({
    //   message: { to: data.email },
    //   template: 'login',
    //   locals: {
    //     email: data.email,
    //     login_url: requestUrl,
    //   },
    // });
  },
});

const hasuraNamespace = 'graphql-api';

export function createRequestUrl(props: { email: string; redirectUrl: string }) {
  const token = signRequestToken({ email: props.email });

  const url = new URL(props.redirectUrl);
  url.searchParams.set('request_token', token);
  return url.toString();
}

const authService: FastifyPluginAsyncTypebox = async (fastify) => {
  const app_id = 'fea69078-136b-4539-a0c7-126ae565da1e';
  const eventBoss = createEventBoss(app_id, [sendLoginEmailActivity]);
  await eventBoss.start();

  fastify.register(rateLimit, {
    max: 15,
    timeWindow: 5000,
    keyGenerator: function (request) {
      return (request.headers['x-real-ip'] as string) ?? request.ip;
    },
  });

  /**
   * Oauth providers
   */
  fastify.register(oauth);

  /**
   * Request refresh token
   */
  fastify.post(
    '/request',
    {
      schema: {
        body: Type.Object({
          request_token: Type.String({}),
        }),
        response: {
          '2xx': Type.Object({
            refreshToken: Type.String(),
          }),
        },
      },
    },
    async (req) => {
      const verifiedToken = verifyRequestToken(req.body.request_token);

      if (!verifiedToken) {
        throw fastify.httpErrors.unauthorized('invalid-token');
      }

      const email = verifiedToken.email.toLowerCase();

      // get user from db
      let user = await getUserByEmail(email);

      // create new user
      if (!user) {
        throw new createHttpError.NotFound();
        // wwww;

        // user = {
        //   email: email,
        //   token_version: 0,
        //   user_id: account_id,
        // };
      }

      const refreshToken = createRefreshToken({
        email: user.email,
        sub: user.user_id,
        user_id: user.user_id,
        token_version: user.token_version,
      });

      return {
        refreshToken: signRefreshToken(refreshToken),
      };
    }
  );

  /**
   * Refresh refresh token
   */
  fastify.post(
    '/refresh',
    {
      schema: {
        body: Type.Object({
          refresh_token: Type.String({}),
        }),
        response: {
          '2xx': Type.Object({
            refreshToken: Type.String(),
          }),
        },
      },
    },
    async (request) => {
      const { refresh_token } = request.body;
      const userInfo = verifyAndGetData(refresh_token);

      if (!userInfo) {
        throw fastify.httpErrors.unauthorized('invalid-token');
      }

      // get user from db
      const user = await getJWTPayloadForUser(userInfo.user_id);

      // check if refresh token is same as in token
      if (!user || userInfo.token_version !== user.token_version) {
        throw fastify.httpErrors.forbidden('invalid-token');
      }

      const refreshToken = createRefreshToken({
        email: user.email,
        sub: user.user_id,
        user_id: user.user_id,
        token_version: user.token_version,
      });

      return {
        refreshToken: signRefreshToken(refreshToken),
      };
    }
  );

  /**
   * Get access token for a user
   */
  fastify.post(
    '/access-token',
    {
      schema: {
        body: Type.Object({
          refresh_token: Type.String({}),
        }),
        response: {
          '2xx': Type.Object({
            access_token: Type.String(),
          }),
        },
      },
    },
    async (req) => {
      const { refresh_token } = req.body;
      const refreshToken = verifyAndGetData(refresh_token);

      if (!refreshToken) {
        throw fastify.httpErrors.unauthorized();
      }

      const { user_id } = refreshToken;
      if (!user_id) {
        throw fastify.httpErrors.unauthorized();
      }

      const currentUser = await getUserById(user_id);

      if (!currentUser) {
        throw fastify.httpErrors.unauthorized();
      }

      const jwtClaims: AccessToken & { [key: string]: any } = {
        user_id: user_id,
        [hasuraNamespace]: {
          'X-Hasura-Default-Role': 'user',
          'X-Hasura-Allowed-Roles': ['user'],
          'X-Hasura-User-Id': user_id,
        },
      };

      return {
        access_token: signAccessToken({ ...jwtClaims, sub: user_id }),
      };
    }
  );

  /**
   * Request signin email
   */
  fastify.post(
    '/signin/email',
    {
      schema: {
        body: Type.Object({
          email: Type.String({ format: 'email' }),
          redirectUrl: Type.String({}),
        }),
      },
    },
    async (request) => {
      const { email, redirectUrl } = request.body;

      await assertRedirect(redirectUrl);
      await emitEvent({
        app_id: app_id,
        event_slug: 'login-email-requested',
        payload: {
          email: email,
          event_name: 'login-email-requested',
          redirectUrl: redirectUrl,
        } as LoginEmailRequestedEvent,
      });

      return {
        success: true,
      };
    }
  );
};

export default authService;
