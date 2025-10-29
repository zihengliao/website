import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const textPathRef = useRef(null);
  const animationRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const animate = (from, to, duration, callback) => {
    const startTime = performance.now();
    
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const currentValue = from + (to - from) * eased;
      callback(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };
    
    animationRef.current = requestAnimationFrame(step);
  };

  const handleAnimate = () => {
    const textPath = textPathRef.current;
    if (!textPath) return;

    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (!isAnimated) {
      // Animate in (100% to 0%)
      animate(100, 0, 3000, (value) => {
        textPath.setAttribute("startOffset", `${value}%`);
      });
    } else {
      // Animate out (0% to 100%)
      animate(0, 100, 3000, (value) => {
        textPath.setAttribute("startOffset", `${value}%`);
      });
    }

    setIsAnimated(!isAnimated);
  };

  return (
    <div className="app-container">
      <svg viewBox="0 0 800 400" className="wave-svg">
        <defs>
          <path
            id="wave-path"
            d="M50 200 C150 50 250 350 400 200 C550 50 650 350 750 200"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
        </defs>

        <text
          fill="#ffffff"
          fontFamily="Roboto, sans-serif"
          fontSize="40"
          fontWeight="700"
        >
          <textPath ref={textPathRef} href="#wave-path" startOffset="100%">
            Flowing <tspan fill="#f1c40f">Wave</tspan> motion in a compact design!
          </textPath>
        </text>
      </svg>

      <button className="animate-button" onClick={handleAnimate}>
        {isAnimated ? "Animate Out" : "Let's Animate!"}
      </button>
    </div>
  );
};

export default App;