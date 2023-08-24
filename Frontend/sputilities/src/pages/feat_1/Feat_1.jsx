import React, { useState, useEffect } from "react";
import "./feat_1.css";

const Feat_1 = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="timer-container" style={{ backgroundColor: "#191414" }}>
      <h1 className="timer" style={{ color: "#1db954" }}>
        {countdown === 0 ? "Success!!" : countdown}
      </h1>
    </div>
  );
};

export default Feat_1;
