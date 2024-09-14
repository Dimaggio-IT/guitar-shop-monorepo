import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../common';

const CRUMBS_MAPPING = {
  products: 'Товары',
} as const;

function Breadcrumbs(): JSX.Element {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <li className="breadcrumbs__item">
          <Link to={currentLink}>{CRUMBS_MAPPING[crumb as keyof typeof CRUMBS_MAPPING]}</Link>
        </li>
      );
    });

  crumbs.unshift(
    <li className="breadcrumbs__item">
      <Link to={AppRoute.Login}>Вход</Link>
    </li>
  );

  return <ul className="breadcrumbs">{crumbs}</ul>;
}

export { Breadcrumbs };
