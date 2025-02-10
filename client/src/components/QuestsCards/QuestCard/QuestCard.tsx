import type React from 'react';
import { FiStar } from 'react-icons/fi';
import {Link} from 'react-router-dom'
import './QuestCard.css';

interface QuestCardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  maxRating?: number;
  path: string;
}

const QuestCard: React.FC<QuestCardProps> = ({
  image,
  title,
  description,
  rating,
  maxRating = 5,
  path,
}) => {
  return (
    <Link to={path} className="quest-card">
      <div className="quest-card__image">
        <img src={image || '/placeholder.svg'} alt={title} />
      </div>
      <div className="quest-card__content">
        <h3 className="quest-card__title">{title}</h3>
        <p className="quest-card__description">{description}</p>
        <div className="quest-card__rating">
          <span>
            {rating}/{maxRating}
          </span>
          <FiStar className="quest-card__rating-star" />
        </div>
      </div>
    </Link>
  );
};

export default QuestCard;
