import React from "react";
import { stopWatch } from "../../api/convertTime";
import styles from "./TimerButton.module.css";

const TimerButton = ({ isOn, started, time, start, stop }) => {
  const handleClick = () => {
    isOn ? stop() : start();
  };
  
  return (
    <div onClick={handleClick} className={styles.container}>
      <p className={`${styles.text} ${started ? styles.started : ""}`}>
        {!started ? "start" : isOn ? "pause" : "continue"}
      </p>
      <p className={styles.counter}>{started && stopWatch(time)}</p>
    </div>
  );
};

export default TimerButton;
