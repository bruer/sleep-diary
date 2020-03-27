import React from "react";

export default () => {
  const sleepDurations = JSON.parse(localStorage.getItem("sleepDurations"));

  const calculateTotalSleepTime = () => {
    let sum = 0;
    sleepDurations.forEach(session => (sum += session.duration));
    return sum;
  };
  return (
    <div>
      <h1>sleep stats</h1>
      <ul>
        {sleepDurations.map((session, i) => (
          <li key={i}>
            you slept {session.duration} seconds at{" "}
            {session.date.toLocaleString()}
          </li>
        ))}
      </ul>
      <p>your total sleep time is {calculateTotalSleepTime()} seconds</p>
      <p>
        your average sleep time is{" "}
        {calculateTotalSleepTime() / sleepDurations.length} seconds
      </p>
    </div>
  );
};
