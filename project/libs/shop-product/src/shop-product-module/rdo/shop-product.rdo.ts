import { Expose } from 'class-transformer';
import { GuitarType } from '../shop-product.constant';

export class ShopProductRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public photo: string;

  @Expose()
  public type: GuitarType

  @Expose()
  public article: string;

  @Expose()
  public stringCount: number;

  @Expose()
  public price: number;
}
