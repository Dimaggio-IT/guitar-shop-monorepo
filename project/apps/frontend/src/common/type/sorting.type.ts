import { SORT_BY, SORT_DIRECTION } from '../constant/common.const';

type TSortingValues = (typeof SORT_BY)[keyof typeof SORT_BY];

type TDirectionValues =
  (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];

export {
  type TSortingValues,
  type TDirectionValues,
}
