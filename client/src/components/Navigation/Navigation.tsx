import { JSX } from 'react';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import { IClass } from '../../types/components';
import './Navigation.css';

interface MenuItem {
  title: string;
  path: string;
}

const menuGuest: MenuItem[] = [
  {
    title: 'Quests',
    path: '/quests',
  },
  {
    title: 'Rating',
    path: '/rating',
  },
  {
    title: 'Sign up',
    path: '/register',
  },
  {
    title: 'Log in',
    path: '/login',
  },
];

const menuUser: MenuItem[] = [
  {
    title: 'Quests',
    path: '/quests',
  },
  {
    title: 'Progress',
    path: '/progress',
  },
  {
    title: 'Rating',
    path: '/rating',
  },
  {
    title: 'Profile',
    path: '/profile',
  },
];

function Navigation({ className }: IClass): JSX.Element {
  const authorized = true; /// redux
  const menu: MenuItem[] = authorized ? menuUser : menuGuest;

  const getClass = (value: NavLinkRenderProps): string => {
    const classes: string[] = ['nav__list-link'];
    if (value.isActive) classes.push('nav__list-link--active');
    return classes.join(' ');
  };

  return (
    <nav className={`${className ? className : ''} nav`}>
      <ul className="nav__list">
        {menu.map((item: MenuItem, index: number) => (
          <li className="nav__list-item" key={index}>
            <NavLink to={item.path} className={getClass}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
