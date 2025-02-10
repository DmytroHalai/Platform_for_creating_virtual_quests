import type React from 'react';
import { useState, useReducer, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import CategorySideBar from '../../components/Sidebar/CategorySideBar/CategorySideBar';
import './ProgressRoute.css';

interface Quest {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  maxRating: number;
  category: string;
  completedAt?: string;
}

interface Action {
  type: string;
  source: Quest[];
  payload?: string;
}

// Mock data - replace with API call
const mockActiveQuests: Quest[] = Array(3)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: 'TOP ARCHITECTURE BUILDINGS',
    description: 'THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFULL...',
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: 5,
    maxRating: 5,
    category: index % 2 ? 'architecture' : 'art',
  })); ///

const mockCompletedQuests: Quest[] = Array(6)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: 'TOP ARCHITECTURE BUILDINGS',
    description: 'THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFULL...',
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: 5,
    maxRating: 5,
    category: index % 2 ? 'architecture' : 'art',
    completedAt: '12.02.2025, 12:00',
  })); ///

const QuestCard: React.FC<Quest> = ({
  title,
  description,
  image,
  rating,
  maxRating,
  completedAt,
}) => {
  return (
    <div className="quest-card">
      <div className="quest-card__image-container">
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          className="quest-card__image"
        />
      </div>
      <div className="quest-card__content">
        <h3 className="quest-card__title">{title}</h3>
        <p className="quest-card__description">{description}</p>
        <div className="quest-card__footer">
          {completedAt && (
            <span className="quest-card__completed">
              Completed: {completedAt}
            </span>
          )}
          <div className="quest-card__rating">
            <span>
              {rating}/{maxRating}
            </span>
            <FaStar />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressRoute: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeQuestsPage, setActiveQuestsPage] = useState(1);
  const [completedQuestsPage, setCompletedQuestsPage] = useState(1);
  const [filteredActiveQuests, dispatchFilteredActiveQuests] = useReducer(
    reducer,
    [...mockActiveQuests],
  );
  const [filteredCompletedQuests, dispatchFilteredCompletedQuests] = useReducer(
    reducer,
    [...mockCompletedQuests],
  );

  useEffect(() => {
    dispatchFilteredActiveQuests({
      type: 'filter',
      payload: selectedCategory,
      source: mockActiveQuests,
    });
    dispatchFilteredCompletedQuests({
      type: 'filter',
      payload: selectedCategory,
      source: mockCompletedQuests,
    });
  }, [selectedCategory]);

  function reducer(
    state: Quest[],
    { type, payload = selectedCategory, source }: Action,
  ): Quest[] {
    switch (type) {
      case 'filter':
        return source.filter((quest) => {
          if (
            payload.toLowerCase() === 'all' ||
            quest.category.toLowerCase() === payload.toLowerCase()
          )
            return quest;
        });
      default:
        return state;
    }
  }

  return (
    <div className="progress-page">
      <div className="container progress-page__container">
        <CategorySideBar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <div className="progress-page__content">
          <section className="progress-section">
            <h2 className="progress-section__title">Your Active Quests</h2>
            <div className="progress-section__grid">
              {filteredActiveQuests.map((quest) => (
                <QuestCard key={quest.id} {...quest} />
              ))}
            </div>
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setActiveQuestsPage((p) => Math.max(1, p - 1))}
                disabled={activeQuestsPage === 1}
              >
                &lt;
              </button>
              <span className="pagination-current">{activeQuestsPage}</span>
              <button
                className="pagination-btn"
                onClick={() => setActiveQuestsPage((p) => p + 1)}
              >
                &gt;
              </button>
            </div>
          </section>

          <section className="progress-section">
            <h2 className="progress-section__title">Your Completed Quests</h2>
            <div className="progress-section__grid">
              {filteredCompletedQuests.map((quest) => (
                <QuestCard key={quest.id} {...quest} />
              ))}
            </div>
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() =>
                  setCompletedQuestsPage((p) => Math.max(1, p - 1))
                }
                disabled={completedQuestsPage === 1}
              >
                &lt;
              </button>
              <span className="pagination-current">{completedQuestsPage}</span>
              <button
                className="pagination-btn"
                onClick={() => setCompletedQuestsPage((p) => p + 1)}
              >
                &gt;
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>

  );
};

export default ProgressRoute;

