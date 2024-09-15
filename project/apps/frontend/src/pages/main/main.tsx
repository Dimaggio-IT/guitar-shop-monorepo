import { useEffect, useState } from 'react';
import { Breadcrumbs, Cards, Filter, Pagination, Sort } from '../../components';
import {
  TSortingValues,
  TDirectionValues,
} from '../../common/type/sorting.type';
import {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIRECTION,
  FILTER_DEFAULT_STATE,
  TFilterCheckProps,
  TFilterItems,
} from '../../common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getAsyncProducts,
  selectIsEmptyProducts,
  selectProducts,
} from '../../store';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectProducts);
  const isEmptyProducts = useAppSelector(selectIsEmptyProducts);

  const [sortBy, setSortBy] = useState<TSortingValues>(DEFAULT_SORT_BY);
  const [filters, setFilters] = useState<TFilterItems>(FILTER_DEFAULT_STATE);
  const [products, setProducts] = useState(data);
  const [sortDirection, setSortDirection] = useState<TDirectionValues>(
    DEFAULT_SORT_DIRECTION
  );

  useEffect(() => {
    dispatch(getAsyncProducts());
  }, [dispatch]);

  const handleSortBy = (sorting: TSortingValues) => {
    setSortBy(sorting);
  };

  const handleSortDirection = (direction: TDirectionValues) => {
    setSortDirection(direction);
  };

  const handleFilterCheck = ({ id, type, checked }: TFilterCheckProps) => {
    const foundedItemCopy = { ...filters[type].find((item) => item.id === id) };
    foundedItemCopy.checked = !foundedItemCopy.checked;
    const newItems = filters[type].map((item) =>
      item.id === id ? foundedItemCopy : item
    );
    const newFilters = {
      ...filters,
      [type]: newItems,
    };

    setFilters(newFilters);
  };

  const handleFilterClear = () => {
    setFilters(FILTER_DEFAULT_STATE);
  };

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
              sorting={sortBy}
              direction={sortDirection}
              onSortingChange={handleSortBy}
              onDirectionChange={handleSortDirection}
            />
            <Cards />
          </div>
          <button className="button product-list__button button--red button--big">
            Добавить новый товар
          </button>
          <Pagination />
        </div>
      </section>
    </main>
  );
}

export { Main };
