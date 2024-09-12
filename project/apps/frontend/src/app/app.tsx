import { Route, Routes } from 'react-router-dom';
import {
  NotFound,
  Login,
  Layout,
  Product,
  ProductList,
  Registration,
  Item,
} from '../pages';
import { AppRoute, AuthorizationStatus } from '../common';
import { ProtectedRoute } from '../components';

function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={AppRoute.Register} element={<Registration />} />
        
        <Route path={AppRoute.Login} element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
            >
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path={`${AppRoute.Product}`}
          element={
            <ProtectedRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
            >
              <Product />
            </ProtectedRoute>
          }
        />

        <Route
          path={`${AppRoute.Item}`}
          element={
            <ProtectedRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Login}
            >
              <Item />
            </ProtectedRoute>
          }
        />

        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export { App };
