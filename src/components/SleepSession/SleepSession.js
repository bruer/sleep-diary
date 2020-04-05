import React, { Component } from "react";
import TimerButton from "./TimerButton";
import SessionResult from "./SessionResult";
import {
  createSession,
  storeSessions,
  updateSessions
} from "../../api/session";
import styles from "./SleepSession.module.css";
import { timer } from "../../api/convertTime";

export default class SleepSession extends Component {
  state = {
    start: 0,
    time: 0,
    started: false,
    isOn: false,
    saved: false
  };
  componentDidMount() {
    this.props.updateState();
  }
  componentWillUnmount() {
    this.stopTimer();
  }
  updateTimer = start => {
    this.setState((state, props) => ({
      time: state.start + props.increment(start)
    }));
  };
  startTimer = () => {
    // this.setState({ start: new Date().getTime() / 1000 });
    // this.timeID = setInterval(
    //   this.updateTimer,
    //   1000,
    //   new Date().getTime() / 1000 + this.state.time
    //   // this.state.start
    // );

    this.timeID = setInterval(
      this.updateTimer,
      1000,
      new Date().getTime() / 1000
    );

    // this.timeID = setInterval(() => {
    //   this.setState(({ time }, { increment }) => ({
    //     time: time + increment
    //   }));
    // }, 1000);
    this.setState({ started: true, isOn: true });
  };
  stopTimer = () => {
    if (this.state.time > 0) {
      clearInterval(this.timeID);
      this.setState({ isOn: false, start: this.state.time });
    }
  };
  resetTimer = () => {
    this.setState({ time: 0, started: false, saved: false });
  };
  saveSession = () => {
    const session = createSession(this.state.time);
    const updatedSessions = updateSessions(session, this.props.sessions);
    storeSessions(updatedSessions);

    this.props.updateState();
    this.setState({ saved: true });
  };
  render() {
    return (
      <>
        {!this.state.saved && (
          <>
            <section className={styles.top}>
              {this.state.started && !this.state.isOn && !this.state.saved && (
                <button
                  className={styles.resetButton}
                  onClick={this.resetTimer}
                >
                  reset
                </button>
              )}
            </section>
            <section className={styles.middle}>
              {!this.state.saved && (
                <TimerButton
                  isOn={this.state.isOn}
                  started={this.state.started}
                  time={this.state.time}
                  start={this.startTimer}
                  stop={this.stopTimer}
                />
              )}
            </section>
            <section className={styles.bottom}>
              {this.state.started && !this.state.isOn && !this.state.saved && (
                <button
                  className={styles.saveButton}
                  onClick={this.saveSession}
                >
                  save
                </button>
              )}
            </section>
          </>
        )}
        {this.state.saved && (
          <SessionResult time={this.state.time} reset={this.resetTimer} />
        )}
      </>
    );
  }
}
