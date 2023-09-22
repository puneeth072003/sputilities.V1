import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React from "react";
import App from "../App/App";
import Feat_1 from "../pages/feat_1/Feat_1.jsx";
const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/feat_1" element={<Feat_1 />} />
      </Routes>
    </div>
  );
};

export default Content;
