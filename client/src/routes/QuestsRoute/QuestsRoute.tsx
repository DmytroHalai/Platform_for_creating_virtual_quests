import { JSX } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ICategory } from '../../components/Sidebar/Sidebar';
import {MdNature, MdArchitecture, MdScience, MdColorLens} from 'react-icons/md'

import './QuestsRoute.css';

const categorys:ICategory[] = [
  {
    icon: MdColorLens,
    title: 'Art',
  },
  {
    icon: MdScience,
    title: 'Science',
  },
  {
    icon: MdNature,
    title: 'Nature',
  },
  {
    icon: MdArchitecture,
    title: 'Architecture',
  },
]

function QuestsRoute() {
  return (
    <div>
      <Sidebar className='sidebar' categorys={categorys}/>
    </div>
  );
}

export default QuestsRoute;
