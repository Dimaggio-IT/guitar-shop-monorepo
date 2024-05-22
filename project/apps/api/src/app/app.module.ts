import { Module } from '@nestjs/common';

import { ShopUserModule } from '@project/shop-user';
import { AuthenticationModule } from '@project/authentication'


@Module({
  imports: [
    ShopUserModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
