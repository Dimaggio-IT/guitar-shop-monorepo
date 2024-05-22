import { Entity } from '@project/shared/core';
import { StorableEntity, AuthUser, UserRole } from '@project/shared/core';

export class ShopUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public login: string;
  public role: UserRole;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.login = user.login;
    this.passwordHash = user.passwordHash;
    this.role = user.role ?? UserRole.Admin;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      login: this.login,
      role: this.role,
      passwordHash: this.passwordHash,
    }
  }
}