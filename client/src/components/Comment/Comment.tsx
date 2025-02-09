import React from 'react';
import './Comment.css';

interface CommentProps {
  author: string;
  avatar: string;
  text: string;
}

const Comment: React.FC<CommentProps> = ({ author, avatar, text }) => {
  return (
    <div className="comment">
      <img src={avatar || "/placeholder.svg"} alt={author} className="comment__avatar" />
      <div className="comment__content">
        <h3 className="comment__author">{author}</h3>
        <p className="comment__text">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
