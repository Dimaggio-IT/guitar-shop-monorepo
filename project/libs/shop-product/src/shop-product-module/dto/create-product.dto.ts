import {
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ArticleLength, DescriptionLength, NameLength, PriceLength } from '../shop-product.constant';
import { Transform } from 'class-transformer';
import { GuitarType, StringCount } from '@project/shared/core';

export class CreateProductDto {
  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  public name: string;

  @IsString()
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  public description: string;

  @IsString()
  public photo: string;

  @IsEnum(GuitarType)
  public type: GuitarType;

  @IsString()
  @MinLength(ArticleLength.Min)
  @MaxLength(ArticleLength.Max)
  public article: string;

  @IsEnum(StringCount)
  @Transform(({ value }) => +value)
  public stringCount: number;

  @Transform(({ value }) => +value)
  @MinLength(PriceLength.Min)
  @MaxLength(PriceLength.Max)
  public price: number;
}
