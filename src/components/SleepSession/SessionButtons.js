import React from "react";
import styles from "./SessionButtons.module.css";

const SessionButtons = ({ reset, save }) => {
  const handleClick = ({ target }) => {
    target.innerHTML === "reset" ? reset() : save();
  };
  return (
    <div className={styles.container}>
      <button onClick={handleClick}>reset</button>
      <button onClick={handleClick}>save</button>
    </div>
  );
};

export default SessionButtons;
