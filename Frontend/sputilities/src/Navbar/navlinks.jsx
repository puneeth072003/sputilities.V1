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
      await axios.get(url);
      setAuth(true);
    } catch (error) {
      console.error("Error in login:", error);
    }
  };
  return (
    <nav>
      <ul className="links">
        <li>
          <button onClick={handleLogin} className="login-btn">
            {auth ? `${fetchProfile}` : "Login"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export { Navlinks };
