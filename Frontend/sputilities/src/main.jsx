import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Content from "./Router/Content.jsx";
import { Navbar } from "./Navbar/Navbar.jsx";
import "./index.css";
import "./Navbar/navbar.css";
import { Support } from "./Support bar/Support.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <Navbar />
    <div className="marquee">
      <p className="marquee-p">Due to cloud cost concerns, we’ve decided not to deploy the backend; apparently, even our cloud has a budget! We truly appreciate your understanding and support, even if it means some features are on an unexpected vacation.</p>
    </div>    
    <BrowserRouter>
      <Content />
    </BrowserRouter>
    <Support />
  </div>
);
