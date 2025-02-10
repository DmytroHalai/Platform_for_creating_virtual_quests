import type React from "react"
import { FaPalette, FaFlask, FaLeaf, FaBuilding, FaHome } from "react-icons/fa"
import "./CategorySideBar.css"

interface Category {
  id: string
  name: string
  icon: React.ElementType
}

const categories: Category[] = [
  { id: "all", name: "ALL", icon: FaHome },
  { id: "art", name: "ART", icon: FaPalette },
  { id: "science", name: "SCIENCE", icon: FaFlask },
  { id: "nature", name: "NATURE", icon: FaLeaf },
  { id: "architecture", name: "ARCHITECTURE", icon: FaBuilding },
]

interface SidebarProps {
  onCategorySelect?: (category: string) => void
  selectedCategory?: string
}

const CategorySideBar: React.FC<SidebarProps> = ({ onCategorySelect, selectedCategory }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar__categories">
        
        {categories.map((category) => (
          <button
            key={category.id}
            className={`sidebar__category ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => onCategorySelect?.(category.id)}
          >
            <category.icon className="sidebar__category-icon" />
            <span className="sidebar__category-name">{category.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default CategorySideBar