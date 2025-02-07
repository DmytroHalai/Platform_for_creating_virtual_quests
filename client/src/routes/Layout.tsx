import { JSX } from 'react';
import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <div className="">
      Layout
      <Outlet />
    </div>
  );
}

export default Layout;
