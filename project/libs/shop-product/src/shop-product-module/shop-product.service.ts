import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/shared/core';

import { ShopProductRepository } from './shop-product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { ShopProductEntity } from './shop-product.entity';
import { ShopQuery } from './query/shop-product.query';
import { UpdateProductDto } from './dto/update-product.dto';
import { ShopProductFactory } from './shop-product.factory';

@Injectable()
export class ShopProductService {
  constructor(
    private readonly productRepository: ShopProductRepository,
  ) { }

  public async createProduct(dto: CreateProductDto): Promise<ShopProductEntity> {
    const newProduct = ShopProductFactory.createFromPostDto(dto);
    await this.productRepository.save(newProduct);

    return newProduct;
  }

  public async deleteProductById(id: string): Promise<void> {
    const product = await this.getProductById(id);

    if (product) {
      await this.productRepository.deleteById(id);
    } else {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  public async getProductById(id: string): Promise<ShopProductEntity> {
    return this.productRepository.findById(id);
  }

  public async getAllProductsByQuery(query?: ShopQuery): Promise<PaginationResult<ShopProductEntity>> {
    return this.productRepository.findByQuery(query);
  }

  public async updateProduct(dto: UpdateProductDto): Promise<ShopProductEntity> {
    const existsProduct = await this.productRepository.findById(dto.id);

    if (!existsProduct) {
      throw new NotFoundException(`You can't update product with ID ${dto.id}`);
    }

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsProduct[key] !== value) {
        existsProduct[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsProduct;
    }

    return this.productRepository.update(existsProduct);
  }
}
