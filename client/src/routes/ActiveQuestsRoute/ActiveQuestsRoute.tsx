"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import ProfileSidebar from "../../components/Sidebar/ProfileSidebar/ProfileSidebar"
import "./ActiveQuestsRoute.css"
import { ActiveQuest, ActiveQuestsCard} from '../../components/QuestsCards/ActiveQuestCard.tsx';

// Mock data - replace with API call
const mockQuests: ActiveQuest[] = Array(9)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "TOP ARCHITECTURE BUILDINGS",
    category: "Architecture",
    username: "Username",
    timeRemaining: "2:12:10:2",
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: 5,
    maxRating: 5,
  })) ///

const ActiveQuestsRoute: React.FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5 /// Replace with actual total pages from API

  const handleQuestClick = (questId: number) => {
    navigate(`/quest/${questId}`)
  }

  return (
    <div className="active-quests">
      <div className="container active-quests__container">
        <ProfileSidebar activeItem="activeQuests" />

        <div className="active-quests__content">
          <div className="active-quests__header">
            <h1 className="active-quests__title">Your Active Quests</h1>
          </div>

          <div className="active-quests__grid">
            {mockQuests.map((quest) => (
              <ActiveQuestsCard key={quest.id} {...quest} onClick={() => handleQuestClick(quest.id)} />
            ))}
          </div>

          <div className="active-quests__pagination">
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

export default ActiveQuestsRoute

