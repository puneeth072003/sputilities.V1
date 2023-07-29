import React from "react";

const Contact = () => {
  return (
    <div>
      <div>
        <h3 className="contact">Contact us</h3>
        <div className="footer-icons">
          <a href="#" className="footer-icon">
            <i className="fa-solid fa-envelope"></i>
            <span className="message">Mail</span>
          </a>
          <a href="#" className="footer-icon">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#" className="footer-icon">
            <i className="fa-solid fa-bug"></i>
          </a>
        </div>
        <p className="final">sputilities.v1 @2023</p>
      </div>
    </div>
  );
};

export { Contact };
