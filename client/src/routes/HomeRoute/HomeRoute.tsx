import { JSX, useEffect, useReducer, useRef, useState } from 'react';
import { FiEdit, FiStar, FiClock, FiUser } from 'react-icons/fi';
import { SiSidequest } from 'react-icons/si';

import NavigateBtn from '../../components/ui/NavigateBtn/NavigateBtn';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import { IFeature } from '../../components/InfoBlock/InfoBlock';
import logo from '../../assets/images/logo-slogan.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  fetchQuests,
  fetchQuestsCount,
} from '../../store/features/quests/thunks';
import { fetchUsersCount } from '../../store/features/users/thunk';
import questCategorys from '../../constants/categorys';
import QuestCard from '../../components/QuestsCards/QuestCard/QuestCard';
import { COMP_HOMEPAGE_PAGINATION_SIZE } from '../../constants/constants';
import IQuest from '../../types/quest';

import './HomeRoute.css';

const features1: IFeature[] = [
  {
    icon: FiEdit,
    title: 'Create',
    desc: 'Design your own interactive quests with ease and creativity.',
  },
  {
    icon: FiClock,
    title: 'Play',
    desc: 'Join exciting quests in real-time and challenge yourself.',
  },
  {
    icon: FiStar,
    title: 'Rate',
    desc: 'Explore quests created by others, rate them, and share feedback.',
  },
];

const features2: IFeature[] = [
  // redux
  {
    icon: FiUser,
    title: `Creators`, // 'number Quests'
    desc: 'Join a community of creative authors who inspire others with their ideas..',
  },
  {
    icon: FiClock,
    title: '4.6/5',
    desc: 'We strive for improvement to provide the best experience for everyone.',
  },
  {
    icon: SiSidequest,
    title: 'Quests', // 'number Creators'
    desc: 'From simple puzzles to multi-level adventures, our community offers something interesting for everyone.',
  },
];

interface Action {
  type: string;
  payload: { category: string; source: IQuest[]; page: number };
}

function HomeRoute(): JSX.Element {
  const { auth, quests, users } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredQuests, dispatchFilteredQuests] = useReducer(reducer, [
    ...quests.quests,
  ]);

  const totalPages = Math.ceil(
    quests.quests.length / COMP_HOMEPAGE_PAGINATION_SIZE
  ); // logic

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  function reducer(state: IQuest[], { type, payload }: Action): IQuest[] {
    switch (type) {
      case 'filter':
        const startIndex = (payload.page - 1) * COMP_HOMEPAGE_PAGINATION_SIZE;
        return payload.source
          .filter(
            (quest: IQuest) =>
              payload.category.toLowerCase() === 'all' ||
              quest.category.toLowerCase() === payload.category.toLowerCase()
          )
          .slice(startIndex, startIndex + COMP_HOMEPAGE_PAGINATION_SIZE);
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
    if (!quests.count) {
      dispatch(fetchQuestsCount());
    }
    if (!users.count) {
      dispatch(fetchUsersCount());
    }
    features2[0].title = quests.count
      ? `${quests.count} `
      : '2378 ' + features2[0].title;
    features2[2].title = users.count
      ? `${users.count} `
      : '1344 ' + features2[2].title;
  }, []);

  return (
    <>
      <section className="discover">
        <div className="discover__container container">
          <div className="discover__content">
            <h1 className="discover__content-title h1">
              Discover the World of Quests!
            </h1>
            <p className="discover__content-desc text">
              Create, play, rate – be part of exciting quests!
            </p>
            <NavigateBtn
              path={!auth ? `/login` : `/quests`}
              title={!auth ? `Join Now` : `Go to Quests`}
              className="discover__content-link"
            />
          </div>
          <img
            src={logo}
            alt="aman logo with slogan"
            className="discover__image"
          />
        </div>
      </section>
      <section className="features-1">
        <div className="container features-1__container">
          {features1.map((feature: IFeature, index: number) => {
            if (index + 1 !== features1.length)
              return (
                <>
                  <InfoBlock
                    key={index}
                    className="features-1__item"
                    feature={feature}
                  />
                  <div className="features-delimiter"></div>
                </>
              );
            else
              return (
                <InfoBlock
                  key={index}
                  className="features-1__item"
                  feature={feature}
                />
              );
          })}
        </div>
      </section>
      <section className="explore">
        <div className="explore__container container">
          <h2 className="explore__title" ref={titleRef}>
            EXPLORE BY CATEGORIES
          </h2>

          <div className="explore__categories">
            <div className="explore__categories-wrapper">
              {questCategorys.map((category) => (
                <button
                  onClick={() => setSelectedCategory(category.name)}
                  key={category.id}
                  className={`explore__category-btn ${
                    category.name.toLowerCase() ===
                    selectedCategory.toLowerCase()
                      ? `explore__category-btn--active`
                      : ''
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="explore__grid">
            {filteredQuests.map((quest) => (
              <QuestCard key={quest.quest_id} {...quest} image={quest.photo} />
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
      </section>
      <section className="features-2">
        <div className="container features-2__container">
          {features2.map((feature: IFeature, index: number) => {
            if (index + 1 !== features1.length)
              return (
                <>
                  <InfoBlock
                    key={index}
                    className="features-2__item"
                    feature={feature}
                  />
                  <div className="features-delimiter"></div>
                </>
              );
            else
              return (
                <InfoBlock
                  key={index}
                  className="features-2__item"
                  feature={feature}
                />
              );
          })}
        </div>
      </section>
    </>
  );
}

export default HomeRoute;
