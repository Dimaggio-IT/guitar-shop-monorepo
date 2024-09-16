import { IProduct } from '@project/shared/core';

type TProductId = string;

type TProductValues = IProduct[keyof IProduct];
type TProductValuesWithoutNullable = Exclude<TProductValues, undefined | null>;

export { type TProductId, TProductValues, TProductValuesWithoutNullable };
