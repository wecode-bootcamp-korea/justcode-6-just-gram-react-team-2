import React, { useState, useRef, useEffect } from "react";
import Comment from "./Comment";

function Feed({ feedData }) {
  const [id, setId] = useState(1);
  const value = useRef();
  const [commentArray, setCommentArray] = useState([]);

  useEffect(() => {
    fetch("/data/comments.json")
      .then((res) => res.json())
      .then((data) => setCommentArray(data.comments));
  });

  const addComment = () => {
    setId(id + 1);
    const newComment = {
      id: id,
      content: value.current.value,
    };
    value.current.value = "";
    setCommentArray([...commentArray, newComment]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addComment();
    }
  };

  return (
    <>
      <div className="contents-wrapper">
        <div className="feed-container">
          <div className="feed-header custom-border">
            <div className="vertical-center">
              <img
                className="feed-icon-resize icon-round"
                alt="이미지"
                src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/profile.png"
              />
              {feedData.username}
            </div>
            <div>
              <img
                className="feed-icon-resize"
                alt="이미지"
                src="images/dots.png"
              />
            </div>
          </div>

          <div className="feed-img-wrapper">
            <img
              className="feed-img "
              alt="피드 이미지"
              src={feedData.feedImages[0].imageUrl}
            />
          </div>
          <div className="custom-border">
            <span>{feedData.content}</span>
          </div>

          <div className="feed custom-border">
            <div className="feed-menu">
              <div>
                <img
                  className="feed-icon-resize"
                  alt="이미지"
                  src="images/heart.png"
                />
                <img
                  className="feed-icon-resize"
                  alt="이미지"
                  src="images/chat.png"
                />
                <img
                  className="feed-icon-resize"
                  alt="이미지"
                  src="images/upload.png"
                />
              </div>
              <div>
                <img
                  className="feed-icon-resize"
                  alt="이미지"
                  src="images/save.png"
                />
              </div>
            </div>
            <div className="feed-text">
              <div className="feed-text-like vertical-center">
                <img
                  className="icon-round comment-icon-resize"
                  alt="이미지"
                  src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/profile.png"
                />
                <div>Justcode님 외 3명이 좋아합니다</div>
              </div>
              <div className="feed-comment-list">
                {commentArray.map((comment) => {
                  return (
                    <li key={comment.id}>
                      <Comment
                        id={comment.id}
                        content={comment.content}
                        writer={"익명"}
                        createdAt={"2021-03-30"}
                      />
                    </li>
                  );
                })}
              </div>
              <div className="grey-text">42분전</div>
            </div>
            <div className="feed-comment feed-text">
              <input
                className="comment-write-input"
                placeholder="댓글달기"
                ref={value}
                onKeyDown={onKeyDown}
              />
              <button className="comment-write-button" onClick={addComment}>
                게시
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
