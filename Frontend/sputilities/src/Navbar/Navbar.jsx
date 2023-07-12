import React from "react";
import { Navlinks } from "./navlinks";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { handletransform } from "./navtransform.jsx";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img
            src="src\assets\logo.webp"
            className="logo"
            alt="sputilities_logo"
          />
          <button className="nav-toggle" onClick={handletransform}>
            <FontAwesomeIcon icon={faBars} style={{ color: "#151414" }} />
          </button>
        </div>
        <Navlinks />
      </div>
    </nav>
  );
};

export { Navbar };
