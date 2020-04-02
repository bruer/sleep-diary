function generateId() {
  return `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

export function createSession(time) {
  return {
    id: generateId(),
    date: new Date().toLocaleString(),
    duration: time
  };
}

export function fetchSessions() {
  return localStorage.getItem("sleepSessions")
    ? JSON.parse(localStorage.getItem("sleepSessions"))
    : [];
}

export function filterSessions(sessions, id) {
  return sessions.filter(session => session.id !== id);
}

export function storeSessions(sessions) {
  localStorage.setItem("sleepSessions", JSON.stringify(sessions));
}

export function updateSessions(newSession, sessions) {
  return [newSession, ...sessions];
}
