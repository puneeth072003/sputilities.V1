import React from "react";
import { ReactDOM } from "react";
import "./App.css";
import Feature_1 from "./assets/feature1.webp";
import { Banner } from "./Banner";
import { Steps } from "./Steps";
import { Why } from "./Why";

const App = () => {
  return (
    <div>
      <Why />
      <h1 className="fet-title">Features</h1>
      <div>
        <img src={Feature_1} className="fet-1-img" alt="Image" />
      </div>
      <Steps />
      <Banner />
    </div>
  );
};

export default App;
