import React, { useEffect } from "react";
import SessionList from "./SessionList";
import Stats from "./Stats";
import { storeSessions, filterSessions } from "../../api/session";
import styles from "./SleepStats.module.css";

const SleepStats = ({ sessions, updateState }) => {
  useEffect(() => {
    updateState();
  }, [updateState]);

  const removeSession = id => {
    const filteredSessions = filterSessions(sessions, id);
    storeSessions(filteredSessions);
    updateState();
  };
  return (
    <>
      {sessions.length <= 0 && (
        <p className={styles.message}>you need to sleep</p>
      )}
      {sessions.length > 0 && (
        <>
          <section className={styles.container}>
            <Stats sessions={sessions} />
            <SessionList sessions={sessions} remove={removeSession} />
          </section>
        </>
      )}
    </>
  );
};

export default SleepStats;
