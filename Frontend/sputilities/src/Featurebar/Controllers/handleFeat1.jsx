import React, { useState, useEffect } from "react";
import "../featureBar.css";

const handleFeat1 = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="Feat1">
      {isLoading ? (
        <div className="loading-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="success-screen">
          <h1>Success!!!</h1>
          <p>Playlist created successfully</p>
        </div>
      )}
    </div>
  );
};

export default handleFeat1;
