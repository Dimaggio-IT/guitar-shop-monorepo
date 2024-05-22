import { AuthUser, EntityFactory } from '@project/shared/core';
import { ShopUserEntity } from './shop-user.entity';

export class ShopUserFactory implements EntityFactory<ShopUserEntity> {
  public create(entityPlainData: AuthUser): ShopUserEntity {
    return new ShopUserEntity(entityPlainData);
  }
}
