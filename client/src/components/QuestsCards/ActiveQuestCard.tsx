import React from 'react';
import { FaStar } from 'react-icons/fa';

export interface ActiveQuest {
  id: number
  title: string
  category: string
  username: string
  timeRemaining: string
  image: string
  rating: number
  maxRating: number
}

export const ActiveQuestsCard: React.FC<ActiveQuest & { onClick: () => void }> = ({
                                                                             title,
                                                                             category,
                                                                             username,
                                                                             timeRemaining,
                                                                             image,
                                                                             rating,
                                                                             maxRating,
                                                                             onClick,
                                                                           }) => {
  return (
    <div className="active-quest-card" onClick={onClick}>
      <div className="active-quest-card__image-container">
        <img src={image || "/placeholder.svg"} alt={title} className="active-quest-card__image" />
      </div>
      <div className="active-quest-card__content">
        <h3 className="active-quest-card__title">{title}</h3>
        <div className="active-quest-card__details">
          <span className="active-quest-card__category">{category}</span>
          <span className="active-quest-card__username">{username}</span>
        </div>
        <div className="active-quest-card__footer">
          <span className="active-quest-card__time">Time: {timeRemaining}</span>
          <span className="active-quest-card__rating">
            {rating}/{maxRating} <FaStar />
          </span>
        </div>
      </div>
    </div>
  )
}