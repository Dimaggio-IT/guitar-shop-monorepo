import { IProduct } from '@project/shared/core';
import { NameSpace } from '../../common';
import { TState } from '../../common';

const selectProducts = (state: Pick<TState, NameSpace.Products>): IProduct[] => state[NameSpace.Products].products;

const selectIsProductsLoading = (state: Pick<TState, NameSpace.Products>) => state[NameSpace.Products].isProductsLoading;

const selectIsEmptyProducts = (state: Pick<TState, NameSpace.Products>) => !state[NameSpace.Products].products.length;

export {
  selectIsProductsLoading,
  selectIsEmptyProducts,
  selectProducts
};
