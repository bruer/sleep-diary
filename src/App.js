import React, { useState } from "react";
import SleepStats from "./SleepStats";
import Timer from "./Timer";
import "./App.css";

export default () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="App">
      <nav>
        <button
          onClick={() =>
            setCurrentPage(currentPage === "home" ? "timer" : "home")
          }
        >
          {currentPage === "home" ? "Sleep Session" : "Home"}
        </button>
        <button
          onClick={() =>
            setCurrentPage(
              currentPage === "home" || currentPage === "timer"
                ? "stats"
                : "timer"
            )
          }
        >
          {currentPage === "home" || currentPage === "timer"
            ? "Sleep Stats"
            : "Sleep Session"}
        </button>
      </nav>
      {currentPage === "home" && <h1>welcome!!</h1>}
      {currentPage === "timer" && <Timer increment={1} />}
      {currentPage === "stats" && <SleepStats />}
    </div>
  );
};
