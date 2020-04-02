import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import SleepSession from "./components/SleepSession/SleepSession";
import SleepStats from "./components/SleepStats/SleepStats";
import { fetchSessions } from "./api/session";
import "./App.css";

const App = () => {
  const [sessions, setSessions] = useState([]);
  const update = useCallback(() => setSessions(fetchSessions()), []);
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <main>
          <Switch>
            <Route path="/sleep-stats">
              <SleepStats sessions={sessions} updateState={update} />
            </Route>
            <Route path="/">
              <SleepSession
                sessions={sessions}
                updateState={update}
                increment={1}
              />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
