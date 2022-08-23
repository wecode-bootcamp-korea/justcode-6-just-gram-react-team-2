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

  return (
    <div className="contents-divider">
      <link
        href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
        rel="stylesheet"
      />
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

      {feeds.map((feed) => {
        return <Feed key={feed.feedId} feedData={feed} />;
      })}
    </div>
  );
}

export default Main;
