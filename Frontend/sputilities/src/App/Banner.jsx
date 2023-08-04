import React, { useEffect, useRef, useState } from "react";
import { useElementOnScreen } from "../animate/OnScroll";

const Banner = () => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  });

  useEffect(() => {
    if (isVisible) {
      containerRef.current.classList.add("visible");
    } else {
      containerRef.current.classList.remove("visible");
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className="ban-cont">
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
