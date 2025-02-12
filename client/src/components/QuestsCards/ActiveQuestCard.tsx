import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MAX_RATING } from "../../constants/constants";

export interface ActiveQuest {
  id: number;
  title: string;
  category: string;
  username: string;
  timeRemaining: any;
  image: string;
}

const getRandom =() =>{
  const randomStep = Math.floor(Math.random() * (50 + 1));
  return (0 + randomStep * 0.1).toFixed(1);
}

const ActiveQuestsCard: React.FC<ActiveQuest> = ({
  id,
  title,
  category,
  username,
  timeRemaining,
  image,
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
            {getRandom()}/{MAX_RATING} <FaStar />
          </span>
        </div>
      </div>
    </Link>
  );
};

export { ActiveQuestsCard };
