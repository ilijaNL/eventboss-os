import { FastifyPluginAsync } from 'fastify';
import oauthPlugin, { Credentials, OAuth2Token } from '@fastify/oauth2';
import { OAuth2Namespace } from '@fastify/oauth2';
import { createDecoder } from 'fast-jwt';
import { signRequestToken } from '../utils';
import { Static, Type } from '@sinclair/typebox';
import fastifyCookie from '@fastify/cookie';
import axios from 'axios';
import { assertRedirect } from '../infra';
import { request } from 'undici';
import { createValidateFn } from '@/utils/schema';

const ENVIRONMENT = process.env.NODE_ENV ?? 'production';
const API_HOST = process.env.API_HOST ?? 'http://localhost:3001';
const PORTAL_URL = process.env.PORTAL_URL ?? 'https://google.com';

const REDIRECT_COOKIE_KEY = '__redirect_path_eventboss';

const tokenDecoder = createDecoder({});

type GoogleToken = OAuth2Token & {
  id_token: string;
};

type Profile = {
  email: string;
};

type OauthProviderOptions = {
  name: string;
  scope: string[];
  authorizationUriParams?: Record<string, string>;
  tokenRequestParams?: Record<string, any>;
  credentials: Credentials;
  getEmailFromToken: (token: OAuth2Token['token']) => Promise<{ email: string }>;
};

const oAuthProvider: FastifyPluginAsync<OauthProviderOptions> = async (fastify, options) => {
  const providerName = `${options.name}OAuth`;
  const callbackUrl = `/signin/${options.name}/callback`;
  fastify.register(oauthPlugin, {
    name: providerName,
    scope: options.scope,
    credentials: options.credentials,
    // leave empty such that it doesnt exist
    startRedirectPath: '',
    tokenRequestParams: options.tokenRequestParams,
    // since default is random hex, we should override when multiple instances
    //generateStateFunction: () => {},
    callbackUri: `${API_HOST}/auth${callbackUrl}`,
  });

  fastify.get<{ Querystring: Static<typeof oauthRedirectParams> }>(
    `/signin/${options.name}`,
    {
      schema: {
        querystring: oauthRedirectParams,
      },
    },
    async function (request, reply) {
      const oauthProvider = (this as any)[providerName] as OAuth2Namespace;
      const redirectPath = request.query.redirectUrl;

      await assertRedirect(redirectPath);

      const authorizationUri = oauthProvider.generateAuthorizationUri(request);

      const authUri = new URL(authorizationUri);

      Object.entries(options.authorizationUriParams ?? {}).forEach(([key, value]) => {
        authUri.searchParams.set(key, value);
      });

      reply.setCookie(REDIRECT_COOKIE_KEY, redirectPath, {
        maxAge: 60 * 15, // 15 minutes
        secure: ENVIRONMENT === 'production',
        httpOnly: true,
        sameSite: 'lax',
        path: `/auth${callbackUrl}`,
      });

      return reply.redirect(authUri.toString());
    }
  );

  fastify.get(callbackUrl, async function (request, reply) {
    const oauthProvider = (this as any)[providerName] as OAuth2Namespace;
    const token = await oauthProvider.getAccessTokenFromAuthorizationCodeFlow(request);
    const { email } = await options.getEmailFromToken(token.token);
    // redirect to redirect cookie or fallback to the default domain
    const redirectTo = request.cookies[REDIRECT_COOKIE_KEY] ?? PORTAL_URL;

    // clear cookie key
    reply.clearCookie(REDIRECT_COOKIE_KEY);

    return reply.redirect(
      302,
      `${redirectTo}?request_token=${signRequestToken({ email: email })}&redirectTo=${redirectTo}`
    );
  });
};

export const oauthRedirectParams = Type.Object({
  redirectUrl: Type.String(),
});

const twitchSchema = Type.Object({
  email: Type.String(),
});

const twitchValidate = createValidateFn(twitchSchema);

