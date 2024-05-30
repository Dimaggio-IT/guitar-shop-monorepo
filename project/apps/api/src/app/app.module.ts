import { Module } from '@nestjs/common';

// import { ShopUserModule } from '@project/shop-user';
// import { ShopProductModule } from '@project/shop-product';
import { AuthenticationModule } from '@project/authentication'
import { ConfigurationModule } from '@project/configuration';
// import { PrismaClientModule } from '@project/shared/models';


@Module({
  imports: [
    ConfigurationModule,
    AuthenticationModule,
    // PrismaClientModule,
    // ShopUserModule,
    // ShopProductModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
