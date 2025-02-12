import type React from "react";
import { useState, useReducer, useEffect, useRef } from "react";
import CategorySideBar from "../../components/Sidebar/CategorySideBar/CategorySideBar";
import { ActiveQuestsCard } from "../../components/QuestsCards/ActiveQuestCard";
import { CompletedQuestCard } from "../../components/QuestsCards/CompletedQuestCard";
import { COMP_PAGINATION_SIZE } from "../../constants/constants";
import "./ProgressRoute.css";

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

// Mock data - replace with API call
const mockActiveQuests: Quest[] = Array(13)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "TOP ARCHITECTURE BUILDINGS",
    description: "THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFULL...",
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: 5,
    maxRating: 5,
    category: index % 2 ? "architecture" : "art",
    completedAt: "12.02.2025, 12:00",
    username: "АШОТ",
  })); ///

const mockCompletedQuests: Quest[] = Array(16)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "TOP ARCHITECTURE BUILDINGS",
    description: "THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFULL...",
    image: `https://picsum.photos/800/600?random=${index}`,
    rating: 5,
    maxRating: 5,
    category: index % 2 ? "architecture" : "art",
    completedAt: "12.02.2025, 12:00",
    isRated: index % 3 ? true : false,
  })); ///

const ProgressRoute: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeQuestsPage, setActiveQuestsPage] = useState(1);
  const [completedQuestsPage, setCompletedQuestsPage] = useState(1);
  const [filteredActiveQuests, dispatchFilteredActiveQuests] = useReducer(
    reducer,
    [...mockActiveQuests]
  );
  const [filteredCompletedQuests, dispatchFilteredCompletedQuests] = useReducer(
    reducer,
    [...mockCompletedQuests]
  );

  const activeQuestsRef = useRef<HTMLHeadingElement | null>(null);
  const completedQuestsRef = useRef<HTMLHeadingElement | null>(null);

  const totalActivePages = Math.ceil(
    mockActiveQuests.length / COMP_PAGINATION_SIZE
  ); // logic
  const totalCompletedPages = Math.ceil(
    mockCompletedQuests.length / COMP_PAGINATION_SIZE
  ); // logic

  function reducer(state: Quest[], { type, payload }: Action): Quest[] {
    switch (type) {
      case "filter":
        const startIndex = (payload.page - 1) * COMP_PAGINATION_SIZE;
        return payload.source
          .filter(
            (quest: Quest) =>
              payload.category.toLowerCase() === "all" ||
              quest.category.toLowerCase() === payload.category.toLowerCase()
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
    dispatchFilteredActiveQuests({
      type: "filter",
      payload: {
        category: selectedCategory,
        source: mockActiveQuests,
        page: 1,
      },
    });
    dispatchFilteredCompletedQuests({
      type: "filter",
      payload: {
        category: selectedCategory,
        source: mockCompletedQuests,
        page: 1,
      },
    });
    setActiveQuestsPage(1);
    setCompletedQuestsPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    dispatchFilteredActiveQuests({
      type: "filter",
      payload: {
        category: selectedCategory,
        source: mockActiveQuests,
        page: activeQuestsPage,
      },
    });
  }, [activeQuestsPage]);

  useEffect(() => {
    dispatchFilteredCompletedQuests({
      type: "filter",
      payload: {
        category: selectedCategory,
        source: mockCompletedQuests,
        page: completedQuestsPage,
      },
    });
  }, [completedQuestsPage]);

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
                  //key={quest.id}
                  id={quest.id}
                  title={quest.title}
                  category={quest.category}
                  username="anatoliy"
                  timeRemaining={quest.completedAt}
                  image={quest.image}
                  rating={quest.rating}
                  maxRating={quest.maxRating}
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
                  key={quest.id}
                  {...quest}
                  username="anatoliy"
                /> // username
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
