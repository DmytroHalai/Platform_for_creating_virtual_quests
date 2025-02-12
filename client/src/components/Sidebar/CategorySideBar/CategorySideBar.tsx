import type React from "react"
import "./CategorySideBar.css"
import questCategories, {Category} from "../../../constants/categorys"


interface SidebarProps {
  onCategorySelect?: (category: string) => void
  selectedCategory?: string
}

const CategorySideBar: React.FC<SidebarProps> = ({ onCategorySelect, selectedCategory }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar__categories">
        
        {questCategories.map((category) => (
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