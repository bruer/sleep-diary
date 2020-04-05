import React, { Component } from "react";
import TimerButton from "./TimerButton";
import SessionResult from "./SessionResult";
import {
  createSession,
  storeSessions,
  updateSessions
} from "../../api/session";
import styles from "./SleepSession.module.css";
import { timeDifference } from "../../api/convertTime";

export default class SleepSession extends Component {
  state = {
    time: 0,
    pausedAt: 0,
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
  updateTimer = startTime => {
    this.setState(({ pausedAt }) => ({
      time: pausedAt + timeDifference(startTime)
    }));
  };
  startTimer = () => {
    const currentTime = new Date().getTime() / 1000;
    this.timer = setInterval(this.updateTimer, 1000, currentTime);
    this.setState({ started: true, isOn: true });
  };
  stopTimer = () => {
    if (this.state.time > 0) {
      clearInterval(this.timer);
      this.setState({ isOn: false, pausedAt: this.state.time });
    }
  };
  resetTimer = () => {
    this.setState({ time: 0, pausedAt: 0, started: false, saved: false });
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
                  className={`${styles.resetButton} ${styles.letterspacing}`}
                  onClick={this.resetTimer}
                >
                  reset
                </button>
              )}
            </section>
            <section className={styles.middle}>
              {!this.state.saved && (
                <TimerButton
                  started={this.state.started}
                  isOn={this.state.isOn}
                  time={this.state.time}
                  start={this.startTimer}
                  stop={this.stopTimer}
                />
              )}
            </section>
            <section className={styles.bottom}>
              {this.state.started && !this.state.isOn && !this.state.saved && (
                <button
                  className={`${styles.saveButton} ${styles.letterspacing}`}
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
