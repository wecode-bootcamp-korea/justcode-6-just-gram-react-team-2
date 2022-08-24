import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.scss";
import Feed from "./Feed";

function Main() {
  const [feeds, setFeeds] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const navigate = useNavigate();

  // feed 데이터 받기
  useEffect(() => {
    fetch("/data/feeds.json")
      .then((res) => res.json())
      .then((data) => {
        setFeeds(data.feeds);
      });
  }, []);

  // GET token
  useEffect(() => {
    fetch("http://auth.jaejun.me:10010/me", {
      method: "GET",
      headers: {
        Authorization: "토큰",
      },
    })
      .then((res) => res.json)
      .then((data) => {
        data.email !== undefined ? setUserInfo(data.email) : navigate("/login");
      });
  }, []);

  return (
    <React.Fragment>
      <header className="to-do header-wrapper spread-row">
        <div className="vertical-center">
          <img
            className="icon-image"
            src="/images/Instagram.png"
            alt="instagram-logo"
          />
          <span className="header-text">| Justgram</span>
        </div>
        <div className="vertical-center">
          <input placeholder="검색" />
        </div>
        <div>
          <img className="icon-image" src="/images/home.png" alt="main-icon" />
          <img
            className="icon-image margin-left-10px"
            src="/images/dm.png"
            alt="dm-icon"
          />
          <img
            className="icon-image margin-left-10px"
            src="/images/plus.png"
            alt="add-icon"
          />
          <img
            className="icon-image margin-left-10px"
            src="/images/compass.png"
            alt="search-icon"
          />
          <img
            className="icon-image margin-left-10px"
            src="/images/heart.png"
            alt="like-icon"
          />
          <p>{userInfo && userInfo.email}</p>
        </div>
      </header>
      <div className="flex-center">
        <div className="to-do contents-wrapper">
          {feeds.map((feed) => {
            return <Feed key={feed.userID} feedData={feed} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
