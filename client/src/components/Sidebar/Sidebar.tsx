import { JSX } from 'react';
import {IconType} from 'react-icons'
import { Link } from 'react-router-dom';

interface ICategory {
  icon: IconType,
  title: string,
}



function Sidebar({className, categorys}: {categorys: ICategory[], className?: string }): JSX.Element {
  return <aside className={`${className?className:''} sidebar`}>
    <ul className="sidebar__list">
      {/* {categorys.map((category:ICategory)=> )} */}
    </ul>
  </aside>;
}

export default Sidebar;
export type {ICategory};
