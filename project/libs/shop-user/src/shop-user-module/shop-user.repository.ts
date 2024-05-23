import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/shared/data-access';

import { ShopUserEntity } from './shop-user.entity';
import { ShopUserFactory } from './shop-user.factory';

@Injectable()
export class ShopUserRepository extends BaseMemoryRepository<ShopUserEntity> {
  constructor(entityFactory: ShopUserFactory) {
    super(entityFactory);
  }

  public async findByEmail(email: string): Promise<ShopUserEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);

    if (!user) {
      return null;
    }

    return this.entityFactory.create(user);
  }
}
