import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

export interface UserRating {
  id: number;
  username: string;
  avatar: string;
  rating: number;
  maxRating: number;
}

export const UserRatingCard: React.FC<UserRating> = ({
  id,
  username,
  avatar,
  rating,
  maxRating,
}) => {
  return (
    <Link to={`/rating/${id}`} className="user-rating-card">
      <div className="user-rating-card__avatar-container">
        <img
          src={avatar || '/placeholder.svg'}
          alt={username}
          className="user-rating-card__avatar"
        />
      </div>
      <div className="user-rating-card__info">
        <span className="user-rating-card__username">{username}</span>
        <div className="user-rating-card__rating">
          <span>
            {rating}/{maxRating}
          </span>
          <FaStar />
        </div>
      </div>
    </Link>
  );
};
