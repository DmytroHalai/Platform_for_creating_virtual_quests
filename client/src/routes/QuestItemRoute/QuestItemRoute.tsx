import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './QuestItemRoute.css';
import Comment from '../../components/Comment/Comment';
import { mockQuests } from '../QuestsRoute/QuestsRoute.tsx';
import service from '../../services/service.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { fetchQuest, fetchQuests } from '../../store/features/quests/thunks.ts';
import { Category } from '../../constants/categorys.ts';

// Mock data
interface Quest {
  quest_id: number;
  title: string;
  description: string;
  photo: string;
  ratings: { rating: number }[];
  category: string;
  time: number;
}

const comments = [
  {
    id: 1,
    author: 'Jane Cooper',
    avatar: 'https://picsum.photos/100/100?random=1',
    text: 'This was an amazing quest! Highly recommend it.',
  },
  {
    id: 2,
    author: 'Brooklyn Simmons',
    avatar: 'https://picsum.photos/100/100?random=2',
    text: 'A great challenge, I learned a lot.',
  },
  {
    id: 3,
    author: 'Robert Fox',
    avatar: 'https://picsum.photos/100/100?random=3',
    text: 'Not bad, but could use more content.',
  },
];

const QuestItemRoute: React.FC = () => {
  const { questId } = useParams<string>();
  const quests = useSelector((state: RootState) => state.quests);
  const dispatch = useDispatch();

  // const quest : any = mockQuests.find((q) => q.id === Number(questId));
  const [quest, setQuest] = useState<Quest | undefined>( //usereducer
    quests.quests.find((item) => item.quest_id.toString() === questId),
  );

  const resultRating = useMemo(() => {
    if (quest) {
      if (quest.ratings.length) {
        return (
          Math.round(
            (quest.ratings.reduce((sum, { rating }) => sum + rating, 0) /
              quest.ratings.length) *
              10,
          ) / 10
        ).toString();
      } else {
        return '-';
      }
    } else {
      return '';
    }
  }, [quest]);

  useEffect(() => {
    //
    if (!quests.quests.length) {
      dispatch(fetchQuests());
    }
  }, []);

  useEffect(() => {
    //
    const q = quests.quests.find(
      (item) => item.quest_id.toString() === questId,
    );
    // if (q) {
    setQuest(q);
    // }
  }, [quests.quests]);

  // useEffect(() => {
  //   if (!quest) {
  //     dispatch(fetchQuest(questId));
  //     const q = quests.quests.find(
  //       (item) => item.quest_id.toString() === questId,
  //     );
  //     setQuest(q);
  //   }
  // }, []);
  return quest ? (
    <div className="quest-details">
      <div className="container">
        <div className="quest-details__header">
          <h2 className="quest-details__title">{quest.title}</h2>
          <div className="quest-details__rating">
            {resultRating}/5 <FaStar />
          </div>
        </div>

        <div className="quest-details__content">
          <div className="quest-details__image-container">
            <img
              src={quest.photo || '/placeholder.svg'}
              alt={quest.title}
              className="quest-details__image"
            />
          </div>

          <div className="quest-details__info">
            <h1 className="quest-details__name">{quest.title}</h1>

            <div className="quest-details__meta">
              <span className="quest-details__time">TIME: {quest.time}</span>
              <span className="quest-details__category">
                CATEGORY: {quest.category}
              </span>
            </div>

            <p className="quest-details__description">
              {quest.description.length > 600
                ? quest.description.slice(0, 600) + '...'
                : quest.description}
            </p>
            <Link to={'/progress/:userQuestId'}>
              <button className="quest-details__start-btn">
                START PASSING
              </button>
            </Link>
          </div>
        </div>

        <div className="quest-details__comments">
          <h2 className="quest-details__comments-title">Comments</h2>
          <div className="quest-details__comments-list">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                author={comment.author}
                avatar={comment.avatar}
                text={comment.text}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Quest Not Found</h1>
  );
};

export default QuestItemRoute;
