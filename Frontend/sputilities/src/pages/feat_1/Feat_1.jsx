import React, { useState, useEffect } from "react";
import "./feat_1.css";
import { Bars } from "react-loader-spinner";
import Logowhite from "../asssets/logowhite.png";

const Feat_1 = () => {
  const [countdown, setCountdown] = useState(10);
  const [failure, setFailure] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="success_body">
      <img src={Logowhite} alt="Sputililties_logo" className="feat1-logo"></img>
      <div className="timer-container">
        <h2>
          {countdown === 0
            ? failure
              ? "Playlist Successfully created"
              : "Something went wrong"
            : "Please wait"}
        </h2>
        <>
          {countdown === 0 ? (
            failure ? (
              <h1>Enjoy!!</h1>
            ) : (
              <h1>we are really sorry!!!</h1>
            )
          ) : (
            <Bars
              height="80"
              width="80"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </>
      </div>
      <h2>
        {countdown === 0 ? (
          failure ? (
            <a
              className="feat1-link"
              href="https://open.spotify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here to open Spotify
            </a>
          ) : (
            <a
              className="feat1-link"
              href="https://github.com/puneeth072003/sputilities.V1/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report any errors here
            </a>
          )
        ) : null}
      </h2>
    </div>
  );
};

export default Feat_1;
