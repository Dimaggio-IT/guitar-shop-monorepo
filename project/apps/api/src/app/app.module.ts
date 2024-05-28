import { Module } from '@nestjs/common';

import { ShopUserModule } from '@project/shop-user';
import { ShopProductModule } from '@project/shop-product';
import { AuthenticationModule } from '@project/authentication'
import { ConfigurationModule } from '@project/configuration';
import { PrismaClientModule } from '@project/shared/models';


@Module({
  imports: [
    ConfigurationModule,
    // PrismaClientModule,
    // ShopUserModule,
    // ShopProductModule,
    // AuthenticationModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
