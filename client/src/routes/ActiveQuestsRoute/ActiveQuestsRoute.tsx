import type React from 'react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { COMP_PAGINATION_SIZE } from '../../constants/constants.ts';
import ProfileSidebar from '../../components/Sidebar/ProfileSideBar/ProfileSidebar.tsx';
import {
  ActiveQuest,
  ActiveQuestsCard,
} from '../../components/QuestsCards/ActiveQuestCard.tsx';

import './ActiveQuestsRoute.css';

interface Action {
  type: string;
  payload: { source: ActiveQuest[]; page: number };
}

// Mock data - replace with API call
const mockQuests: ActiveQuest[] = Array(13)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: 'TOP ARCHITECTURE BUILDINGS',
    category: 'Architecture',
    username: 'Username',
    timeRemaining: '2:12:10:2',
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: 5,
    maxRating: 5,
  })); ///

const ActiveQuestsRoute: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredQuests, dispatchFilteredQuests] = useReducer(reducer, [
    ...mockQuests,
  ]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const totalPages = Math.ceil(mockQuests.length / COMP_PAGINATION_SIZE); // logic

  function reducer(
    state: ActiveQuest[],
    { type, payload }: Action,
  ): ActiveQuest[] {
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
    <div className="active-quests">
      <div className="container active-quests__container">
        <ProfileSidebar activeItem="activeQuests" />

        <div className="active-quests__content">
          <div className="active-quests__header">
            <h1 className="active-quests__title" ref={titleRef}>
              Your Active Quests
            </h1>
          </div>

          <div className="active-quests__grid">
            {filteredQuests.map((quest) => (
              <ActiveQuestsCard key={quest.id} {...quest} />
            ))}
          </div>

          <div className="active-quests__pagination">
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

export default ActiveQuestsRoute;
