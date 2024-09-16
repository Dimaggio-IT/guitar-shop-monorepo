import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import passwordGenerator from 'generate-password-ts';

type UserTypeForGeneratePassword = "admin" | "user";
const PASSWORD_USER_DEFAULT = {
  admin: 'admin'
} as const;

interface IOptionsGenRndPassword {
  userType: UserTypeForGeneratePassword,
  length?: number;
  numbers?: boolean;
  symbols?: boolean | string;
  exclude?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  excludeSimilarCharacters?: boolean;
  strict?: boolean;
}

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  Number(((Math.random() * (max - min)) + min).toFixed(numAfterDigit));

export function getRandomItems<T>(items: T[], length?: number): T[] {
  const startPosition = length ? 0 : generateRandomValue(0, items.length - 1);
  const endPosition = length ?? (startPosition + generateRandomValue(startPosition, items.length));

  return items.slice(startPosition, endPosition);
}

export const getRandomItem = <T>(items: T[]): T => items[generateRandomValue(0, items.length - 1)];

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const generateRandomPassword = (options: IOptionsGenRndPassword): string => options.userType === "admin" ? PASSWORD_USER_DEFAULT.admin : passwordGenerator.generate(options);
