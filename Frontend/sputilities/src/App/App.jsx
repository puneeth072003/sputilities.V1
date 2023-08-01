import React from "react";
import "./App.css";
import { Banner } from "./Banner";
import { Steps } from "./Steps";
import { Why } from "./Why";
import { Featurebar } from "../Featurebar/Featurebar";
import { FeatureDis } from "./FeatureDis";

const App = () => {
  return (
    <div>
      <div className="faded">
        <Why />
      </div>
      <FeatureDis />
      <Featurebar />
      <Steps />
      <Banner />
    </div>
  );
};

export default App;
