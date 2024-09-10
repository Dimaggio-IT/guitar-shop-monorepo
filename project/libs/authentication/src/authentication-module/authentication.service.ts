import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import {
  ShopUserRepository,
  ShopUserEntity,
  ShopUserFactory,
} from '@project/shop-user';
import { Token, IUser } from '@project/shared/core';
import { createJWTPayload } from '@project/shared/helpers';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG
} from './authentication.constant';
import { ChangePasswordUserDto } from '../dto/change-password.dto';
import { MailService } from 'libs/mail/src/mail-module/mail.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: ShopUserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) { }

  public async register(dto: CreateUserDto): Promise<ShopUserEntity> {
    const existUser = await this.userRepository
      .findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = ShopUserFactory.createFromDto(dto);
    await userEntity.setPassword(dto.password);

    await this.userRepository.save(userEntity);
    await this.mailService.sendNotifyNewUser(
      {
        id: userEntity.id,
        login: userEntity.login,
        email: userEntity.email
      }
    );

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<ShopUserEntity> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUserById(id: string): Promise<ShopUserEntity> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async changePassword(dto: ChangePasswordUserDto): Promise<ShopUserEntity> {
    const { password, newPassword, id } = dto;
    const user = await this.userRepository.findById(id);

    if (!await user.comparePassword(password)) {
      throw new BadRequestException(AUTH_USER_PASSWORD_WRONG);
    }

    const userEntity = await user.setPassword(newPassword);

    return this.userRepository.update(userEntity);
  }

  public async createUserToken(user: IUser): Promise<Token> {
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
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
}
