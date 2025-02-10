import { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop.ts';
import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer.tsx';

function Layout(): JSX.Element {
  return (
    <>
    <ScrollToTop/>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
