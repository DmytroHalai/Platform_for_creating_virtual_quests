"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ProfileSidebar from "../../components/Sidebar/ProfileSidebar/ProfileSidebar"
import QuestCard from "../../components/QuestsCards/QuestCard/QuestCard.tsx"
import "./UserQuestsRoute.css"

// Mock data - replace with API call
const mockQuests = Array(9)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "TOP ARCHITECTURE BUILDINGS",
    description: "THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFULL...",
    image: "https://picsum.photos/800/600?random=${index}",
    rating: 5,
    maxRating: 5,
  })) ///

const UserQuestsRoute: React.FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5 /// Replace with actual total pages from API

  const handleCreateQuest = () => {
    navigate("/quests/create-quest")
  }

  const handleQuestClick = (questId: number) => {
    navigate(`/quests/${questId}`)
  }

  return (
    <div className="my-quests">
      <div className="container my-quests__container">
        <ProfileSidebar activeItem="myQuests" />

        <div className="my-quests__content">
          <div className="my-quests__header">
            <h1 className="my-quests__title">Your Quests</h1>
            <button className="create-quest-btn" onClick={handleCreateQuest}>
              Create Quest
            </button>
          </div>

          <div className="my-quests__grid">
            {mockQuests.map((quest) => (
              <QuestCard key={quest.id} {...quest} onClick={() => handleQuestClick(quest.id)} />
            ))}
          </div>

          <div className="my-quests__pagination">
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

export default UserQuestsRoute

