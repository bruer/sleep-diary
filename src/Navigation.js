import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default () => (
  <nav>
    {/* <Link to="/">Home</Link> */}
    <ul className={styles.navList}>
      {/* <li>
        <Link to="/">Home</Link>
      </li> */}
      <li>
        <Link to="/sleep-session">Sleep Session</Link>
      </li>
      <li>
        <Link to="/sleep-stats">Sleep Stats</Link>
      </li>
    </ul>
  </nav>
);
