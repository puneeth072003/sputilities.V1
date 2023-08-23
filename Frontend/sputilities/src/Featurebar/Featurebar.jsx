import playList from "./assets/playlist.png";
import manageliked from "./assets/manageliked.png";
import costomize from "./assets/custom.png";
import "./featureBar.css";
import resetLiked from "./assets/resetLiked.png";
import toLiked from "./assets/toLiked.png";
import handleFeat1 from "./Controllers/handleFeat1";
import React, { useEffect, useRef, useState } from "react";
import { useElementOnScreen } from "../animate/OnScroll";
import "../App/App.css";

const Featurebar = () => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  });

  useEffect(() => {
    if (isVisible) {
      containerRef.current.classList.add("visible");
    } else {
      containerRef.current.classList.remove("visible");
    }
  }, [isVisible]);

  return (
    <div className="feat-div">
      <h1 className="feat-title">Features</h1>
      <div className="feat-cont">
        <div
          ref={containerRef}
          className={`feat-box ${isVisible ? "visible" : ""}`}
        >
          <img className="feat-img" src={playList} onClick={handleFeat1}></img>
          <h3 className="feat-name">Create a playlist of all Liked songs</h3>
        </div>
        <div className={`feat-box ${isVisible ? "visible" : ""}`}>
          <img className="feat-img" src={costomize}></img>
          <h3 className="feat-name">customize the playlist creation process</h3>
        </div>
        <div className={`feat-box ${isVisible ? "visible" : ""}`}>
          <img className="feat-img" src={toLiked}></img>
          <h3 className="feat-name">Like all the songs of a playlist</h3>
        </div>
        <div className={`feat-box ${isVisible ? "visible" : ""}`}>
          <img className="feat-img" src={manageliked}></img>
          <h3 className="feat-name">
            Manage your liked <br />
            songs
          </h3>
        </div>
        <div className={`feat-box ${isVisible ? "visible" : ""}`}>
          <img className="feat-img" src={resetLiked}></img>
          <h3 className="feat-name">Reset liked library</h3>
        </div>
      </div>
      <h2 className={`andMore ${isVisible ? "visible" : ""}`}>
        And many more coming soon
      </h2>
    </div>
  );
};

export { Featurebar };
