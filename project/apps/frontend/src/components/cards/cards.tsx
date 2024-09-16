import { IProduct } from '@project/shared/core';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../common';
import { getDateFromISO } from '../../common/helper/date';

type TCardsProps = {
  items: IProduct[];
};

function Cards({ items }: TCardsProps): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {items.map((item) => (
          <li className="catalog-item" key={item.id}>
            <div className="catalog-item__data">
              <img
                src={item.photo}
                // srcSet="img/content/catalog-product-1@2x.png 2x"
                width="36"
                height="93"
                alt="Картинка гитары"
              />
              <div className="catalog-item__data-wrapper">
                <Link className="link" to={AppRoute.Main}>
                  <p className="catalog-item__data-title">{item.name}</p>
                </Link>
                <br />
                <p className="catalog-item__data-date">
                  {getDateFromISO(
                    item.createdAt as unknown as string
                  )}
                </p>
                <p className="catalog-item__data-price">{`${item.price} ₽`}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Cards };
