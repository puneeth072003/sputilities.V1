import React from "react";
import { useState } from "react";
import axios from "axios";

const profile = "http://localhost:3600/api/v1/fetch";

const fetchProfile = async () => {
  const data = await fetch(profile);
  const name = data.display_name;
  return name;
};
export { fetchProfile };
