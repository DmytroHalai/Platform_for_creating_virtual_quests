import type React from 'react';
import { useEffect, useReducer, useState } from 'react';
import Sidebar from '../../components/Sidebar/CategorySideBar/CategorySideBar.tsx';
import QuestCard from '../../components/QuestsCards/QuestCard/QuestCard.tsx';
import NavigateBtn from '../../components/ui/NavigateBtn/NavigateBtn';
import './QuestsRoute.css';

// Mock data - replace with API call
export const mockQuests = Array(9)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    image: `https://picsum.photos/800/600?random=${index}`,
    title: 'TOP ARCHITECTURE BUILDINGS',
    description: 'THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFUL...',
    rating: 5,
    category: index % 2 ? 'art' : 'science',
    time: 20,
  }));
// console.log(mockQuests.length);
// const newQuest = {
//   id: mockQuests.length,
//   image: `https://picsum.photos/800/600?random=${mockQuests.length - 1}`,
//   title: 'TOP ARCHITECTURE BUILDINGS',
//   description: 'THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFUL...',
//   rating: 5,
//   category: 'architecture',
//   time: 20,
// };

// mockQuests.push(newQuest);
// console.log(mockQuests.length);
// console.log(mockQuests);

interface Quest {
  id: number;
  image: string;
  title: string;
  description: string;
  rating: number;
  category: string;
  time: number;
}

interface Action {
  type: string;
  payload?: string;
}

// Mock data - replace with API call

const QuestsRoute: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredQuests, dispatchFilteredQuests] = useReducer(reducer, [
    ...mockQuests,
  ]);

  useEffect(() => {
    dispatchFilteredQuests({ type: 'filter', payload: selectedCategory });
  }, [selectedCategory]);

  function reducer(
    state: Quest[],
    { type, payload = selectedCategory }: Action,
  ): Quest[] {
    switch (type) {
      case 'filter':
        return mockQuests.filter((quest) => {
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
    <div className="quests-page">
      <main className="quests-page__main">
        <div className="container quests-page__container">
          <Sidebar
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <div className="quests-page__content">
            <div className="quests-page__header">
              <h1 className="quests-page__title">Quests</h1>
              <NavigateBtn
                title="Create Quest"
                path="/create-quest"
                className="quests-page__create-btn"
              />
            </div>
            <div className="quests-page__grid">
              {filteredQuests.map((quest) => (
                <QuestCard key={quest.id} {...quest} path={`${quest.id}`} />
              ))}
            </div>
            <div className="quests-page__pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <span className="pagination-current">{currentPage}</span>
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestsRoute;
