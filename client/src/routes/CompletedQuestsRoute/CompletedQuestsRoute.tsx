"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaStar, FaRegStar } from "react-icons/fa"
import ProfileSidebar from "../../components/Sidebar/ProfileSidebar/ProfileSidebar"
import "./CompletedQuestsRoute.css"
import "../../components/QuestsCards/CompletedQuestCard.tsx"
import { CompletedQuest, CompletedQuestCard } from '../../components/QuestsCards/CompletedQuestCard.tsx';


// Mock data - replace with API call
const mockQuests: CompletedQuest[] = Array(15)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "TOP ARCHITECTURE BUILDINGS",
    category: "Architecture",
    username: "Username",
    completedAt: "12.02.2025, 12:00",
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: index % 2 === 0 ? 5 : null, // Some quests rated, some not
    maxRating: 5,
    isRated: index % 2 === 0,
  })) ///

const CompletedQuestsRoute: React.FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5 /// Replace with actual total pages from API

  const handleQuestClick = (questId: number) => {
    navigate(`/quest/${questId}`)
  }

  const handleRateClick = (questId: number) => {
    // Implement rating logic here
    console.log(`Rating quest with ID: ${questId}`)
  }

  return (
    <div className="completed-quests">
      <div className="container completed-quests__container">
        <ProfileSidebar activeItem="completedQuests" />

        <div className="completed-quests__content">
          <div className="completed-quests__header">
            <h1 className="completed-quests__title">Your Completed Quests</h1>
          </div>

          <div className="completed-quests__grid">
            {mockQuests.map((quest) => (
              <CompletedQuestCard
                key={quest.id}
                {...quest}
                onClick={() => handleQuestClick(quest.id)}
                onRateClick={() => handleRateClick(quest.id)}
              />
            ))}
          </div>

          <div className="completed-quests__pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span className="pagination-current">{currentPage}</span>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletedQuestsRoute