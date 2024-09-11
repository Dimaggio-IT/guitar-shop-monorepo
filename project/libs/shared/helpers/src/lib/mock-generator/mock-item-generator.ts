import { MockGenerator } from './mock-generator.interface';
import { TMockServerData } from '@project/shared/core';
import {
  generateRandomValue,
  getRandomItem,
} from '../common';
import { TPlainObject } from '@project/shared/core';
import { v4 as uuidV4 } from 'uuid';
import { GENERATOR_CONFIG } from './mock-generator.constant';

export class MockItemGenerator implements MockGenerator {
  constructor(private readonly mockData: TMockServerData) { }

  public generate(): TPlainObject {
    return {
      id: uuidV4(),
      name: getRandomItem<string>(this.mockData.names),
      description: getRandomItem<string>(this.mockData.descriptions),
      photo: getRandomItem<string>(this.mockData.photos),
      type: getRandomItem<string>(this.mockData.types),
      article: generateRandomValue(GENERATOR_CONFIG.MIN_ARTICLE, GENERATOR_CONFIG.MAX_ARTICLE).toString(),
      stringCount: getRandomItem<number>(this.mockData.stringCount),
      price: generateRandomValue(GENERATOR_CONFIG.MIN_PRICE, GENERATOR_CONFIG.MAX_PRICE)
    };
  }
}
