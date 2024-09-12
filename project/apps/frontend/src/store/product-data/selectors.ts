import { NameSpace } from '../../common';
import { IProduct } from '@project/shared/core';
import { TState } from '../../common';

const selectProduct = (state: Pick<TState, NameSpace.Product>): IProduct | null => state[NameSpace.Product].product;

export { selectProduct };
