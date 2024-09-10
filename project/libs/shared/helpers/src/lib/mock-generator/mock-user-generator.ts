import { MockGenerator } from './mock-generator.interface';
import { TMockServerData } from '@project/shared/core';
import {
  generateRandomPassword,
} from '@project/shared/helpers';
import { TPlainObject } from '@project/shared/core';
import { v4 as uuidV4 } from 'uuid';

const PASSWORD_LENGTH = 6;
const PASSWORD_IS_NUMBERS = true;
const USER_DEFAULT = 'admin';

export class MockUserGenerator implements MockGenerator {
  constructor(private readonly mockData: TMockServerData) { }

  public generate(): TPlainObject {

    return {
      id: uuidV4(),
      login: this.mockData.user.login,
      email: this.mockData.user.email,
      password: generateRandomPassword({
        length: PASSWORD_LENGTH,
        numbers: PASSWORD_IS_NUMBERS,
        userType: USER_DEFAULT
      })
    };
  }
}
