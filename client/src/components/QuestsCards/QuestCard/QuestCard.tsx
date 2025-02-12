import type React from 'react';
import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './QuestCard.css';
import { MAX_RATING } from '../../../constants/constants';
import { useMemo } from 'react';

interface QuestCardProps {
  quest_id: number;
  image: string;
  title: string;
  description: string;
  ratings: { rating: number }[];
  category?: string;
  time?: number;
}

const QuestCard: React.FC<QuestCardProps> = ({
  quest_id,
  image,
  title,
  description,
  ratings,
  category,
}) => {
  const resultRating = useMemo(() => {
    if (ratings.length) {
      return (
        Math.round(
          (ratings.reduce((sum, { rating }) => sum + rating, 0) /
            ratings.length) *
            10,
        ) / 10
      );
    }else{
      return '-';
    }
  }, [ratings]);

  return (
    <Link to={`/quests/${quest_id}`} className="quest-card">
      <div className="quest-card__image">
        <img src={image || '/placeholder.svg'} alt={title} />
      </div>
      <div className="quest-card__content">
        <h3 className="quest-card__title">{title}</h3>
        <p className="quest-card__description">{description}</p>
        <div className="quest-card__rating">
          <span>
            {resultRating}/{MAX_RATING}
          </span>
          <FiStar className="quest-card__rating-star" />
        </div>
      </div>
    </Link>
  );
};

export default QuestCard;
