import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
<<<<<<< Updated upstream
  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(2);
  const [sheetsLeft, setSheetsLeft] = useState(TOTAL_SHEETS);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  const consumed = Math.floor(scrollTop / SHEET_HEIGHT);
  const remaining = Math.max(TOTAL_SHEETS - consumed, 0);
  setSheetsLeft(remaining);

  // +1 ensures next sheet loads before you reach it
  const end = Math.min(consumed + 3, TOTAL_SHEETS);
  setVisibleEnd(end);
};



  const sheetsToShow = [];
  for (let i = visibleStart; i < visibleEnd; i++) {
    sheetsToShow.push(
      <div
        key={i}
        className="sheet"
        style={{
          position: "absolute",
          top: i * SHEET_HEIGHT, // ⬅ restore top positioning
        }}
      >
        {/* <p className="sheet-text">{sheetTexts[i]}</p> */}
      </div>
    );
  }
=======
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
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
      <svg width="0" height="0">
  <clipPath id="sheetClip" clipPathUnits="objectBoundingBox" transform="scale(0.0034, 0.0071)">
    <path
      d="
        M 0,25
        Q 145,0 290,25
        L 290,125
        Q 270,138 250,130
        Q 230,138 210,130
        Q 190,138 170,130
        Q 150,138 130,130
        Q 110,138 90,130
        Q 70,138 50,130
        Q 30,138 10,130
        Q 0,135 0,125
        Z
      "
    />
  </clipPath>
</svg>

      <div
        className="roll parallelogram" 
        ref={containerRef}
        onScroll={handleScroll}
        style={{ position: "relative" }}
      >
        {/* Spacer defines total scroll height */}
        <div style={{ height: TOTAL_SHEETS * SHEET_HEIGHT }}></div>
=======
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
>>>>>>> Stashed changes

      <button className="animate-button" onClick={handleAnimate}>
        {isAnimated ? "Animate Out" : "Let's Animate!"}
      </button>
    </div>
  );
};

export default App;