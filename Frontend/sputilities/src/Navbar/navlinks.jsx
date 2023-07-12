import React from "react";
import "./navbar.css";

const Navlinks = () => {
  return (
    <nav>
      <ul className="links">
        <li>
          <a href="#">home</a>
        </li>
        <li>
          <a href="#">about</a>
        </li>
        <li>
          <a href="#">projects</a>
        </li>
        <li>
          <a href="#">contact</a>
        </li>
      </ul>
    </nav>
  );
};

export { Navlinks };
