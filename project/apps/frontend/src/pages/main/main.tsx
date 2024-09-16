import { useEffect, useState } from 'react';
import { Breadcrumbs, Cards, Filter, Sort } from '../../components';
import {
  TSortingValues,
  TDirectionValues,
} from '../../common/type/sorting.type';
import {
  DEFAULT_ACTIVE_SORTING,
  FILTER_DEFAULT_STATE,
  genericFilter,
  genericSort,
  IFilter,
  ISorter,
  SORT_DIRECTION,
  TFilterCheckProps,
  TFilterItems,
  TProductValuesWithoutNullable,
} from '../../common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getAsyncProducts,
  selectIsEmptyProducts,
  selectProducts,
} from '../../store';
import { IProduct } from '@project/shared/core';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectProducts);
  const isEmptyProducts = useAppSelector(selectIsEmptyProducts);

  const [activeSorter, setActiveSorter] = useState<ISorter<IProduct>>(
    DEFAULT_ACTIVE_SORTING
  );
  const [filters, setFilters] = useState<TFilterItems>(FILTER_DEFAULT_STATE);
  const [activeFilters, setActiveFilters] = useState<
    Array<IFilter<IProduct, TProductValuesWithoutNullable>>
  >([]);

  useEffect(() => {
    dispatch(getAsyncProducts());
  }, [dispatch]);

  const handleSortBy = (sorting: TSortingValues) => {
    setActiveSorter({ ...activeSorter, property: sorting });
  };

  const handleSortDirection = (direction: TDirectionValues) => {
    setActiveSorter({
      ...activeSorter,
      isDescending: direction === SORT_DIRECTION.Desc ? true : false,
    });
  };

  const handleFilterCheck = ({
    id,
    type,
    changedFilterProperty,
    isChecked,
    value,
  }: TFilterCheckProps) => {
    const foundedItemCopy = { ...filters[type].find((item) => item.id === id) };
    foundedItemCopy.checked = isChecked;
    const newItems = filters[type].map((item) =>
      item.id === id ? foundedItemCopy : item
    );

    //* для фильтрации товаров
    isChecked
      ? setActiveFilters([
          ...activeFilters,
          { property: changedFilterProperty, value },
        ])
      : setActiveFilters([
          ...activeFilters.filter(
            (filter) =>
              filter.property !== changedFilterProperty ||
              filter.value !== value
          ),
        ]);

    //* для обновления фильтров в UI
    setFilters({
      ...filters,
      [type]: newItems,
    });
  };

  const handleFilterClear = () => {
    setFilters(FILTER_DEFAULT_STATE);
    setActiveFilters([]);
    setActiveSorter(DEFAULT_ACTIVE_SORTING);
  };

  const resultProducts = [...data]
    .filter((item) =>
      genericFilter<IProduct, TProductValuesWithoutNullable>(
        item,
        activeFilters
      )
    )
    .sort((itemA, itemB) => genericSort<IProduct>(itemA, itemB, activeSorter));

  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <Breadcrumbs />
          <div className="catalog">
            <Filter
              filters={filters}
              onFilterCheck={handleFilterCheck}
              onFilterClear={handleFilterClear}
            />
            <Sort
              sorting={activeSorter.property}
              direction={
                activeSorter.isDescending
                  ? SORT_DIRECTION.Desc
                  : SORT_DIRECTION.Asc
              }
              onSortingChange={handleSortBy}
              onDirectionChange={handleSortDirection}
            />
            {!isEmptyProducts && <Cards items={resultProducts} />}
          </div>
        </div>
      </section>
    </main>
  );
}

export { Main };
