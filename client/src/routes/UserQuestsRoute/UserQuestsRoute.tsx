import type React from 'react';
import { useEffect, useReducer, useRef, useState } from 'react';

import ProfileSidebar from '../../components/Sidebar/ProfileSideBar/ProfileSidebar.tsx';
import QuestCard from '../../components/QuestsCards/QuestCard/QuestCard.tsx';
import NavigateBtn from '../../components/ui/NavigateBtn/NavigateBtn.tsx';
import { COMP_PAGINATION_SIZE } from '../../constants/constants.ts';
import './UserQuestsRoute.css';

interface Action {
  type: string;
  payload: { source: Quest[]; page: number };
}

interface Quest {
  id: number;
  image: string;
  title: string;
  description: string;
  rating: number;
  category?: string;
  maxRating: number;
}

// Mock data - replace with API call
const mockQuests = Array(14)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: 'TOP ARCHITECTURE BUILDINGS',
    description: 'THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFULL...',
    image: 'https://picsum.photos/800/600?random=${index}',
    rating: 5,
    maxRating: 5,
  })); ///

const UserQuestsRoute: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredQuests, dispatchFilteredQuests] = useReducer(reducer, [
    ...mockQuests,
  ]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const totalPages = Math.ceil(mockQuests.length / COMP_PAGINATION_SIZE); // logic

  function reducer(state: Quest[], { type, payload }: Action): Quest[] {
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
    <div className="my-quests">
      <div className="container my-quests__container">
        <ProfileSidebar activeItem="myQuests" />

        <div className="my-quests__content">
          <div className="my-quests__header">
            <h1 className="my-quests__title" ref={titleRef}>
              Your Quests
            </h1>

            <NavigateBtn
              path="/quests/createQuest"
              title="Create Quest"
              className="create-quest-btn"
            />
          </div>

          <div className="my-quests__grid">
            {filteredQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                {...quest}
                path={`/quests/${quest.id}`}
              />
            ))}
          </div>

          <div className="my-quests__pagination">
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

export default UserQuestsRoute;