export const oauth: FastifyPluginAsync<{}> = async (fastify) => {
  fastify.register(fastifyCookie);

  if (process.env.GOOGLE_OAUTH_CLIENT_ID && process.env.GOOGLE_OAUTH_SECRET) {
    fastify.register(oAuthProvider, {
      name: 'google',
      scope: ['profile', 'openid', 'email'],
      credentials: {
        client: {
          id: process.env.GOOGLE_OAUTH_CLIENT_ID,
          secret: process.env.GOOGLE_OAUTH_SECRET,
        },
        auth: oauthPlugin.GOOGLE_CONFIGURATION,
      },
      async getEmailFromToken(token) {
        return tokenDecoder((token as any).id_token) as Profile;
      },
    });
  }

  if (process.env.LINKEDIN_OAUTH_CLIENT_ID && process.env.LINKEDIN_OAUTH_SECRET) {
    fastify.register(oAuthProvider, {
      name: 'linkedin',
      scope: ['r_emailaddress'],
      credentials: {
        client: {
          id: process.env.LINKEDIN_OAUTH_CLIENT_ID,
          secret: process.env.LINKEDIN_OAUTH_SECRET,
        },
        auth: oauthPlugin.LINKEDIN_CONFIGURATION,
        options: {
          authorizationMethod: 'body', // see https://github.com/fastify/fastify-oauth2/issues/149#issuecomment-1229033791
        },
      } as any,
      async getEmailFromToken(token) {
        const emailResponse = await axios.get(
          'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
          { headers: { Authorization: `Bearer ${token.access_token}` } }
        );
        const emailData = emailResponse.data;
        return {
          email: emailData?.elements?.[0]?.['handle~']?.emailAddress,
        };
      },
    });
  }

  if (process.env.MICROSOFT_OAUTH_CLIENT_ID && process.env.MICROSOFT_OAUTH_SECRET) {
    fastify.register(oAuthProvider, {
      name: 'microsoft',
      scope: ['openid', 'email'],
      credentials: {
        client: {
          id: process.env.MICROSOFT_OAUTH_CLIENT_ID,
          secret: process.env.MICROSOFT_OAUTH_SECRET,
        },
        auth: oauthPlugin.MICROSOFT_CONFIGURATION,
      },
      async getEmailFromToken(token: any) {
        return tokenDecoder((token as GoogleToken).id_token) as Profile;
      },
    });
  }

  // if (process.env.TWITTER_OAUTH_CLIENT_ID && process.env.TWITTER_OAUTH_SECRET) {
  //   fastify.register(oAuthProvider, {
  //     name: 'twitter',
  //     scope: ['users.read'],
  //     tokenRequestParams: {
  //       code_verifier: 'challenge',
  //     },
  //     authorizationUriParams: {
  //       code_challenge: 'challenge',
  //       code_challenge_method: 'plain',
  //     },
  //     credentials: {
  //       client: {
  //         id: process.env.TWITTER_OAUTH_CLIENT_ID,
  //         secret: process.env.TWITTER_OAUTH_SECRET,
  //       },
  //       auth: {
  //         authorizeHost: 'https://twitter.com',
  //         authorizePath: '/i/oauth2/authorize',
  //         tokenHost: 'https://api.twitter.com',
  //         tokenPath: '/2/oauth2/token',
  //       },
  //       // options: {
  //       //   authorizationMethod: 'body',
  //       // },
  //       // options: {
  //       //   authorizationMethod: 'body', // see https://github.com/fastify/fastify-oauth2/issues/149#issuecomment-1229033791
  //       // },
  //     },
  //     async getEmailFromToken(token) {
  //       return {
  //         email: 'unknown',
  //       };
  //     },
  //   });
  // }

  if (process.env.TWITCH_OAUTH_CLIENT_ID && process.env.TWITCH_OAUTH_SECRET) {
    fastify.register(oAuthProvider, {
      name: 'twitch',
      scope: ['openid', 'user:read:email'],
      // tokenRequestParams: {
      //   claims: {
      //     id_token: {
      //       email: null,
      //       picture: null,
      //       preferred_username: null,
      //     },
      //   },
      // },
      credentials: {
        client: {
          id: process.env.TWITCH_OAUTH_CLIENT_ID,
          secret: process.env.TWITCH_OAUTH_SECRET,
        },
        auth: oauthPlugin.TWITCH_CONFIGURATION,
        options: {
          authorizationMethod: 'body', // see https://github.com/fastify/fastify-oauth2/issues/149#issuecomment-1229033791
        },
      },
      async getEmailFromToken(token) {
        const userResult = await request('https://api.twitch.tv/helix/users', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Client-Id': process.env.TWITCH_OAUTH_CLIENT_ID!,
            authorization: `Bearer ${token.access_token}`,
          },
        }).then((d) => d.body.json());

        const currentUser = userResult?.data[0];

        if (!twitchValidate(currentUser)) {
          throw new Error('not valid user');
        }

        return {
          email: currentUser.email,
        };
      },
    });
  }

  if (process.env.DISCORD_OAUTH_CLIENT_ID && process.env.DISCORD_OAUTH_SECRET) {
    fastify.register(oAuthProvider, {
      name: 'discord',
      scope: ['identify', 'email'],
      credentials: {
        client: {
          id: process.env.DISCORD_OAUTH_CLIENT_ID,
          secret: process.env.DISCORD_OAUTH_SECRET,
        },
        auth: oauthPlugin.DISCORD_CONFIGURATION,
      },
      async getEmailFromToken(token) {
        const userResult = await request('https://discord.com/api/users/@me', {
          headers: {
            authorization: `${token.token_type} ${token.access_token}`,
          },
        }).then((d) => d.body.json());

        return {
          email: userResult.email!,
        };
      },
    });
  }
};
