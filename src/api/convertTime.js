const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
console.log(hour, day, year);

function convertToSeconds(time) {
  return convertRemainder(time, minute, second);
}

function convertToMinutes(time, roundUp) {
  return convertRemainder(time, hour, minute, roundUp);
}

function convertToHours(time, roundUp) {
  return convertRemainder(time, day, hour, roundUp);
}

function convertToDays(time, roundUp) {
  return convertRemainder(time, year, day, roundUp);
}

function convertToYears(time) {
  return Math.floor(time / year);
}

function convertRemainder(time, u1, u2, roundUp) {
  const convertedRemainder = roundUp
    ? Math.round((time % u1) / u2)
    : Math.floor((time % u1) / u2);

  return convertedRemainder;
}

function addSuffix(time, unit) {
  const string = `${time} ${unit}`;
  return time === 1 ? string : string + "s";
}

function addZero(time) {
  return time < 10 ? `0${time}` : time;
}

export function stopWatch(time) {
  const seconds = convertToSeconds(time);
  const minutes = convertToMinutes(time);
  const hours = Math.floor(time / hour);

  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

export function convertTimeToString(time) {
  if (time >= year) {
    const years = convertToYears(time);
    const days = convertToDays(time, true);

    return `${addSuffix(years, "year")}${
      days ? `\nand\n${addSuffix(days, "day")}` : ""
    }`;
  }
  if (time >= day) {
    const days = convertToDays(time);
    const hours = convertToHours(time, true);

    return `${addSuffix(days, "day")}${
      hours ? `\nand\n${addSuffix(hours, "hour")}` : ""
    }`;
  }
  if (time >= hour) {
    const hours = convertToHours(time);
    const minutes = convertToMinutes(time, true);

    return `${addSuffix(hours, "hour")}${
      minutes ? `\nand\n${addSuffix(minutes, "minute")}` : ""
    }`;
  }
  if (time >= minute) {
    const minutes = convertToMinutes(time);
    const seconds = convertToSeconds(time);

    return `${addSuffix(minutes, "minute")}${
      seconds ? `\nand\n${addSuffix(seconds, "second")}` : ""
    }`;
  }
  return `${addSuffix(time, "second")}`;
}
