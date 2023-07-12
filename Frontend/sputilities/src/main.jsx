import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App.jsx";
import { Navbar } from "./Navbar/Navbar.jsx";
import "./index.css";
import "./Navbar/navbar.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <Navbar />
    <App />
  </div>
);
