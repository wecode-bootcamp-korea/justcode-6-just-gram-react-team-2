import React, { useEffect } from "react";
import "./Main.scss";
import Feed from "./Feed";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function Main() {
  const [feeds, setFeeds] = useState([]);
  const [getUser, setGetUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetch("./data/feeds.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.feedData);
        setFeeds(data.feedData);
      });
  }, []);

  useEffect(() => {
    fetch("http://auth.jaejun.me:10010/me", {
      method: "GET",
      headers: {
        Authorization:
          // "hi",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2NiwiaWF0IjoxNjYxMjY4MjcwLCJleHAiOjE2NjM5NDY2NzB9.i32_BYRvoN4gxzBcwT5dXAhccbDKnKn85hUmcPgnlHQ",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.email !== undefined ? setGetUser(data) : navigate("/");
      });
    // console.log(data.email); 이메일 찍히는지 보기
    // 삼항연산자로 조건 부여하기
  }, []);

  return (
    <div className="main">
      <div className="header-wrapper">
        <div className="vertical-center">
          <img
            className="icon-img"
            src="images/instagram.png"
            alt="camera-icon"
          />
          <span className="logo-text">| Justgram</span>
        </div>
        <input
          className="search vertical-center"
          type="text"
          placeholder="검색"
        ></input>
        <div className="vertical-center">
          <img
            className="icon-img"
            alt="나침반"
            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/explore.png"
          />
          <img
            className="icon-img custom-margin-left"
            alt="하트"
            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png"
          />

          <p>{getUser && getUser.email}</p>
          {/* //이메일 있을 때만 렌더링 할 거니까 조건부 렌더링 &&로 넣어줘야함. */}
          {/* <img
            className="icon-img custom-margin-left"
            alt="사람"
            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/profile.png"
          /> */}
        </div>
      </div>
      <div className="flex-center">
        <div className="contents-wrapper"></div>

        {feeds.map((feed) => {
          return <Feed key={feed.feedId} feedData={feed} />;
        })}
      </div>
    </div>
  );
}

export default Main;
