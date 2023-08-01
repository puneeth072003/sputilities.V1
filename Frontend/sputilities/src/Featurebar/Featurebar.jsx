import React from "react";
import playList from "./assets/playlist.png";
import manageliked from "./assets/manageliked.png";
import costomize from "./assets/custom.png";
import "./featureBar.css";
import resetLiked from "./assets/resetLiked.png";
import toLiked from "./assets/toLiked.png";
const Featurebar = () => {
  return (
    <div className="feat-div">
      <h1 className="feat-title">Features</h1>
      <div className="feat-cont">
        <div className="feat-box">
          <img className="feat-img" src={playList}></img>
          <h3 className="feat-name">Create a playlist of all Liked songs</h3>
        </div>
        <div className="feat-box">
          <img className="feat-img" src={costomize}></img>
          <h3 className="feat-name">customize the playlist creation process</h3>
        </div>
        <div className="feat-box">
          <img className="feat-img" src={toLiked}></img>
          <h3 className="feat-name">Like all the songs of a playlist</h3>
        </div>
        <div className="feat-box">
          <img className="feat-img" src={manageliked}></img>
          <h3 className="feat-name">
            Manage your liked <br />
            songs
          </h3>
        </div>
        <div className="feat-box">
          <img className="feat-img" src={resetLiked}></img>
          <h3 className="feat-name">Reset liked library</h3>
        </div>
      </div>
      <h2>And many more coming soon</h2>
    </div>
  );
};

export { Featurebar };
