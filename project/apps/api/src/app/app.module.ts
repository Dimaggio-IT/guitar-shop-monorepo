import { Module } from '@nestjs/common';

import { ShopProductModule } from '@project/shop-product';
import { AuthenticationModule } from '@project/authentication'
import { ConfigurationModule } from '@project/configuration';

@Module({
  imports: [
    ConfigurationModule,
    AuthenticationModule,
    ShopProductModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
