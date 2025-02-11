import React, { JSX } from 'react';
import { Link } from 'react-router-dom';

import './NavigateBtn.css';

interface NavBtn {
  title: string;
  path: string;
  className?: string;
}

function NavigateBtn({ title, path, className }: NavBtn): JSX.Element {
  return (
    <Link to={path} className={`${className ? className : ''} navigate-btn`}>
      {title}
    </Link>
  );
}
export default NavigateBtn;
