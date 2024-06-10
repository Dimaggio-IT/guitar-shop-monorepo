import { Module } from '@nestjs/common';

// import { ShopUserModule } from '@project/shop-user';
import { ShopProductModule } from '@project/shop-product';
import { AuthenticationModule } from '@project/authentication'
import { ConfigurationModule } from '@project/configuration';
// import { PrismaClientModule } from '@project/shared/models';
// import { MailModule } from '@project/mail';

@Module({
  imports: [
    ConfigurationModule,
    AuthenticationModule,
    // PrismaClientModule,
    // ShopUserModule,
    ShopProductModule,
    // MailModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
