import createHttpError from 'http-errors';
import { User } from './utils';
import { isAllowedDomain } from '@/domains';
import db from '@/db';

export async function getUserById(user_id: string): Promise<null | User> {
  const result = await db
    .selectFrom('auth.accounts')
    .select(['id', 'email', 'token_version'])
    .where('auth.accounts.id', '=', user_id)
    .executeTakeFirst();

  if (!result) {
    return null;
  }

  return {
    email: result.email,
    token_version: result.token_version,
    user_id: result.id,
  };
}

export async function getUserByEmail(email: string): Promise<null | User> {
  const result = await db
    .selectFrom('auth.accounts')
    .select(['id', 'email', 'token_version'])
    .where('auth.accounts.email', '=', email)
    .executeTakeFirst();

  if (result) {
    return {
      email: result.email,
      token_version: result.token_version,
      user_id: result.id,
    };
  }

  return null;
}

/**
 * Function that should check if this is a known domain and we can safely redirect to it
 * @param url
 * @returns
 */
export async function assertRedirect(url: string) {
  if (isAllowedDomain(url)) {
    return true;
  }

  throw new createHttpError.Unauthorized('domain not allowed');
}
