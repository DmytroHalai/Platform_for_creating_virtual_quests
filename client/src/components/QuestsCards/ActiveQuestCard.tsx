import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export interface ActiveQuest {
  id: number;
  title: string;
  category: string;
  username: string;
  timeRemaining: any;
  image: string;
  rating: number;
  maxRating: number;
}

const ActiveQuestsCard: React.FC<ActiveQuest> = ({
  id,
  title,
  category,
  username,
  timeRemaining,
  image,
  rating,
  maxRating,
}) => {

  return (
    <Link to={`/progress/${id}`} className="active-quest-card">
      <div className="active-quest-card__image-container">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="active-quest-card__image"
        />
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
    </Link>
  );
};

export { ActiveQuestsCard };
