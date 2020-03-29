import React from "react";
import styles from "./SleepStats.module.css"

export default () => {
  const sleepDurations = JSON.parse(localStorage.getItem("sleepDurations"));

  const calculateTotalSleepTime = () => {
    let sum = 0;
    sleepDurations.forEach(session => (sum += session.duration));
    return sum;
  };
  return (
    <div>
      <h1>Sleep Stats</h1>
      <ul>
        {sleepDurations.map((session, i) => (
          <li key={i} className={styles.listItem}>
            <b>{session.date.toLocaleString()}</b>
            <p>you slept {session.duration} seconds</p>
          </li>
        ))}
      </ul>
      <p>your total sleep time is {calculateTotalSleepTime()} seconds</p>
      <p>
        your average sleep time is{" "}
        {calculateTotalSleepTime() / sleepDurations.length} seconds
      </p>
    </div>
  );
};
