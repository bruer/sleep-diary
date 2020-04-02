import React from "react";
import { convertTimeToString } from "../../api/convertTime";
import styles from "./SessionList.module.css";

const SessionList = ({ sessions, remove }) => {
  const handleClick = ({ target }) => {
    remove(target.parentNode.id);
  };
  return (
    <ul className={styles.list}>
      {sessions.map(session => (
        <li key={session.id} id={session.id} className={styles.listItem}>
          <b>{session.date.toLocaleString()}</b>
          <p>you slept for {convertTimeToString(session.duration)}</p>
          <button onClick={handleClick}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default SessionList;
