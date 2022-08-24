import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Feed from "./Feed";
import "./Main.scss";

function Main() {
  const [feeds, setFeeds] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywiaWF0IjoxNjYxMzIxMjIyLCJleHAiOjE2NjM5OTk2MjJ9.iYz_pq9HuWw2UPc1e193-jNIeBV55HdCa67EEuBk1VM",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.email !== undefined ? setUserInfo(data) : navigate("/login");
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
            <span></span>
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
            {/* <img
              alt="이미지"
              className="icon-resize "
              src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/bearu/profile.png"
            /> */}
            <p>{userInfo && userInfo.email}</p>
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
