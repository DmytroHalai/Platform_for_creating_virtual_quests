import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './CompletedQuestCard.css';
import { MAX_RATING } from '../../constants/constants';

export interface CompletedQuest {
  id: number;
  title: string;
  category: string;
  username: string;
  completedAt: string;
  image: string;
  rating: number | null;
  maxRating: number;
  isRated: boolean;
}

const getRandom =() =>{
  const randomStep = Math.floor(Math.random() * (50 + 1));
  return (0 + randomStep * 0.1).toFixed(1);
}

const CompletedQuestCard: React.FC<CompletedQuest & { path: string }> = ({
  id,
  title,
  category,
  username,
  image,
  isRated,
}) => {
  return (
    <div className="completed-quest-card">
      <Link
        to={`/progress`}
        className="completed-quest-card__link"
        aria-label={`Go to quest '${title}'`}
      ></Link>
      <div className="completed-quest-card__image-container">
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          className="completed-quest-card__image"
        />
      </div>

      <div className="completed-quest-card__content">
        <h3 className="completed-quest-card__title">{title}</h3>
        <div className="completed-quest-card__info">
          <div className="completed-quest-card__details">
            <span className="completed-quest-card__category">{category}</span>
            <span className="completed-quest-card__username">{username}</span>
          </div>
          <div className="completed-quest-card__completion">
            <span className="completed-quest-card__date">
              Completed
            </span>
            {isRated ? (
              <span className="completed-quest-card__rating">
                {getRandom()}/{MAX_RATING} <FaStar />
              </span>
            ) : (
              <button
                className="completed-quest-card__rate-btn"
                onClick={() => alert('rated')}
              >
                Rate Quest <FaRegStar />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CompletedQuestCard };
