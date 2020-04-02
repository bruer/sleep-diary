import React, { Component } from "react";
import styles from "./Timer.module.css";
import { convertTimeToString, stopWatch } from "./api";
import { Link } from "react-router-dom";

export default class Timer extends Component {
  state = {
    time: 0,
    started: false,
    isOn: false,
    saved: false
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.timeID = setInterval(() => {
      this.setState(({ time }, { increment }) => ({
        time: time + increment
      }));
    }, 1000);
    this.setState({ started: true, isOn: true });
  };

  stopTimer = () => {
    if (this.state.time > 0) {
      clearInterval(this.timeID);
      this.setState({ isOn: false });
    }
  };

  resetTimer = () => {
    this.setState({ time: 0, started: false, saved: false });
  };

  storeTime = () => {
    const sleepSessions = localStorage.getItem("sleepSessions")
      ? JSON.parse(localStorage.getItem("sleepSessions"))
      : [];

    localStorage.setItem(
      "sleepSessions",
      JSON.stringify([
        {
          id: Math.random(),
          date: new Date().toLocaleString(),
          duration: this.state.time
        },
        ...sleepSessions
      ])
    );
    this.setState({ saved: true });
  };
  render() {
    return (
      <>
        <section className={styles.middle}>
          {!this.state.saved && (
            <div
              onClick={this.state.isOn ? this.stopTimer : this.startTimer}
              className={styles.mainButton}
            >
              <p
                className={`${styles.text} ${
                  this.state.started ? styles.started : ""
                }`}
              >
                {!this.state.started
                  ? "start"
                  : this.state.isOn
                  ? "pause"
                  : "continue"}
              </p>
              <p className={styles.counter}>
                {this.state.started && stopWatch(this.state.time)}
              </p>
            </div>
          )}
          {this.state.saved && (
            <div className={styles.resultsContainer}>
              <p>you slept for {convertTimeToString(this.state.time)}</p>
              <Link to="sleep-stats">see stats?</Link>
              <p>or</p>
              <button onClick={this.resetTimer}>reset?</button>
            </div>
          )}
        </section>
        <section className={styles.bottom}>
          {this.state.started && !this.state.isOn && !this.state.saved && (
            <div className={styles.buttonsContainer}>
              <button onClick={this.resetTimer}>reset</button>
              <button onClick={this.storeTime}>save</button>
            </div>
          )}
        </section>
      </>
    );
  }
}
