

import { JSX } from 'react';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo logo">
          <img src={logo} alt="logo" className="logo__image" />
          <span className="header__logo-text logo__text">aman</span>
        </Link>
        <Navigation className="header__nav" />
      </div>
    </header>
  );
}

export default Header;
