import { PrismaClient } from '@prisma/client';
import { ICommand } from './index.js';
import { IProduct, TMockServerData } from '@project/shared/core';
import {
  MockItemGenerator,
  MockUserGenerator,
  getErrorMessage
} from '@project/shared/helpers';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { IUser } from '@project/shared/core';
import { ShopUserFactory } from '@project/shop-user';

interface IGeneratedUser extends IUser {
  password: string;
}

function isMockServerData(value: unknown): value is TMockServerData {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'names') &&
    Object.hasOwn(value, 'descriptions') &&
    Object.hasOwn(value, 'photos') &&
    Object.hasOwn(value, 'types') &&
    Object.hasOwn(value, 'stringCount')
  );
}

export class GenerateCommand implements ICommand {
  private readonly _name: string = '--generate';
  private _products: IProduct[] = [];
  private _user: IGeneratedUser;
  private _initialData: TMockServerData;
  private _prismaClient: PrismaClient = new PrismaClient();

  constructor(
    private mockFileDefault = 'mock-server-data.json',
  ) { }

  private async load() {
    try {
      const jsonContent = await readFile(resolve('./assets/', this.mockFileDefault), { encoding: 'utf-8' });
      const importedContent: unknown = JSON.parse(jsonContent);

      if (!isMockServerData(importedContent)) {
        throw new Error('Failed to parse json content.');
      }

      this._initialData = importedContent;
    } catch {
      throw new Error(`Can't load data from ${resolve('./assets/', this.mockFileDefault)}`);
    }
  }

  private async write(itemCount: number) {
    console.log(itemCount);
    const mockItemGenerator = new MockItemGenerator(this._initialData);
    const mockUserGenerator = new MockUserGenerator(this._initialData);

    const generatedUserData = mockUserGenerator.generate() as unknown as IGeneratedUser;
    this._user = generatedUserData;
    const userEntity = ShopUserFactory.createFromDto(this._user);
    await userEntity.setPassword(this._user.password);
    userEntity.id = this._user.id ?? undefined;

    try {
      for (let i = 0; i < itemCount; i++) {
        const item = mockItemGenerator.generate() as unknown as IProduct;
        this._products.push(item);

        await this._prismaClient.product.upsert({
          where: { id: item.id },
          update: {},
          create: {
            id: item.id,
            name: item.name,
            description: item.description,
            photo: item.photo,
            type: item.type,
            article: item.article,
            stringCount: item.stringCount,
            price: item.price,
          }
        })
      };

      await this._prismaClient.user.upsert({
        where: { id: userEntity.id },
        update: {},
        create: {
          id: userEntity.id,
          login: userEntity.login,
          email: userEntity.email,
          passwordHash: userEntity.passwordHash,
        }
      });
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      globalThis.process.exit(1);
    } finally {
      await this._prismaClient.$disconnect();
    }
  }

  public get name(): string {
    return this._name;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count] = parameters;
    const itemCount = Number.parseInt(count, 10);

    if (!itemCount) {
      throw new Error(`Can't generate the mock data because the required parameter "count" is not passed`);
    }

    try {
      await this.load();
      await this.write(itemCount);
      console.info(`the elements have been created!`);
      console.info(`the administrator's user have been created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
