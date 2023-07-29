import React from "react";
import { Navlinks } from "./navlinks";
import "./navbar.css";
import Logo from "./assets/logo.webp";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={Logo} className="logo" alt="sputilities_logo" />
        </div>
        <Navlinks />
      </div>
    </nav>
  );
};

export { Navbar };
