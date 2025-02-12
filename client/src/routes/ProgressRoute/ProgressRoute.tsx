import type React from 'react';
import { useState, useReducer, useEffect, useRef } from 'react';
import CategorySideBar from '../../components/Sidebar/CategorySideBar/CategorySideBar';
import { ActiveQuestsCard } from '../../components/QuestsCards/ActiveQuestCard';
import { CompletedQuestCard } from '../../components/QuestsCards/CompletedQuestCard';
import { COMP_PAGINATION_SIZE } from '../../constants/constants';
import './ProgressRoute.css';
import service from '../../services/service';
import { API_USERS_PROFILE } from '../../services/api';

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
  payload: { category: string; source: Quest[]; page: number };
}

const ProgressRoute: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeQuestsPage, setActiveQuestsPage] = useState(1);
  const [completedQuestsPage, setCompletedQuestsPage] = useState(1);
  const [progress, dispatchProgress] = useReducer(progressReducer, {
    activeQuests: [],
    completedQuests: [],
  });
  const [filteredActiveQuests, dispatchFilteredActiveQuests] = useReducer(
    reducer,
    [...progress.activeQuests]
  );
  const [filteredCompletedQuests, dispatchFilteredCompletedQuests] = useReducer(
    reducer,
    [...progress.completedQuests]
  );

  const activeQuestsRef = useRef<HTMLHeadingElement | null>(null);
  const completedQuestsRef = useRef<HTMLHeadingElement | null>(null);

  const totalActivePages = Math.ceil(
    progress.activeQuests.length / COMP_PAGINATION_SIZE
  );
  const totalCompletedPages = Math.ceil(
    progress.completedQuests.length / COMP_PAGINATION_SIZE
  );

  function reducer(state: any[], { type, payload }: Action): any[] {
    switch (type) {
      case 'filter':
        const startIndex = (payload.page - 1) * COMP_PAGINATION_SIZE;
        return payload.source
          .filter(
            (quest: any) =>
              payload.category.toLowerCase() === 'all' ||
              quest.quest.category.toLowerCase() ===
                payload.category.toLowerCase()
          )
          .slice(startIndex, startIndex + COMP_PAGINATION_SIZE);
      default:
        return state;
    }
  }

  function progressReducer(state: any, { type, payload }: any) {
    switch (type) {
      case 'set':
        const [activeQuests, completedQuests] = payload.reduce(
          (acc, quest) => {
            if (quest.status === 'started') {
              acc[0].push(quest);
            } else if (quest.status === 'finished') {
              acc[1].push(quest);
            }
            return acc;
          },
          [[], []]
        );
        return { activeQuests: activeQuests, completedQuests: completedQuests };
      default:
        return state;
    }
  }

  function scrollToTitle(ref: React.RefObject<HTMLElement | null>) {
    ref.current?.scrollIntoView();
  }

  useEffect(() => {
    dispatchFilteredActiveQuests({
      type: 'filter',
      payload: {
        category: selectedCategory,
        source: progress.activeQuests,
        page: 1,
      },
    });
    dispatchFilteredCompletedQuests({
      type: 'filter',
      payload: {
        category: selectedCategory,
        source: progress.completedQuests,
        page: 1,
      },
    });
    setActiveQuestsPage(1);
    setCompletedQuestsPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    dispatchFilteredActiveQuests({
      type: 'filter',
      payload: {
        category: selectedCategory,
        source: progress.activeQuests,
        page: activeQuestsPage,
      },
    });
  }, [activeQuestsPage]);

  useEffect(() => {
    dispatchFilteredCompletedQuests({
      type: 'filter',
      payload: {
        category: selectedCategory,
        source: progress.completedQuests,
        page: completedQuestsPage,
      },
    });
  }, [completedQuestsPage]);

  async function getData() {
    return await service.get(API_USERS_PROFILE);
  }

  useEffect(() => {
    (async () => {
      const res = await getData();
      dispatchProgress({ type: 'set', payload: res.progress });
    })();
  }, []);
  console.log(progress);
  console.log(filteredActiveQuests);
  return (
    <div className="progress-page">
      <div className="container progress-page__container">
        <CategorySideBar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <div className="progress-page__content">
          <section className="progress-section">
            <h2 className="progress-section__title" ref={activeQuestsRef}>
              Your Active Quests
            </h2>
            <div className="progress-section__grid">
              {filteredActiveQuests.map((quest) => (
                <ActiveQuestsCard
                  key={quest.id}
                  id={quest.progress_id}
                  title={quest.quest.title}
                  category={quest.quest.category}
                  username={quest.user.username}
                  timeRemaining={quest.remainingTime}
                  image={quest.quest.photo}
                />
              ))}
            </div>
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => {
                  setActiveQuestsPage((p) => Math.max(1, p - 1));
                  scrollToTitle(activeQuestsRef);
                }}
                disabled={activeQuestsPage === 1}
              >
                &lt;
              </button>
              <span className="pagination-current">{activeQuestsPage}</span>
              <button
                className="pagination-btn"
                onClick={() => {
                  setActiveQuestsPage((p) => p + 1);
                  scrollToTitle(activeQuestsRef);
                }}
                disabled={activeQuestsPage === totalActivePages}
              >
                &gt;
              </button>
            </div>
          </section>

          <section className="progress-section">
            <h2 className="progress-section__title" ref={completedQuestsRef}>
              Your Completed Quests
            </h2>
            <div className="progress-section__grid">
              {filteredCompletedQuests.map((quest) => (
                <CompletedQuestCard
                  isRated={false}
                  key={quest.quest.quest_id}
                  username={quest.user.username}
                  title={quest.quest.title}
                  category={quest.quest.category}
                  image={quest.quest.photo}
                />
              ))}
            </div>
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => {
                  setCompletedQuestsPage((p) => Math.max(1, p - 1));
                  scrollToTitle(completedQuestsRef);
                }}
                disabled={completedQuestsPage === 1}
              >
                &lt;
              </button>
              <span className="pagination-current">{completedQuestsPage}</span>
              <button
                className="pagination-btn"
                onClick={() => {
                  setCompletedQuestsPage((p) => p + 1);
                  scrollToTitle(completedQuestsRef);
                }}
                disabled={completedQuestsPage === totalCompletedPages}
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
