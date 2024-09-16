import { IProduct } from '@project/shared/core';
import { SORT_BY, SORT_DIRECTION } from '../constant/common.const';

type TSortingValues = Extract<keyof IProduct, string | number | Date>;

type TDirectionValues =
  (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];

export {
  type TSortingValues,
  type TDirectionValues,
}
