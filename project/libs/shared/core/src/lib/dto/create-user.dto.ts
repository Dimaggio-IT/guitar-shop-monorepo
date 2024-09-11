import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
} as const;

enum LoginLength {
  Min = 1,
  Max = 15,
}

enum PasswordLength {
  Min = 6,
  Max = 12,
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User\'s unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User\'s login name',
    example: 'Keks Ivanov',
  })
  @IsString()
  @MinLength(LoginLength.Min)
  @MaxLength(LoginLength.Max)
  public login: string;

  @ApiProperty({
    description: 'User\'s password',
    example: '123456'
  })
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password: string;
}
