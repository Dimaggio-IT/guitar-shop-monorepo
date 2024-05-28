import { GuitarType, StringCount } from '../enums/product.enum';

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: Date;
  photo?: string;
  type?: GuitarType;
  article?: string;
  stringCount?: StringCount;
  price?: number;
}
