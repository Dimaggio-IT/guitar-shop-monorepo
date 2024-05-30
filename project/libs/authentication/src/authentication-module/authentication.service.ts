import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { ShopUserRepository, ShopUserEntity } from '@project/shop-user';
import { Token, User } from '@project/shared/core';
import { createJWTPayload } from '@project/shared/helpers';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { jwtConfig } from '@project/configuration';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG
} from './authentication.constant';
import { ChangePasswordUserDto } from '../dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly shopUserRepository: ShopUserRepository,

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) { }

  public async register(dto: CreateUserDto): Promise<ShopUserEntity> {
    const { email, login, password } = dto;

    const shopUser = {
      email,
      login,
      passwordHash: ''
    };

    const existUser = await this.shopUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new ShopUserEntity(shopUser)
      .setPassword(password)

    this.shopUserRepository
      .save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<ShopUserEntity> {
    const { email, password } = dto;
    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUserById(id: string): Promise<ShopUserEntity> {
    const user = await this.shopUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async changePassword(dto: ChangePasswordUserDto): Promise<ShopUserEntity> {
    const { password, newPassword, id } = dto;
    const user = await this.shopUserRepository.findById(id);

    if (!await user.comparePassword(password)) {
      throw new BadRequestException(AUTH_USER_PASSWORD_WRONG);
    }

    const userEntity = await user.setPassword(newPassword);

    return this.shopUserRepository.update(userEntity);
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string): Promise<ShopUserEntity> {
    const user = await this.shopUserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
}
