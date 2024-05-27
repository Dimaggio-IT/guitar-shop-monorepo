import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ShopUserModule } from '@project/shop-user';
import { getJwtOptions } from '@project/configuration';

import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';

@Module({
  imports: [
    ShopUserModule,
    // TODO: add prisma module
  ],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
  ]
})
export class AuthenticationModule { }
