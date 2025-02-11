"use client"

import type React from "react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import "./QuestRatingRoute.css"

// Mock data - replace with API call
const questData = {
  id: 1,
  title: "TOP ARCHITECTURE BUILDINGS",
  category: "Architecture",
  description: "THIS QUEST PROVIDES YOU A CHANCE TO BE REALLY IMPACTFULL...",
  image: "https://picsum.photos/800/600?random=${index}",
  completedAt: "12.02.2025, 12:00",
} ///

const QuestRatingRoute: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>({})

  const validateRating = (value: string) => {
    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) return "Rating must be a number"
    if (numValue < 1 || numValue > 5) return "Rating must be between 1 and 5"
    if (value.includes(".") && value.split(".")[1].length > 1) {
      return "Rating can only have one decimal place"
    }
    return ""
  }

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRating(value)
    const error = validateRating(value)
    setErrors((prev) => ({ ...prev, rating: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate before submission
    const ratingError = validateRating(rating)
    const commentError = !comment.trim() ? "Comment is required" : ""

    if (ratingError || commentError) {
      setErrors({ rating: ratingError, comment: commentError })
      return
    }

    try {
      /// Send rating and comment to API
      // await api.post(`/quests/${id}/rate`, { rating: parseFloat(rating), comment });
      navigate(`/quests/${id}`)
    } catch (error) {
      console.error("Failed to submit rating:", error)
    }
  }

  return (
    <div className="quest-rating">
      <div className="container quest-rating__container">
        <div className="quest-rating__content">
          <div className="quest-rating__header">
            <h1 className="quest-rating__title">Rate Quest</h1>
          </div>

          <div className="quest-rating__quest-info">
            <div className="quest-rating__image-container">
              <img src={questData.image || "/placeholder.svg"} alt={questData.title} className="quest-rating__image" />
            </div>
            <div className="quest-rating__details">
              <h2 className="quest-rating__quest-title">{questData.title}</h2>
              <p className="quest-rating__category">{questData.category}</p>
              <p className="quest-rating__description">{questData.description}</p>
              <p className="quest-rating__completed">Completed: {questData.completedAt}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="quest-rating__form">
            <div className="form-group">
              <label htmlFor="rating">Rating (1-5)</label>
              <div className="rating-input-container">
                <input
                  type="number"
                  id="rating"
                  value={rating}
                  onChange={handleRatingChange}
                  step="0.1"
                  min="1"
                  max="5"
                  className={`form-input ${errors.rating ? "error" : ""}`}
                  placeholder="Enter rating (e.g., 4.5)"
                />
                <FaStar className="rating-star" />
              </div>
              {errors.rating && <span className="error-message">{errors.rating}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value)
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, comment: undefined }))
                  }
                }}
                className={`form-textarea ${errors.comment ? "error" : ""}`}
                placeholder="Write your comment here..."
                rows={4}
              />
              {errors.comment && <span className="error-message">{errors.comment}</span>}
            </div>

            <button type="submit" className="submit-button">
              Submit Rating
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default QuestRatingRoute

