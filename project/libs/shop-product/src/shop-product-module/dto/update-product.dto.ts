import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ArticleLength, DescriptionLength, GuitarType, NameLength, PriceLength, StringCount } from '../shop-product.constant';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  public name?: string;

  @IsOptional()
  @IsString()
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  public description?: string;

  @IsOptional()
  @IsString()
  public photo?: string;

  @IsOptional()
  @IsEnum(GuitarType)
  public type?: string;

  @IsOptional()
  @IsString()
  @MinLength(ArticleLength.Min)
  @MaxLength(ArticleLength.Max)
  public article?: string;

  @IsOptional()
  @IsEnum(StringCount)
  @Transform(({ value }) => +value)
  public StringCount?: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @MinLength(PriceLength.Min)
  @MaxLength(PriceLength.Max)
  public Price?: number;
}
