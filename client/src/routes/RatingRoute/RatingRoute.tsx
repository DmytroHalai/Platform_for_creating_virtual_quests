"use client"

import type React from "react"
import { useState } from "react"
import "./RatingRoute.css"
import {UserRating, UserRatingCard} from '../../components/QuestsCards/UserRatingCard.tsx';

// Mock data - replace with API call
const generateMockRating = (id, username) => ({
  id,
  username,
  avatar: `https://picsum.photos/800/600?random=${id}`,
  rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
  maxRating: 5,
});

const mockRatings = Array.from({ length: 10 }, (_, i) =>
  generateMockRating(i + 1, [
    "JANE COOPER", "WADE WARREN", "ESTHER HOWARD", "CAMERON WILLIAMSON",
    "BROOKLYN SIMMONS", "ROBERT FOX", "JENNY WILSON", "ALBERT FLORES",
    "JEROME BELL", "DARLENE ROBERTSON"
  ][i])
); ///



const RatingRoute: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5 /// Replace with actual total pages from API

  return (
    <div className="rating-page">
      <div className="container">
        <h1 className="rating-page__title">Users Rating</h1>

        <div className="rating-page__grid">
          {mockRatings.map((rating) => (
            <UserRatingCard key={rating.id} {...rating} />
          ))}
        </div>

        <div className="rating-page__pagination">
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
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default RatingRoute

