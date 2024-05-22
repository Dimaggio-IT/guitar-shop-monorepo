import dayjs from 'dayjs';
import { ConflictException, Injectable } from '@nestjs/common';

import { ShopUserRepository, ShopUserEntity } from '@project/shop-user';
import { UserRole } from '@project/shared/core';

import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly shopUserRepository: ShopUserRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, login, password} = dto;

    const shopUser = {
      email,
      login,
      role: UserRole.Admin,
      passwordHash: ''
    };

    const existUser = await this.shopUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new shopUserEntity(shopUser).setPassword(password);

    return this.shopUserRepository
      .save(userEntity);
  }
 }
