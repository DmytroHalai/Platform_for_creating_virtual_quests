import type React from "react"
import { FaStar } from "react-icons/fa"
import "./QuestCard.css"

interface QuestCardProps {
  image: string
  title: string
  description: string
  rating: number
  maxRating?: number
  onClick?: () => void
}

const QuestCard: React.FC<QuestCardProps> = ({ image, title, description, rating, maxRating = 5, onClick }) => {
  return (
    <div className="quest-card" onClick={onClick}>
      <div className="quest-card__image">
        <img src={image || "/placeholder.svg"} alt={title} />
      </div>
      <div className="quest-card__content">
        <h3 className="quest-card__title">{title}</h3>
        <p className="quest-card__description">{description}</p>
        <div className="quest-card__rating">
          <span>
            {rating}/{maxRating}
          </span>
          <FaStar className="quest-card__rating-star" />
        </div>
      </div>
    </div>
  )
}

export default QuestCard

