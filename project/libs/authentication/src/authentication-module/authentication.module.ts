import { Module } from '@nestjs/common';

import { ShopUserModule } from '@project/shop-user';
import { ConfigurationModule } from '@project/configuration';

import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [
    ShopUserModule,
    ConfigurationModule,
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
  ]
})
export class AuthenticationModule { }
