import type React from 'react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { COMP_PAGINATION_SIZE } from '../../constants/constants.ts';
import ProfileSidebar from '../../components/Sidebar/ProfileSideBar/ProfileSidebar.tsx';
import {
  CompletedQuest,
  CompletedQuestCard,
} from '../../components/QuestsCards/CompletedQuestCard.tsx';

import './CompletedQuestsRoute.css';

interface Action {
  type: string;
  payload: { source: Quest[]; page: number };
}

// Mock data - replace with API call
const mockQuests: CompletedQuest[] = Array(15)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: 'TOP ARCHITECTURE BUILDINGS',
    category: 'Architecture',
    username: 'Username',
    completedAt: '12.02.2025, 12:00',
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: index % 2 === 0 ? 5 : null, // Some quests rated, some not
    maxRating: 5,
    isRated: index % 2 === 0,
  })); ///

const CompletedQuestsRoute: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredQuests, dispatchFilteredQuests] = useReducer(reducer, [
    ...mockQuests,
  ]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const totalPages = Math.ceil(mockQuests.length / COMP_PAGINATION_SIZE); // logic

  function reducer(
    state: CompletedQuest[],
    { type, payload }: Action,
  ): CompletedQuest[] {
    switch (type) {
      case 'filter':
        const startIndex = (payload.page - 1) * COMP_PAGINATION_SIZE;
        return payload.source.slice(
          startIndex,
          startIndex + COMP_PAGINATION_SIZE,
        );
      default:
        return state;
    }
  }

  function scrollToTitle(ref: React.RefObject<HTMLElement | null>) {
    ref.current?.scrollIntoView();
  }

  const handleRateClick = (questId: number) => {
    // Implement rating logic here
    console.log(`Rating quest with ID: ${questId}`);
  };

  useEffect(() => {
    dispatchFilteredQuests({
      type: 'filter',
      payload: {
        source: mockQuests,
        page: currentPage,
      },
    });
  }, [currentPage]);

  return (
    <div className="completed-quests">
      <div className="container completed-quests__container">
        <ProfileSidebar activeItem="completedQuests" />

        <div className="completed-quests__content">
          <div className="completed-quests__header">
            <h1 className="completed-quests__title" ref={titleRef}>
              Your Completed Quests
            </h1>
          </div>

          <div className="completed-quests__grid">
            {filteredQuests.map((quest) => (
              <CompletedQuestCard
                key={quest.id}
                {...quest}
                path={`/progress/${quest.id}`}
              />
            ))}
          </div>

          <div className="completed-quests__pagination">
            <button
              className="pagination-btn"
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                scrollToTitle(titleRef);
              }}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span className="pagination-current">{currentPage}</span>
            <button
              className="pagination-btn"
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                scrollToTitle(titleRef);
              }}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedQuestsRoute;
