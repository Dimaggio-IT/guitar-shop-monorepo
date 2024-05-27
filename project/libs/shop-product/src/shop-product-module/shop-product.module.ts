import { Module } from '@nestjs/common';

import { BlogCommentModule } from '@project/blog-comment';
import { PrismaClientModule } from '@project/models';

import { BlogPostController } from './shop-product.controller';
import { ShopProductService } from './shop-product.service';
import { BlogPostRepository } from './shop-product.repository';
import { BlogPostFactory } from './shop-product.factory';
import { BlogLikeModule } from '@project/blog-like';
import { BlogNotifyModule } from '@project/blog-notify';

@Module({
  imports: [
    BlogCommentModule,
    PrismaClientModule,
    BlogLikeModule,
    BlogNotifyModule,
  ],
  controllers: [BlogPostController],
  providers: [
    ShopProductService,
    BlogPostRepository,
    BlogPostFactory,
  ],
  exports: [ShopProductService],
})
export class ShopProductModule { }
