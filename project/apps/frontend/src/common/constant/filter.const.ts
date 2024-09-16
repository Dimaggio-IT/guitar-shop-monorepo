import { TFilterItems } from '../type/filter.type';

const FILTER_DEFAULT_STATE: TFilterItems = {
  type: [
    {
      id: "acoustics",
      label: "Акустические гитары",
      checked: false,
      disabled: false,
      value: "acoustics"
    },
    {
      id: "electro",
      label: "Электрогитары",
      checked: false,
      disabled: false,
      value: "electro"
    },
    {
      id: "ukukule",
      label: "Укулеле",
      checked: false,
      disabled: false,
      value: "ukukule"
    }
  ],
  string: [
    {
      id: "4-strings",
      label: "4",
      checked: false,
      disabled: false,
      value: "4"
    },
    {
      id: "6-strings",
      label: "6",
      checked: false,
      disabled: false,
      value: "6"
    },
    {
      id: "7-strings",
      label: "7",
      checked: false,
      disabled: false,
      value: "7"
    },
    {
      id: "12-strings",
      label: "12",
      checked: false,
      disabled: false,
      value: "12"
    },
  ]
} as const;


export {
  FILTER_DEFAULT_STATE
};
