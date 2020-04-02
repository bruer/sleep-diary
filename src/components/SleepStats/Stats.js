import React from "react";
import { convertTimeToString } from "../../api/convertTime";
import { totalSleepTime, averageSleepTime } from "../../api/calculations";

const Stats = ({ sessions }) => {
  const total = totalSleepTime(sessions);
  const average = averageSleepTime(sessions);
  return (
    <div>
      <p>your total sleep time is {convertTimeToString(total)}</p>
      <p>your average sleep time is {convertTimeToString(average)}</p>
    </div>
  );
};

export default Stats;
