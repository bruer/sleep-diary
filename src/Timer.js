import React, { Component } from "react";
import styles from "./Timer.module.css";

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
              {this.state.isOn ? "stop" : "start"}
            </p>
            <p className={styles.counter}>
              {this.state.started && this.state.time}
            </p>
          </div>
        </section>
        <section className={styles.bottom}>
          {this.state.started && !this.state.isOn && (
            <div className={styles.buttonsContainer}>
              <button onClick={this.resetTimer}>reset</button>
              <button onClick={this.storeTime}>save</button>
            </div>
          )}
          {this.state.finalTime && (
            <p>
              you have slept for {this.state.finalTime} seconds.
              congratulations!!
            </p>
          )}
        </section>
      </>
    );
  }
}
