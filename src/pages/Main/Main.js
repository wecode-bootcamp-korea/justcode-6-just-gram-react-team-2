import React, { useEffect } from "react";
import "./Main.scss";
import Feed from "./Feed";
import { useState } from "react";

function Main() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetch("./data/feeds.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.feedData);
        setFeeds(data.feedData);
      });
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
          <img
            className="icon-img custom-margin-left"
            alt="사람"
            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/profile.png"
          />
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
