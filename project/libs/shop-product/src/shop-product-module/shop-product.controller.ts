import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';

import { ShopProductService } from './shop-product.service';
import { ShopQuery } from './query/shop-product.common-query';
import { BlogPostWithPaginationRdo } from './rdo/shop-product-with-pagination.rdo';
import { TPostDto } from './dto/create-product.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ProductError, ProductInfo } from './shop-product.constant';
import { JwtAuthGuard } from 'libs/account/authentication/src/guards/jwt-auth.guard';
import { RequestWithUser } from 'libs/account/authentication/src/authentication-module/request-with-user.interface';
import { BlogTitleQuery } from './query/shop-product.title-query';
import { BlogNotifyService } from '@project/blog-notify';

@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly postService: ShopProductService,
    private readonly notifyService: BlogNotifyService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.Show,
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPostById(id);

    return post.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.ShowAll,
  })
  @Get('/')
  public async index(@Query() query: ShopQuery) {
    const postsWithPagination = await this.postService.getAllPostsByCommonQuery(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }

    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.ShowUserPostCount,
  })
  @Get('user-posts-count/:id')
  public async getUserPostsCount(@Param('id') id: string) {
    return this.postService.getUserPostsCount(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.Search,
  })
  @Get('search')
  async searchPostsByTitle(@Query() query: BlogTitleQuery) {
    const posts = await this.postService.getPostsByTitle(query);

    return posts.map((post) => post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.ShowAllUserDrafts,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductError.EmptyList,
  })
  @UseGuards(JwtAuthGuard)
  @Get('drafts')
  async showDrafts(@Req() { user }: RequestWithUser) {
    const posts = await this.postService.getUnpublishedUserPosts(user.id);

    return posts.map((post) => post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ProductInfo.Add,
  })
  @Post('/')
  public async create(@Body() dto: TPostDto) {
    const newPost = await this.postService.createPost(dto);
    return newPost.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ProductInfo.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ProductError.Delete
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id', ParseUUIDPipe) id: string, @Req() { user }: RequestWithUser): Promise<void> {
    return this.postService.deletePost(id, user.id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.Repost,
  })
  @UseGuards(JwtAuthGuard)
  @Post('/repost/:id')
  public async rePost(
    @Req() { user }: RequestWithUser,
    @Param('id') id: string,
  ) {
    const post = await this.postService.rePost(id, user.id);

    return post.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Req() { user }: RequestWithUser) {
    const updatedPost = await this.postService.updatePost(id, dto, user.id);

    return updatedPost.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.SendNews
  })
  @UseGuards(JwtAuthGuard)
  @Get('news')
  public async sendNews(@Req() { user }: RequestWithUser) {
    const { email, id } = user;
    const posts = await this.postService.getNews();

    await this.notifyService.sendNews({ email, posts, userId: id });
  }
}
