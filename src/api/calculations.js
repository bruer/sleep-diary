export function totalSleepTime(sessions) {
  let sum = 0;
  sessions.forEach(session => (sum += session.duration));
  return sum;
}

export function averageSleepTime(sessions) {
  const sum = totalSleepTime(sessions);
  const average = sum / sessions.length;
  
  return average.toFixed(1);
}
