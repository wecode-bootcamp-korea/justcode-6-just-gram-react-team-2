import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { createPath } from "react-router-dom";
import Comments from "./Comments";
import "./Comments.json";

function Feed({ feedData }) {
  const [comment, setComment] = useState();
  const [id, setId] = useState(0); //초기값을 넣어줘야 밑에 +1 이 찍힘
  const value = useRef(); //value를 참고하고 싶은 tag에 거는 것
  const [inputState, setInput] = useState(""); // 초기값에 빈값들어감
  const [commentArray, setCommentArray] = useState([]);

  useEffect(() => {
    fetch("./data/Comments.json")
      .then((res) => res.json())
      .then((data) => setCommentArray(data.comments));
  }, []);

  const addComment = () => {
    setId(id + 1);
    // comment spray
    const newComment = {
      id: id,
      // content: value.current.value, // value : useRef를 담은 값, currnet.value: 해당 태그의 value'
      content: inputState,
      createdAt: new Date().toLocaleString(),
    };
    setInput("");
    setCommentArray([...commentArray, newComment]);
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      addComment();
    }
  };
  return (
    <div className="feed-container">
      <div className="feed-header">
        <div className="vertical-center">
          <img alt="이미지" /> {feedData.username}
        </div>
        <div>...</div>
      </div>
      <div className="feed-image">
        <img className="feed-my-img" src={feedData.feedImages[0].imageUrl} />
      </div>
      <div>{feedData.content}</div>
      <div className="feed-menu padding-10">
        <div className="feed-icon">
          <img className="icon-img" alt="하트" src="images/heart.png" />
          <img className="icon-img" alt="말풍선" src="images/chat.png" />
          <img className="icon-img" alt="업로드" src="images/upload.png" />
          <span>
            <img
              className="bookmark icon-img"
              alt="책갈피"
              src="images/bookmark.png"
            />
          </span>
        </div>
      </div>
      <div className="feed-comment">
        <div className="feed-comment-like padiing-10">
          ainworld님 외 10명이 좋아합니다.
        </div>
        <div className="feed-comment-list  padiing-10">
          {commentArray.map((comment) => {
            //map 사용시에 식별할 수 있는 key가 필요 // 최상위 tag에 key 넣어야함
            return (
              <li key={comment.id}>
                <Comments
                  id={comment.id}
                  content={comment.content}
                  author={"익명"}
                  createdAt={comment.createdAt || "2022-01-01"}
                />
              </li>
            ); //1
            // <Comments comment={comment} /> //2
          })}
        </div>
        <div>42분전</div>
        <div className="feed-comment-write">
          <input
            className="commentinput"
            type="text"
            placeholder="댓글 달기..."
            ref={value}
            value={inputState}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={onKeyPress}
          />
          <button className="commentbutton" type="button" onClick={addComment}>
            게시
          </button>
        </div>
      </div>
    </div>
  );
}
export default Feed;
