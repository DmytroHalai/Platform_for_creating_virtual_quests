import type React from 'react';
import { useEffect, useReducer, useRef, useState } from 'react';
import {
  UserRating,
  UserRatingCard,
} from '../../components/QuestsCards/UserRatingCard.tsx';
import { COMP_RATING_PAGINATION_SIZE } from '../../constants/constants.ts';

import './RatingRoute.css';

interface Action {
  type: string;
  payload: { source: UserRating[]; page: number };
}

// Mock data - replace with API call
const generateMockRating = (id: number, username: string) => ({
  id,
  username,
  avatar: `https://picsum.photos/800/600?random=${id}`,
  rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
  maxRating: 5,
});

const usernames: string[] = [
  'JANE COOPER',
  'WADE WARREN',
  'ESTHER HOWARD',
  'CAMERON WILLIAMSON',
  'BROOKLYN SIMMONS',
  'ROBERT FOX',
  'JENNY WILSON',
  'ALBERT FLORES',
  'JEROME BELL',
  'DARLENE ROBERTSON',
];

const mockRatings = Array.from({ length: 50 }, (_, i) =>
  generateMockRating(i + 1, usernames[i % usernames.length]),
); ///

const RatingRoute: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, dispatchFilteredUsers] = useReducer(reducer, [
    ...mockRatings,
  ]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const totalPages = Math.ceil(
    mockRatings.length / COMP_RATING_PAGINATION_SIZE,
  ); // logic

  function reducer(
    state: UserRating[],
    { type, payload }: Action,
  ): UserRating[] {
    switch (type) {
      case 'filter':
        const startIndex = (payload.page - 1) * COMP_RATING_PAGINATION_SIZE;
        return payload.source.slice(
          startIndex,
          startIndex + COMP_RATING_PAGINATION_SIZE,
        );
      default:
        return state;
    }
  }

  function scrollToTitle(ref: React.RefObject<HTMLElement | null>) {
    ref.current?.scrollIntoView();
  }

  useEffect(() => {
    dispatchFilteredUsers({
      type: 'filter',
      payload: {
        source: mockRatings,
        page: currentPage,
      },
    });
  }, [currentPage]);

  return (
    <div className="rating-page">
      <div className="container">
        <h1 className="rating-page__title" ref={titleRef}>Users Rating</h1>

        <div className="rating-page__grid">
          {filteredUsers.map((rating) => (
            <UserRatingCard key={rating.id} {...rating} />
          ))}
        </div>

        <div className="rating-page__pagination">
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
  );
};

export default RatingRoute;
