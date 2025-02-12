import type React from 'react';
import { useEffect, useReducer, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar/CategorySideBar/CategorySideBar.tsx';
import QuestCard from '../../components/QuestsCards/QuestCard/QuestCard.tsx';
import NavigateBtn from '../../components/ui/NavigateBtn/NavigateBtn';
import './QuestsRoute.css';
import { COMP_PAGINATION_SIZE } from '../../constants/constants.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { fetchQuests } from '../../store/features/quests/thunks.ts';
import { Category } from '../../constants/categorys.ts';
import service from '../../services/service.ts';
import { API_ENDP_QUESTS } from '../../services/api.ts';
import { setUsers } from '../../store/features/users/slice.ts';

// Mock data - replace with API call
export const mockQuests = Array(29)
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

interface Quest {
  quest_id: number;
  title: string;
  description: string;
  photo: string;
  ratings: { rating: number }[];
  category: string;
  time: number;
}

interface Action {
  type: string;
  payload: { category: string; source: Quest[]; page: number };
}

const QuestsRoute: React.FC = () => {
  const quests = useSelector((state: RootState) => state.quests);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredQuests, dispatchFilteredQuests] = useReducer(reducer, [
    ...quests.quests,
  ]);

  const totalPages = Math.ceil(quests.quests.length / COMP_PAGINATION_SIZE); // logic

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  function reducer(state: Quest[], { type, payload }: Action): Quest[] {
    switch (type) {
      case 'filter':
        const startIndex = (payload.page - 1) * COMP_PAGINATION_SIZE;
        return payload.source
          .filter(
            (quest: Quest) =>
              payload.category.toLowerCase() === 'all' ||
              quest.category.toLowerCase() === payload.category.toLowerCase(),
          )
          .slice(startIndex, startIndex + COMP_PAGINATION_SIZE);
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
        category: selectedCategory,
        source: quests.quests,
        page: 1,
      },
    });
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    dispatchFilteredQuests({
      type: 'filter',
      payload: {
        category: selectedCategory,
        source: quests.quests,
        page: currentPage,
      },
    });
  }, [currentPage]);

  useEffect(() => {
    if (!quests.quests.length) {
      dispatch(fetchQuests());
    }
  }, []);

  useEffect(() => {
    dispatchFilteredQuests({type: 'filter',
      payload: {
        category: selectedCategory,
        source: quests.quests,
        page: currentPage,
      },});
  }, [quests.quests]);

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
              <h1 className="quests-page__title" ref={titleRef}>
                Quests
              </h1>
              <NavigateBtn
                title="Create Quest"
                path="createQuest"
                className="quests-page__create-btn"
              />
            </div>
            <div className="quests-page__grid">
              {filteredQuests.map((_quest) => (
                <QuestCard
                  key={_quest.quest_id}
                  {..._quest}
                  image={_quest.photo}
                />
              ))}
            </div>
            <div className="quests-page__pagination">
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
                  setCurrentPage((p) => p + 1);
                  scrollToTitle(titleRef);
                }}
                disabled={currentPage === totalPages}
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
