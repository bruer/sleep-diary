import React from "react";
import { stopWatch } from "../../api/convertTime";
import styles from "./TimerButton.module.css";
import { useState } from "react";

const TimerButton = ({ started, isOn, time, start, stop }) => {
  const [border, setBorder] = useState({});
  const [timerId, setTimerId] = useState(0);

  const handleClick = () => {
    // if (isOn) {
    //   stop();
    //   stopAnimation();
    // } else {
    //   start();
    //   startAnimation();
    // }
    isOn ? stop() : start();
  };
  const getBorder = counter => {
    const borders = [
      { borderTop: "inset" },
      { borderRight: "outset" },
      { borderBottom: "outset" },
      { borderLeft: "inset" }
    ];
    return borders[counter % 4];
  };

  const startAnimation = () => {
    let n = 0;
    setTimerId(
      setInterval(() => {
        setBorder(getBorder(++n));
      }, 250)
    );
  };
  const stopAnimation = () => {
    clearInterval(timerId);
  };

  return (
    <div
      onClick={handleClick}
      className={styles.container}
      style={{
        backgroundColor: isOn && time % 2 ? "blue" : "aquamarine"
      }}
    >
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
    </div>
  );
};

export default TimerButton;
