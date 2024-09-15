/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeEvent } from 'react';
import {
  FILTER_DEFAULT_STATE,
  TFilterCheckProps,
  TFilterIDProp,
  TFilterItems,
  TFilterItemType,
} from '../../common';

type TFilterProps = {
  filters: TFilterItems;
  onFilterCheck: (options: TFilterCheckProps) => void;
  onFilterClear: () => void;
};

function Filter({
  filters = FILTER_DEFAULT_STATE,
  onFilterCheck = () => {},
  onFilterClear = () => {},
}: TFilterProps): JSX.Element {
  console.log(filters);
  const handleFilterCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target: TFilterCheckProps = {
      id: e.target.id as TFilterIDProp,
      type: e.target.dataset.type as TFilterItemType,
      checked: e.target.checked,
    };

    onFilterCheck(target);
  };

  const handleFilterClear = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    onFilterClear();
  };

  const renderTypeFilters = filters.type.map((item) => (
    <div
      className="form-checkbox catalog-filter__block-item"
      key={`${item.id}-${item.checked}`}
    >
      <input
        className="visually-hidden"
        type="checkbox"
        id={item.id}
        name={item.id}
        checked={item.checked}
        disabled={item.disabled}
        data-type="type"
        onChange={handleFilterCheck}
      />
      <label htmlFor={item.id}>{item.label}</label>
    </div>
  ));

  const renderStringFilters = filters.string.map((item) => (
    <div
      className="form-checkbox catalog-filter__block-item"
      key={`${item.id}-${item.checked}`}
    >
      <input
        className="visually-hidden"
        type="checkbox"
        id={item.id}
        name={item.id}
        checked={item.checked}
        disabled={item.disabled}
        data-type="string"
        onChange={handleFilterCheck}
      />
      <label htmlFor={item.id}>{item.label}</label>
    </div>
  ));

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {renderTypeFilters}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
          Количество струн
        </legend>
        {renderStringFilters}
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={handleFilterClear}
      >
        Очистить
      </button>
    </form>
  );
}

export { Filter };
