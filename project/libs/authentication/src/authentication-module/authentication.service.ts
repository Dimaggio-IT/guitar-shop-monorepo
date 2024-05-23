import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { ShopUserRepository, ShopUserEntity } from '@project/shop-user';
import { UserRole } from '@project/shared/core';

import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly shopUserRepository: ShopUserRepository
  ) {}

  public async register(dto: CreateUserDto): Promise<ShopUserEntity> {
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

    const userEntity = await new ShopUserEntity(shopUser).setPassword(password);

    this.shopUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.shopUserRepository.findById(id);

    if (! user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }
}
