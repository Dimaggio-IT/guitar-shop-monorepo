import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';

function Layout(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export { Layout };
