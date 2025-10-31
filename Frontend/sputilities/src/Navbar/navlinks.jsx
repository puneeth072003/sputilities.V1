import React, { useState, useEffect } from "react";
import "./navbar.css";
import { fetchProfile } from "../Controllers/login";
import { authAPI } from "../services/api";

const Navlinks = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("Login");
  const [polling, setPolling] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await authAPI.login();
      if (response.data.redirectUrl) {
        sessionStorage.setItem("returnTo", window.location.href);
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const name = await fetchProfile();
        if (name && name !== "Login") {
          setAuth(true);
          setUsername(name);
          setPolling(false); // Stop polling once authenticated
        } else {
          setAuth(false);
          setUsername("Login");
          setPolling(false); // Stop polling if not authenticated
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setAuth(false);
        setUsername("Login");
        setPolling(false); // Stop polling on error
      }
    };

    // Initial check
    checkLoginStatus();
  }, []); // Run only once on component mount

  return (
    <nav>
      <ul className="links">
        <li>
          <button
            onClick={auth ? null : handleLogin}
            className={`login-btn ${auth ? "logged-in" : ""}`}
            title={auth ? `Logged in as ${username}` : "Click to login"}
          >
            {username}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export { Navlinks };
