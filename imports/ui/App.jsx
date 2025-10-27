import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./Window.css";

const TOTAL_SHEETS = 10;
const SHEET_HEIGHT = 140;

const App = () => {
  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(5);
  const [sheetsLeft, setSheetsLeft] = useState(TOTAL_SHEETS);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const consumed = Math.floor(scrollTop / SHEET_HEIGHT);
    const remaining = Math.max(TOTAL_SHEETS - consumed, 0);
    setSheetsLeft(remaining);

    const start = Math.max(consumed - 5, 0);
    const end = Math.min(consumed + 15, TOTAL_SHEETS);
    setVisibleStart(start);
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
      ></div>
    );
  }

  return (
    <div className="wrapper">
      {/* Fixed gradient spool */}
      <div className="spool"></div>

      <div
        className="roll"
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
