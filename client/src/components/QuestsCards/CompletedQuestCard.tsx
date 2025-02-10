import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

export interface CompletedQuest {
  id: number
  title: string
  category: string
  username: string
  completedAt: string
  image: string
  rating: number | null
  maxRating: number
  isRated: boolean
}

export const CompletedQuestCard: React.FC<CompletedQuest & { onRateClick: () => void }> = ({
                                                                                      title,
                                                                                      category,
                                                                                      username,
                                                                                      completedAt,
                                                                                      image,
                                                                                      rating,
                                                                                      maxRating,
                                                                                      isRated,
                                                                                      onRateClick,
                                                                                    }) => {
  return (
    <div className="completed-quest-card">
      <div className="completed-quest-card__image-container">
        <img src={image || "/placeholder.svg"} alt={title} className="completed-quest-card__image" />
      </div>
      <div className="completed-quest-card__content">
        <h3 className="completed-quest-card__title">{title}</h3>
        <div className="completed-quest-card__info">
          <div className="completed-quest-card__details">
            <span className="completed-quest-card__category">{category}</span>
            <span className="completed-quest-card__username">{username}</span>
          </div>
          <div className="completed-quest-card__completion">
            <span className="completed-quest-card__date">Completed: {completedAt}</span>
            {isRated ? (
              <span className="completed-quest-card__rating">
                {rating}/{maxRating} <FaStar />
              </span>
            ) : (
              <button
                className="completed-quest-card__rate-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onRateClick()
                }}
              >
                Rate Quest <FaRegStar />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}