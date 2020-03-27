import React, { Component } from "react";

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
      <div>
        <button onClick={!this.state.isOn ? this.startTimer : this.stopTimer}>
          {!this.state.isOn ? "start" : "stop"}
        </button>

        {this.state.started && <p>{this.state.time}</p>}

        {this.state.started && !this.state.isOn && (
          <div>
            <button onClick={this.resetTimer}>reset</button>
            <button onClick={this.storeTime}>save</button>
          </div>
        )}
        {this.state.finalTime && (
          <p>
            you have slept for {this.state.finalTime} seconds. congratulations!!
          </p>
        )}
      </div>
    );
  }
}
