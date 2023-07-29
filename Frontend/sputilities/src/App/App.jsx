import React from "react";
import { ReactDOM } from "react";
import "./App.css";
import Feature_1 from "./assets/feature1.webp";
import { Steps } from "./Steps";

const App = () => {
  return (
    <div>
      <h1 className="fet-title">Features</h1>
      <div>
        <img src={Feature_1} className="fet-1-img" alt="Image" />
      </div>
      <Steps />
    </div>
  );
};

export default App;
