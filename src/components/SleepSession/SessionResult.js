import React from "react";
import { Link } from "react-router-dom";
import { convertTimeToString } from "../../api/convertTime";
import styles from "./SessionResult.module.css";

const SessionResult = ({ time, reset }) => {
  const handleClick = () => {
    reset();
  };
  return (
    <>
      <section className={styles.top}>
        <p>you slept for</p>
        <pre className={styles.time}>{convertTimeToString(time)}</pre>
      </section>
      <section className={styles.bottom}>
        <Link className={styles.statsButton} to="/sleep-stats">
          see stats
        </Link>
        <p>or</p>
        <button className={styles.resetButton} onClick={handleClick}>
          reset
        </button>
      </section>
    </>
  );
};

export default SessionResult;
