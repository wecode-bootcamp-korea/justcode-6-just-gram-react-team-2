import React from "react";
import { useState, useRef } from "react";
import "./Comments.scss";

function Comments(props) {
  const { id, content, author, createdAt } = props; //구조분해 할당

  return (
    <span>
      {content} - {author} <span className="createdAt"> {createdAt}</span>
    </span>
  );
}
export default Comments;
