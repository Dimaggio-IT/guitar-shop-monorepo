import { useState } from 'react';
import { Breadcrumbs, Cards, Filter, Pagination, Sort } from '../../components';
import {
  TSortingValues,
  TDirectionValues,
} from '../../common/type/sorting.type';
import { DEFAULT_SORT_BY, DEFAULT_SORT_DIRECTION } from '../../common';

function Main(): JSX.Element {
  const [sortBy, setSortBy] = useState<TSortingValues>(DEFAULT_SORT_BY);

  const [sortDirection, setSortDirection] = useState<TDirectionValues>(
    DEFAULT_SORT_DIRECTION
  );

  const handleSortBy = (sorting: TSortingValues) => {
    setSortBy(sorting);
  };

  const handleSortDirection = (direction: TDirectionValues) => {
    setSortDirection(direction);
  };

  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <Breadcrumbs />
          <div className="catalog">
            <Filter />
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
