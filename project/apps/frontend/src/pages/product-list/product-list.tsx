import { Breadcrumbs, Cards, Filter, Pagination, Sort } from '../../components';

function ProductList(): JSX.Element {
  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <Breadcrumbs />
          <div className="catalog">
            <Filter />
            <Sort />
            <Cards />
          </div>
          <button className="button product-list__button button--red button--big">
            Добавить новый товар
          </button>
          <Pagination  />
        </div>
      </section>
    </main>
  );
}

export { ProductList };
