import React from "react";
import { useState } from "react";
import axios from "axios";

const profile = "http://localhost:3600/api/v1/fetch";

const fetchProfile = async () => {
  try {
    const response = await axios.get(profile);
    const name = response.data.display_name;
    console.log(response.data);
    return name;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return "No name";
  }
};
export { fetchProfile };
