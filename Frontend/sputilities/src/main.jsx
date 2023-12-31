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
    <BrowserRouter>
      <Content />
    </BrowserRouter>
    <Support />
  </div>
);
