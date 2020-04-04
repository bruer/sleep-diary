import React from "react";
import { convertTimeToString } from "../../api/convertTime";
import { totalSleepTime, averageSleepTime } from "../../api/calculations";
import styles from "./Stats.module.css";

const Stats = ({ sessions }) => {
  const total = totalSleepTime(sessions);
  const average = averageSleepTime(sessions);
  return (
    <div className={styles.stats}>
      <p className={styles.text}>your total sleep time is</p>
      <p className={styles.time}>{convertTimeToString(total)}</p>
      <p className={styles.text}>your average sleep time is</p>
      <p className={styles.time}>{convertTimeToString(average)}</p>
    </div>
  );
};

export default Stats;
