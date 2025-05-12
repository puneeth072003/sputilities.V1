import React from "react";
import { useState } from "react";
import axios from "axios";

const fetchProfile = async () => {
  try {
    // Check if there's an active session first
    const checkSession = await axios.get("http://localhost:3600/api/v1/check-login", { withCredentials: true });
    if (checkSession.data !== true) {
      return "Login";
    }

    const response = await axios.get("http://localhost:3600/api/v1/getUser", { withCredentials: true });
    const username = response.data;
    if (username && username !== "Guest") {
      return username;
    }
    return "Login";
  } catch (error) {
    console.error("Error fetching profile:", error);
    return "Login";
  }
};

export { fetchProfile };
