import { Injectable } from '@nestjs/common';

import { EntityFactory, Post } from '@project/shared/core';

import { BlogPostEntity } from './shop-product.entity';
import { TPostDto } from './dto/create-product.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromPostDto(dto: TPostDto): BlogPostEntity {
    return new BlogPostEntity(dto);
  }
}
