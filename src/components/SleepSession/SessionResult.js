import React from "react";
import { Link } from "react-router-dom";
import { convertTimeToString } from "../../api/convertTime";
import styles from "./SessionResult.module.css";

const SessionResult = ({ time, reset }) => {
  const handleClick = () => {
    reset();
  };
  return (
    <div className={styles.container}>
      <p>you slept for {convertTimeToString(time)}</p>
      <Link to="/sleep-stats">see stats?</Link>
      <p>or</p>
      <button onClick={handleClick}>reset?</button>
    </div>
  );
};

export default SessionResult;
