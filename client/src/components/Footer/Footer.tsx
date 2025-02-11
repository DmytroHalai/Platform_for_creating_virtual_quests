import { JSX } from 'react';
import { FiInstagram, FiLinkedin, FiFacebook } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-slogan.svg';

import './Footer.css';

interface ILink {
  title: string;
  path: string;
}
interface IIcon {
  icon: IconType;
  path: string;
  alt: string;
}

const company: ILink[] = [
  {
    title: 'About Us',
    path: '/',
  },
  {
    title: 'Privacy Policy',
    path: '/',
  },
  {
    title: 'FAQ',
    path: '/',
  },
];

const help: ILink[] = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Profile',
    path: '/profile',
  },
  {
    title: 'Quests',
    path: '/quests',
  },
];

const contacts: ILink[] = [
  {
    title: 'aman@gmail.com',
    path: 'mailto:aman@gmail.com',
  },
  {
    title: '+(380) 44 2354',
    path: 'tel:+380442354',
  },
];

const socialMedia: IIcon[] = [
  {
    icon: FiInstagram,
    path: 'https://www.instagram.com/',
    alt: 'Instagram',
  },
  {
    icon: FaXTwitter,
    path: 'https://x.com/',
    alt: 'X',
  },
  {
    icon: FiLinkedin,
    path: 'https://www.linkedin.com/',
    alt: 'Linkedin',
  },
  {
    icon: FiFacebook,
    path: 'https://www.facebook.com/',
    alt: 'Facebook',
  },
];

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Link to="/" className="footer__logo-slogan logo-slogan">
          <img
            src={logo}
            alt="logo with slogan"
            className="logo-slogan__image"
          />
        </Link>
        <div className="footer__content">
          <div className="footer__map">
            <div className="footer__sitemap">
              <h6 className="footer__sitemap-title">Company</h6>
              <ul className="footer__sitemap-list">
                {company.map((link: ILink, index: number) => (
                  <li key={index} className="footer__sitemap-list-item">
                    <Link className="footer__sitemap-list-link" to={link.path}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__sitemap">
              <h6 className="footer__sitemap-title">Get Help</h6>
              <ul className="footer__sitemap-list">
                {help.map((link: ILink, index: number) => (
                  <li key={index} className="footer__sitemap-list-item">
                    <Link className="footer__sitemap-list-link" to={link.path}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__sitemap">
              <h6 className="footer__sitemap-title">Contacts</h6>
              <ul className="footer__sitemap-list">
                {contacts.map((link: ILink, index: number) => (
                  <li key={index} className="footer__sitemap-list-item">
                    <a className="footer__sitemap-list-link" href={link.path}>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="footer__sitemap-social">
                {socialMedia.map((item: IIcon, index: number) => (
                  <a
                    key={index}
                    href={item.path}
                    className="footer__sitemap-social-link"
                  >
                    <item.icon
                      aria-label={item.alt}
                      className="social__link-icon"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer__copyright">
            &copy;2025, aman. All right reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
