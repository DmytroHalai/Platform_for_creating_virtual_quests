"use client"

import type React from "react"
import { useState } from "react"
import { FaStar, FaSearch } from "react-icons/fa"
import { PiPaintBrushBold, PiTestTubeBold, PiTreeBold, PiRulerBold } from "react-icons/pi"
import "./ProgressRoute.css"

interface Category {
  id: string
  name: string
  icon: React.ElementType
}

interface Quest {
  id: number
  title: string
  description: string
  image: string
  rating: number
  maxRating: number
  category: string
  completedAt?: string
}

const categories: Category[] = [
  { id: "art", name: "ART", icon: PiPaintBrushBold },
  { id: "science", name: "SCIENCE", icon: PiTestTubeBold },
  { id: "nature", name: "NATURE", icon: PiTreeBold },
  { id: "architecture", name: "ARCHITECTURE", icon: PiRulerBold },
]

// Mock data - replace with API call
const mockActiveQuests: Quest[] = Array(3)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "TOP ARCHITECTURE BUILDINGS",
    description: "THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFULL...",
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: 5,
    maxRating: 5,
    category: "architecture",
  })) ///

const mockCompletedQuests: Quest[] = Array(6)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "TOP ARCHITECTURE BUILDINGS",
    description: "THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFULL...",
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: 5,
    maxRating: 5,
    category: "architecture",
    completedAt: "12.02.2025, 12:00",
  })) ///

const CategorySidebar: React.FC<{
  selectedCategory: string
  onCategorySelect: (category: string) => void
}> = ({ selectedCategory, onCategorySelect }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <aside className="category-sidebar">
      <div className="category-sidebar__search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="SEARCH FOR CATEGORIES"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <nav className="category-sidebar__nav">
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => onCategorySelect(category.id)}
          >
            <category.icon className="category-icon" />
            <span>{category.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

const QuestCard: React.FC<Quest> = ({ title, description, image, rating, maxRating, completedAt }) => {
  return (
    <div className="quest-card">
      <div className="quest-card__image-container">
        <img src={image || "/placeholder.svg"} alt={title} className="quest-card__image" />
      </div>
      <div className="quest-card__content">
        <h3 className="quest-card__title">{title}</h3>
        <p className="quest-card__description">{description}</p>
        <div className="quest-card__footer">
          {completedAt && <span className="quest-card__completed">Completed: {completedAt}</span>}
          <div className="quest-card__rating">
            <span>
              {rating}/{maxRating}
            </span>
            <FaStar />
          </div>
        </div>
      </div>
    </div>
  )
}

const ProgressRoute: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("architecture")
  const [activeQuestsPage, setActiveQuestsPage] = useState(1)
  const [completedQuestsPage, setCompletedQuestsPage] = useState(1)

  return (
    <div className="progress-page">
      <div className="container progress-page__container">
        <CategorySidebar selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

        <div className="progress-page__content">
          <section className="progress-section">
            <h2 className="progress-section__title">Your Active Quests</h2>
            <div className="progress-section__grid">
              {mockActiveQuests.map((quest) => (
                <QuestCard key={quest.id} {...quest} />
              ))}
            </div>
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setActiveQuestsPage((p) => Math.max(1, p - 1))}
                disabled={activeQuestsPage === 1}
              >
                &lt;
              </button>
              <span className="pagination-current">{activeQuestsPage}</span>
              <button className="pagination-btn" onClick={() => setActiveQuestsPage((p) => p + 1)}>
                &gt;
              </button>
            </div>
          </section>

          <section className="progress-section">
            <h2 className="progress-section__title">Your Completed Quests</h2>
            <div className="progress-section__grid">
              {mockCompletedQuests.map((quest) => (
                <QuestCard key={quest.id} {...quest} />
              ))}
            </div>
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCompletedQuestsPage((p) => Math.max(1, p - 1))}
                disabled={completedQuestsPage === 1}
              >
                &lt;
              </button>
              <span className="pagination-current">{completedQuestsPage}</span>
              <button className="pagination-btn" onClick={() => setCompletedQuestsPage((p) => p + 1)}>
                &gt;
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProgressRoute
