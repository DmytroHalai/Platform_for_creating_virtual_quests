import type React from 'react';
import { Link} from 'react-router-dom';
import {
  FaUser,
  FaEdit,
  FaScroll,
  FaClipboardList,
  FaCheckSquare,
  FaSignOutAlt,
} from 'react-icons/fa';
import './ProfileSidebar.css';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ElementType;
  path: string;
}

const menuItems: MenuItem[] = [
  { id: 'profile', title: 'Profile', icon: FaUser, path: '/profile' },
  { id: 'edit', title: 'Edit', icon: FaEdit, path: '/profile/edit' },
  {
    id: 'myQuests',
    title: 'My Quests',
    icon: FaScroll,
    path: '/profile/myQuests',
  },
  {
    id: 'activeQuests',
    title: 'Active Quests',
    icon: FaClipboardList,
    path: '/profile/activeQuests',
  },
  {
    id: 'completedQuests',
    title: 'Completed Quests',
    icon: FaCheckSquare,
    path: '/profile/completedQuests',
  },
  { id: 'logout', title: 'Log Out', icon: FaSignOutAlt, path: '/' },
];

interface ProfileSidebarProps {
  activeItem?: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeItem = 'profile',
}) => {
  
  const handleLogout = () => {
    // logoutUser();
    /// Handle logout logic
    alert('logout');
    return;
  };

  return (
    <aside className="profile-sidebar">
      <nav className="profile-sidebar__nav">
        {menuItems.map((item, index) =>
          index !== menuItems.length - 1 ? (
            <Link
              to={item.path}
              key={item.id}
              className={`profile-sidebar__item ${
                activeItem === item.id ? 'active' : ''
              }`}
            >
              <item.icon className="profile-sidebar__item-icon" />
              <span className="profile-sidebar__item-title">{item.title}</span>
            </Link>
          ) : (
            <Link
              to={item.path}
              key={item.id}
              className={`profile-sidebar__item ${
                activeItem === item.id ? 'active' : ''
              }`}
              onClick={handleLogout}
            >
              <item.icon className="profile-sidebar__item-icon" />
              <span className="profile-sidebar__item-title">{item.title}</span>
            </Link>
          ),
        )}
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
