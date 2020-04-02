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
      <section className={styles.top}>
        <h1>Sleep Stats</h1>
      </section>
      <section className={styles.middle}>
        <SessionList sessions={sessions} remove={removeSession} />
      </section>
      <section className={styles.bottom}>
        {sessions.length > 0 && <Stats sessions={sessions} />}
      </section>
    </>
  );
};

export default SleepStats;
