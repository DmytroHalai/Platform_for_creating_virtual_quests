"use client";

import React from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./QuestItemRoute.css";
import Comment from "../../components/Comment/Comment";
import { mockQuests } from '../QuestsRoute/QuestsRoute.tsx';

// Mock data


const comments = [
  {
    id: 1,
    author: "Jane Cooper",
    avatar: "https://picsum.photos/100/100?random=1",
    text: "This was an amazing quest! Highly recommend it.",
  },
  {
    id: 2,
    author: "Brooklyn Simmons",
    avatar: "https://picsum.photos/100/100?random=2",
    text: "A great challenge, I learned a lot.",
  },
  {
    id: 3,
    author: "Robert Fox",
    avatar: "https://picsum.photos/100/100?random=3",
    text: "Not bad, but could use more content.",
  },
];

const QuestItemRoute: React.FC = () => {
  const { questId } = useParams<string>();
  const quest : any = mockQuests.find((q) => q.id === Number(questId));
  console.log(quest)

  // if (!quest) {
  //   return <div>Quest not found</div>;
  // }

  return (
    <div className="quest-details">
      <div className="container">
        <div className="quest-details__header">
          <h2 className="quest-details__title">{quest.title}</h2>
          <div className="quest-details__rating">
            {quest.rating}/5 <FaStar />
          </div>
        </div>

        <div className="quest-details__content">
          <div className="quest-details__image-container">
            <img
              src={quest.image || "/placeholder.svg"}
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

            <p className="quest-details__description">{quest.description}</p>

            <button className="quest-details__start-btn">START PASSING</button>
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
  );
};

export default QuestItemRoute;
