import { TGuitarType } from '@project/shared/core';

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
type TFilterItemType = TFilterType | TFilterString;

type TFilterCheckProps = {
  id: TFilterIDProp;
  type: TFilterItemType;
  checked: boolean;
};

export {
  type TFilterItem,
  type TFilterItems,
  type TFilterIDProp,
  type TFilterStringCountName,
  type TGuitarType,
  type TFilterCheckProps,
  type TFilterItemType,
};
