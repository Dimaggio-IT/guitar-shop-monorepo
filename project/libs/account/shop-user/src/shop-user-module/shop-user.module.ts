import { Module } from '@nestjs/common';

import { ShopUserRepository } from './shop-user.repository';
import { ShopUserFactory } from './shop-user.factory';

@Module({
  providers: [ShopUserRepository, ShopUserFactory],
  exports: [ShopUserRepository],
})
export class ShopUserModule { }
