import { BaseMemoryRepository } from '@project/shared/data-access';

import { ShopUserEntity } from './shop-user.entity';
import { ShopUserFactory } from './shop-user.factory';

export class ShopUserRepository extends BaseMemoryRepository<ShopUserEntity> {
  constructor(entityFactory: ShopUserFactory) {
    super(entityFactory);
  }
}
