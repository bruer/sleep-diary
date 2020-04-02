import React from "react";
import Timer from "./Timer";
import styles from "./Timer.module.css";

const SleepSession = () => (
  <>
    <section className={styles.top}>
      <h1>Sleep Session</h1>
    </section>
    <Timer increment={1} />
  </>
);

export default SleepSession;
