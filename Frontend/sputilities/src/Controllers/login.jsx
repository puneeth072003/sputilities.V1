import React from "react";
import { useState } from "react";
import { legacyAPI, usersAPI } from "../services/api";

const fetchProfile = async () => {
  try {
    // Check if there's an active session first
    const checkSession = await legacyAPI.checkLogin();
    if (checkSession.data !== true) {
      return "Login";
    }

    const response = await legacyAPI.getUser();
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
