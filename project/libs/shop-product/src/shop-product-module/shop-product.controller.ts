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
  UseGuards,
} from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';

import { ShopProductService } from './shop-product.service';
import { ShopQuery } from './query/shop-product.query';
import { ShopProductWithPaginationRdo } from './rdo/shop-product-with-pagination.rdo';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ProductError, ProductInfo } from './shop-product.constant';
import { JwtAuthGuard } from 'libs/authentication/src/guards/jwt-auth.guard';

@Controller('products')
export class ShopProductController {
  constructor(
    private readonly productService: ShopProductService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.Show,
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const product = await this.productService.getProductById(id);

    return product.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.ShowAll,
  })
  @Get('/')
  public async index(@Query() query: ShopQuery) {
    const productsWithPagination = await this.productService.getProductsByQuery(query);
    const result = {
      ...productsWithPagination,
      entities: productsWithPagination.entities.map((product) => product.toPOJO()),
    }

    return fillDto(ShopProductWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ProductInfo.Add,
  })
  @Post('/')
  public async create(@Body() dto: CreateProductDto) {
    const newProduct = await this.productService.createProduct(dto);
    return newProduct.toPOJO();
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
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productService.deleteProductById(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const updatedProduct = await this.productService.updateProduct(dto);

    return updatedProduct.toPOJO();
  }
}
