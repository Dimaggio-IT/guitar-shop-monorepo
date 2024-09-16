import { TGuitarType } from '@project/shared/core';
import { TProductValuesWithoutNullable } from './product.type';

const FILTER_GUITAR = {
  electro: 'Электрогитары',
  acoustics: 'Акустические гитары',
  ukukule: 'Укулеле',
  4: '4-strings',
  6: '6-strings',
  7: '7-strings',
  12: '12-strings',
} as const;

type TFilterStringCountName =
  | '4-strings'
  | '6-strings'
  | '7-strings'
  | '12-strings';

type TFilterIDProp = TGuitarType | TFilterStringCountName;

type TFilterItem = {
  id: TFilterIDProp;
  value: TProductValuesWithoutNullable;
  label: string;
  checked: boolean;
  disabled: boolean;
};

type TFilterItems = {
  type: Array<TFilterItem>;
  string: Array<TFilterItem>;
};

type TFilterType = "type";
type TFilterString = "string";
type TFilterStringCount = "stringCount";
type TFilterItemType = TFilterType | TFilterString;
type TFilterChangedProperty = TFilterType | TFilterStringCount;

type TFilterCheckProps = {
  id: TFilterIDProp;
  type: TFilterItemType;
  changedFilterProperty: TFilterChangedProperty;
  isChecked: boolean;
  value: TProductValuesWithoutNullable;
};

export {
  type TFilterItem,
  type TFilterItems,
  type TFilterIDProp,
  type TFilterStringCountName,
  type TGuitarType,
  type TFilterCheckProps,
  type TFilterItemType,
  type TFilterChangedProperty,
};
