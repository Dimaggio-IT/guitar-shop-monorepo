import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';

function Main(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export { Main };
