import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./Window.css";

const TOTAL_SHEETS = 10;
const SHEET_HEIGHT = 140;
const sheetTexts = [
  "Don't forget to wash your hands!",
  "You're doing great 💪",
  "Stay hydrated 🧃",
  "This sheet is absorbingly good.",
  "Almost done here!",
  "Keep scrolling...",
  "Remember to smile 😊",
  "Wipe out negativity!",
  "Stay fresh, stay clean.",
  "Last sheet! 🚽"
];

const App = () => {
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

  return (
    <div className="wrapper">
      {/* Fixed gradient spool */}
      <div className="spool"></div>

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

        {/* Sheets */}
        {sheetsToShow}

        {/* End of roll */}
        {sheetsLeft === 0 && (
          <div
            className="empty-container"
            style={{
              position: "absolute",
              top: TOTAL_SHEETS * SHEET_HEIGHT,
            }}
          >
            <div className="empty-spool"></div>
            <div className="empty">No more paper.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
