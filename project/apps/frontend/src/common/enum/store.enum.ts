enum AppRoute {
  Main = '/',
  Register = '/register',
  Login = '/login',
  Product = '/product',
  Item = '/item',
  Products = '/products',
  NotFound = '*',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum NameSpace {
  App = 'APP',
  User = 'USER',
  Product = 'PRODUCT',
  Products = 'PRODUCTS',
}

enum APIRoute {
  Products = '/products',
  Product = '/products/{itemId}',
  Login = '/auth/login',
  Register = '/auth/register',
}

enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}

export {
  AppRoute,
  AuthorizationStatus,
  NameSpace,
  APIRoute,
  RequestStatus,
};
