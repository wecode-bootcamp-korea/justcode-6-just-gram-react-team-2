import React from "react";

function Comment(props) {
  const { content, userName, createdAt } = props;

  return (
    <span>
      <span className="comment-user-ID">{userName}</span>
      <span className="comment-write-input">{content}</span>
      <span className="comment-date">{createdAt}</span>
    </span>
  );
}

export default Comment;
