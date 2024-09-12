import { Route, Routes } from 'react-router-dom';
import {
  NotFound,
  Login,
  Main,
  Product,
  ProductList,
  Registration,
  Item,
} from '../pages';
import { AppRoute } from '../common';

function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<Main />} path="/">
        <Route path={AppRoute.Register} element={<Registration />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Products} element={<ProductList />} />
        <Route path={`${AppRoute.Product}`} element={<Product />} />
        <Route path={`${AppRoute.Item}`} element={<Item />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export { App };
