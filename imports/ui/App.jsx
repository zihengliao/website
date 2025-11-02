import React, { useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const textPathRef = useRef(null);
  const animationRef = useRef(null);

  const animate = (from, to, duration, callback) => {
    const startTime = performance.now();
    
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
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

  useEffect(() => {
    const textPath = textPathRef.current;
    if (!textPath) return;

    // Start animation automatically
    animate(100, 0, 3000, (value) => {
      textPath.setAttribute("startOffset", `${value}%`);
    });

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency array = runs once on mount

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
            Hi, I'm <tspan fill="#f1c40f">Ziheng</tspan>! Welcome to my portfolio
            <tspan fontSize="25">o</tspan>
            <tspan fontSize="15">o</tspan>
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default App;