import { FastifyRequest } from 'fastify';
import { createVerifier, createSigner } from 'fast-jwt';
import { getUserById } from './infra';

const JWT_REFRESH_TOKEN_EXPIRATION_TIME = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME ?? '-1');

export type AccessToken = {
  user_id: string;
};

export type User = {
  email: string;
  user_id: string;
  /**
   * Can be used to invalidate user
   */
  token_version: number;
};

export type IdToken = {
  sub: string;
} & User;

export type RefreshToken = IdToken;
export type RequestToken = {
  email: string;
};

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const JWT_ACCESS_TOKEN_EXPIRATION_TIME = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME ?? '-1');
const JWT_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? '-1';

const ISS = 'eventboss';

export const verifyJwt = createVerifier({ cache: true, key: JWT_TOKEN_SECRET, allowedIss: [ISS] });

export const verifyRequestToken = createVerifier({
  key: REFRESH_TOKEN_SECRET,
  cache: true,
  allowedIss: [ISS],
});

export const verifyRefreshToken = createVerifier({
  key: REFRESH_TOKEN_SECRET,
  cache: true,
  allowedIss: [ISS],
});

const _signRefreshToken = createSigner({
  key: REFRESH_TOKEN_SECRET,
  expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME * 1000,
  iss: ISS,
});

export const signAccessToken = createSigner({
  key: JWT_TOKEN_SECRET,
  expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME * 1000,
  iss: ISS,
});

export function signRefreshToken(token: RefreshToken) {
  return _signRefreshToken(token);
}

const _signRequestToken = createSigner({
  key: REFRESH_TOKEN_SECRET,
  expiresIn: 1000 * 60 * 60, // 1 hour expiration
  iss: ISS,
});

export function signRequestToken(token: RequestToken) {
  return _signRequestToken(token);
}

export async function getJWTPayloadForUser(user_id: string): Promise<IdToken | null> {
  const user = await getUserById(user_id);
  if (!user) {
    return null;
  }

  return {
    sub: user.user_id,
    email: user.email,
    token_version: user.token_version,
    user_id: user.user_id,
  };
}

export function getUserAuthFromRequest(request: FastifyRequest): AccessToken | null {
  try {
    const verifiedToken = verifyJwt((request.headers.authorization ?? '').replace('Bearer ', '')) as AccessToken;
    return verifiedToken;
  } catch (e) {
    return null;
  }
}

export const createRefreshToken = (payload: IdToken): RefreshToken => ({
  sub: payload.user_id,
  user_id: payload.user_id,
  email: payload.email,
  token_version: payload.token_version,
});

export function verifyAndGetData(refresh_token: string): RefreshToken | null {
  try {
    return verifyRefreshToken(refresh_token);
  } catch (e) {
    return null;
  }
}
