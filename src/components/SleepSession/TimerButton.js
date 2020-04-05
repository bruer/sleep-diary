import React from "react";
import { stopWatch } from "../../api/convertTime";
import styles from "./TimerButton.module.css";

const TimerButton = ({ started, isOn, time, start, stop }) => {
  const handleClick = () => {
    isOn ? stop() : start();
  };

  return (
    <div onClick={handleClick} className={styles.container}>
      <div className={`${styles.top} ${styles.letterspacing}`}>
        {started && !isOn ? "continue" : ""}
      </div>
      <div className={styles.middle}>
        {started ? (
          <p className={styles.counter}>{stopWatch(time)}</p>
        ) : (
          <p className={`${styles.text} ${styles.letterspacing}`}>start</p>
        )}
      </div>
      <div className={`${styles.bottom} ${styles.letterspacing}`}>
        {started && isOn ? "pause" : ""}
      </div>

      {/* <p className={`${styles.text} ${started ? styles.started : ""}`}>
        {!started ? "start" : isOn ? "pause" : "continue"}
      </p>
      <p className={styles.counter}>{started && stopWatch(time)}</p> */}
    </div>
  );
};

export default TimerButton;
