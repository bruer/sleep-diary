import React from "react";
import styles from "./SleepStats.module.css";
import { convertTimeToString } from "./api";
import { useEffect } from "react";
import { useState } from "react";

const SleepStats = () => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    // console.log(sessions);
    updateState();
  }, []);

  const updateState = () => {
    const localStorageItems = JSON.parse(localStorage.getItem("sleepSessions"));
    setSessions(localStorageItems ? localStorageItems : []);
  };

  const calculateTotalSleepTime = () => {
    let sum = 0;
    sessions.forEach(session => (sum += session.duration));
    return sum;
  };

  const removeSession = ({ target }) => {
    const filteredSessions = sessions.filter(session => {
      return session.id !== Number.parseFloat(target.parentNode.id);
    });
    // console.log(filteredSessions);
    localStorage.setItem("sleepSessions", JSON.stringify(filteredSessions));
    updateState();
  };
  return (
    <>
      <section className={styles.top}>
        <h1>Sleep Stats</h1>
      </section>
      <section className={styles.middle}>
        <ul className={styles.list}>
          {sessions.map((session, i) => (
            <li key={i} id={session.id} className={styles.listItem}>
              <b>{session.date.toLocaleString()}</b>
              <p>you slept for {convertTimeToString(session.duration)}</p>
              <button onClick={removeSession}>x</button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.bottom}>
        <p>
          your total sleep time is{" "}
          {convertTimeToString(calculateTotalSleepTime())}
        </p>
        <p>
          your average sleep time is{" "}
          {convertTimeToString(calculateTotalSleepTime() / sessions.length)}
        </p>
      </section>
    </>
  );
};

export default SleepStats;
