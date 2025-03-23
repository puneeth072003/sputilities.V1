import React, { useState, useEffect } from "react";
import "./navbar.css";
import axios from "axios";

const Navlinks = () => {
  const url = "http://localhost:3600/api/v1/login";
  const [auth, setAuth] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLogin = () => {
    try {
      // await axios.get(url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); 
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  const fetchUsername = async () => {
    try {
      const username = await axios.get();
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <nav>
      <ul className="links">
        <li>
          <button onClick={handleLogin} className="login-btn">
            {auth ? `${window.name}` : "Login"}
          </button>
          {showToast && (
            <div className="toast show">
              <div className="toast-header">
                <strong className="me-auto">Notification</strong>
                <button type="button" className="btn-close" onClick={() => setShowToast(false)} aria-label="Close"></button>
              </div>
              <div className="toast-body">
              Oops! Our backend is currently on an unscheduled vacation. Logging in isn’t possible at the moment; thanks for your understanding!
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export { Navlinks };
