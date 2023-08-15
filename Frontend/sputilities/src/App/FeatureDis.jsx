import React, { useEffect, useRef, useState } from "react";
import { useElementOnScreen } from "../animate/OnScroll";
import "../App/App.css";

const FeatureDis = () => {
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
    <div className="app-description">
      <h3>
        Are you tired of the hassle of managing your liked songs on Spotify?
      </h3>
      <p className="app-dis">
        Look no further! Sputilities is here to revolutionize your music
        experience. Our cutting-edge app brings you a range of powerful features
        that will transform the way you enjoy your favorite tunes.
      </p>
      <div className="grid-container">
        <div
          ref={containerRef}
          className={`grid-item ${isVisible ? "visible" : ""}`}
        >
          <p className="grid-head">
            Never before has playlist creation been so fast!
          </p>
          <p className="grid-dis">
            With just a single click, Sputilities will intelligently convert all
            your liked songs into personalized playlists. Enjoy seamless music
            curation without lifting a finger!
          </p>
        </div>
        <div className={`grid-item ${isVisible ? "visible" : ""}`}>
          <p className="grid-head">
            Organize and Manage Your Liked library with Ease!
          </p>
          <p className="grid-dis">
            Sputilities empowers you to effortlessly organize and categorize
            your favorite songs, so you can find the perfect track for every
            mood, anytime.
          </p>
        </div>
        <div className={`grid-item ${isVisible ? "visible" : ""}`}>
          <p className="grid-head">
            Share Your Musical Discoveries with Friends!
          </p>
          <p className="grid-dis">
            Showcase your musical tastes and share your favorite tracks with
            friends and family. Sputilities lets you create playlists from liked
            songs to share with others.
          </p>
        </div>
        <div className={`grid-item ${isVisible ? "visible" : ""}`}>
          <p className="grid-head">And so much More Waiting to be Explored!</p>
          <p className="grid-dis">
            Sputilities is constantly evolving, and we have exciting new
            features in the pipeline. Stay tuned for upcoming updates that will
            further enrich your music journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export { FeatureDis };
