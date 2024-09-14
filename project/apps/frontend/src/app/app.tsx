import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        path={AppRoute.Main}
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
        path={AppRoute.Login}
        index
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.Auth}
            redirectTo={AppRoute.Products}
          >
            <Login />
          </ProtectedRoute>
        }
      />

      <Route path={AppRoute.Register} element={<Registration />} />

      <Route
        path={`${AppRoute.Products}`}
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
        path={`${AppRoute.Products}:id`}
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
        path={`${AppRoute.Item}:id`}
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
  )
);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export { App };
