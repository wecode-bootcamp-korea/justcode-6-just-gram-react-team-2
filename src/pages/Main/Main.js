import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import "./Main.scss";

function Main() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetch("/data/feeds.json")
      .then((res) => res.json())
      .then((data) => {
        setFeeds(data.feedData);
      });
  }, []);

  useEffect(() => {
    fetch("http://auth.jaejun.me:10010/me", {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywiaWF0IjoxNjYxMjQzMzk2LCJleHAiOjE2NjM5MjE3OTZ9.5Jsw-3qDIdIm3uvoKbTASt16iG7gJKM8uYtVQolzNYw",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.email !== undefined ? console.log("o") : console.log("x");
      });
  }, []);

  return (
    <div className="contents-divider">
      <link
        href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
        rel="stylesheet"
      />
      <div className="header-fix">
        <header className="=to-do header-wrapper">
          <div className="vertical-center">
            <img
              src="images/logo.png"
              alt="이미지"
              className="icon-resize icon-border"
            />
            <span className="header-text">justgram</span>
          </div>
          <div>
            <input className="vertical-center" placeholder="검색" />
          </div>
          <div className="vertical-center">
            <img
              alt="이미지"
              className="icon-resize custom-margin-left"
              src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/explore.png"
            />
            <img
              alt="이미지"
              className="icon-resize custom-margin-left"
              src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/heart.png"
            />
            <img
              alt="이미지"
              className="icon-resize "
              src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/profile.png"
            />
          </div>
        </header>
      </div>
      {feeds.map((feed) => {
        return <Feed key={feed.feedId} feedData={feed} />;
      })}
    </div>
  );
}

export default Main;
