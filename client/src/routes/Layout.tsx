import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer.tsx';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
