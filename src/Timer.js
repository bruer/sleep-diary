import React, { Component } from "react";
import styles from "./Timer.module.css";
import { convertTimeToString, stopWatch } from "./api";

export default class Timer extends Component {
  state = {
    time: 0,
    started: false,
    isOn: false,
    finalTime: false
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
    this.setState({ started: true, isOn: true, finalTime: false });
  };

  stopTimer = () => {
    clearInterval(this.timeID);
    this.setState({ isOn: false });
  };

  resetTimer = () => {
    this.setState({ time: 0, started: false });
  };

  storeTime = () => {
    const sleepDurations = localStorage.getItem("sleepDurations")
      ? JSON.parse(localStorage.getItem("sleepDurations"))
      : [];

    localStorage.setItem(
      "sleepDurations",
      JSON.stringify([
        { date: new Date().toLocaleString(), duration: this.state.time },
        ...sleepDurations
      ])
    );
    this.setState({ finalTime: this.state.time });
    this.resetTimer();
  };
  render() {
    return (
      <>
        <section className={styles.middle}>
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
        </section>
        <section className={styles.bottom}>
          {this.state.started && !this.state.isOn && (
            <div className={styles.buttonsContainer}>
              <button onClick={this.resetTimer}>reset</button>
              {this.state.time > 0 && (
                <button onClick={this.storeTime}>save</button>
              )}
            </div>
          )}
          {this.state.finalTime && (
            <p>you slept for {convertTimeToString(this.state.finalTime)}</p>
          )}
        </section>
      </>
    );
  }
}
