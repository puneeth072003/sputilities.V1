import React from "react";

const FeatureDis = () => {
  return (
    <div class="app-description">
      <h3>
        Are you tired of the hassle of managing your liked songs on Spotify?
      </h3>
      <p className="app-dis">
        Look no further! Sputilities is here to revolutionize your music
        experience. Our cutting-edge app brings you a range of powerful features
        that will transform the way you enjoy your favorite tunes.
      </p>
      <div class="grid-container">
        <div class="grid-item">
          <p className="grid-head">
            Convert Liked Songs to Playlists in a Snap!
          </p>
          <p className="grid-dis">
            With just a single click, Sputilities will intelligently convert all
            your liked songs into personalized playlists. Enjoy seamless music
            curation without lifting a finger!
          </p>
        </div>
        <div class="grid-item">
          <p className="grid-head">Organize and Manage Your Music with Ease!</p>
          <p className="grid-dis">
            Sputilities empowers you to effortlessly organize and categorize
            your favorite songs, so you can find the perfect track for every
            mood, anytime.
          </p>
        </div>
        <div class="grid-item">
          <p className="grid-head">
            Share Your Musical Discoveries with Friends!
          </p>
          <p className="grid-dis">
            Showcase your musical tastes and share your favorite tracks with
            friends and family. Sputilities lets you create playlists from liked
            songs to share with others.
          </p>
        </div>
        <div class="grid-item">
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
