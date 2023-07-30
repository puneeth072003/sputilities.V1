import React from "react";
import image from "./assets/bg-removebg.png";
import "./App.css";

const whyDis = `Did you know that Spotify has a slight flaw? Adding songs directly to a playlist can be quite cumbersome, requiring multiple steps for just one song. Instead, you can 'like' the songs to keep them grouped, but unfortunately, sharing your liked songs is not possible, and managing them in bulk can be challenging. That's where Sputilities comes to the rescue! With Sputilities, you can effortlessly manage your liked songs and easily share them with others, along with a plethora of other amazing features.
`;
const Why = () => {
  return (
    <div className="why-body">
      <div className="why-flex">
        <img className="why-img" src={image}></img>
        <div className="why-box">
          <h1 className="why-title">Why Sputilities?</h1>
          <p className="why-dis">{whyDis}</p>
        </div>
      </div>
    </div>
  );
};

export { Why };
