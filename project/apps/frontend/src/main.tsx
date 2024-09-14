import { getAsyncAuth, store } from './store';
import * as ReactDOM from 'react-dom/client';

import { App } from './app/app';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

store.dispatch(getAsyncAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>
);
