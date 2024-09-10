import { IUser, TokenPayload } from '@project/shared/core';

export function createJWTPayload(user: IUser): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    login: user.login,
  };
}
