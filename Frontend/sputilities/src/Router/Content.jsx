import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App/App";
import Feat_1 from "../pages/feat_1/Feat_1.jsx";
import Feat2 from "../pages/feat_2/feat2.jsx";  // import the Feat2 component

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/feat_1" element={<Feat_1 />} />
        <Route path="/feat_2" element={<Feat2 />} />   {/* New route for feat_2 */}
      </Routes>
    </div>
  );
};

export default Content;
