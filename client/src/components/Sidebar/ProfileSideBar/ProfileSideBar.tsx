import type React from "react"
import { useNavigate } from "react-router-dom"
import { FaUser, FaEdit, FaScroll, FaClipboardList, FaCheckSquare, FaSignOutAlt } from "react-icons/fa"
import "./ProfileSidebar.css"

interface MenuItem {
  id: string
  title: string
  icon: React.ElementType
  path?: string
  action?: () => void
}

const menuItems: MenuItem[] = [
  { id: "profile", title: "Profile", icon: FaUser, path: "/profile" },
  { id: "edit", title: "Edit", icon: FaEdit, path: "/profile/edit" },
  { id: "myQuests", title: "My Quests", icon: FaScroll, path: "/profile/myQuests" },
  { id: "activeQuests", title: "Active Quests", icon: FaClipboardList, path: "/profile/activeQuests" },
  { id: "completedQuests", title: "Completed Quests", icon: FaCheckSquare, path: "/profile/completedQuests" },
  { id: "logout", title: "Log Out", icon: FaSignOutAlt },
]

interface ProfileSidebarProps {
  activeItem?: string
  onLogout?: () => void
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeItem = "profile", onLogout }) => {
  const navigate = useNavigate()

  const handleItemClick = (item: MenuItem) => {
    if (item.id === "logout") {
      navigate('/')
      /// Handle logout logic
      return
    }
    if (item.path) {
      navigate(item.path)
    }
  }

  return (
    <aside className="profile-sidebar">
      <nav className="profile-sidebar__nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`profile-sidebar__item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item)}
          >
            <item.icon className="profile-sidebar__item-icon" />
            <span className="profile-sidebar__item-title">{item.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default ProfileSidebar

