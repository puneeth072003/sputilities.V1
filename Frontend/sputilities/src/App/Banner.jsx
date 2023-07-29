import React from "react";

const Banner = () => {
  return (
    <div className="ban-cont">
      <p class="ban-msg">
        We'd appreciate a ⭐ on Github if you liked our service. Your support
        helps us get better. Thank you!
        <br />
        <a
          href="https://github.com/puneeth072003/sputilities.V1"
          target="_blank"
        >
          <img
            className="ban-star"
            src="https://img.shields.io/github/stars/puneeth072003/sputilities.V1?style=social"
            alt="Star on GitHub"
          />
        </a>
      </p>
    </div>
  );
};

export { Banner };
