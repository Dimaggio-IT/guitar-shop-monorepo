import { TFilterItems } from '../type/filter.type';

const FILTER_DEFAULT_STATE: TFilterItems = {
  type: [
    {
      id: "acoustics",
      label: "Акустические гитары",
      checked: false,
      disabled: false,
    },
    {
      id: "electro",
      label: "Электрогитары",
      checked: false,
      disabled: false,
    },
    {
      id: "ukukule",
      label: "Укулеле",
      checked: false,
      disabled: false,
    }
  ],
  string: [
    {
      id: "4-strings",
      label: "4",
      checked: false,
      disabled: false,
    },
    {
      id: "6-strings",
      label: "6",
      checked: false,
      disabled: false,
    },
    {
      id: "7-strings",
      label: "7",
      checked: false,
      disabled: false,
    },
    {
      id: "12-strings",
      label: "12",
      checked: false,
      disabled: false,
    },
  ]
} as const;


export {
  FILTER_DEFAULT_STATE
};
