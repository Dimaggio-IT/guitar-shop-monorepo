import { Expose } from 'class-transformer';

import { ShopProductRdo } from './shop-product.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class ShopProductWithPaginationRdo {
  @ApiProperty({
    description: 'Entity list',
  })
  @Expose()
  public entities: ShopProductRdo[];

  @ApiProperty({
    description: 'The total number of pages',
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'The total number of pages',
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'The number of current page in pagination order',
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'The number of items per page in the pagination',
  })
  @Expose()
  public itemsPerPage: number;
}
