import React from "react";
import { useState } from "react";
import "./navbar.css";
import { fetchProfile } from "../Controllers/login";
import axios from "axios";

const Navlinks = () => {
  const url = "http://localhost:3600/api/v1/login";
  const [auth, setAuth] = useState(false);
  const handleLogin = async () => {
    try {
      const response = await axios.get(url);
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error("Error in login:", error);
    }
  };
  return (
    <nav>
      <ul className="links">
        <li>
          <button onClick={handleLogin} className="login-btn">
            {auth ? `Logged in` : "Login"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export { Navlinks };
