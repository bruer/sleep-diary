import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css"
import Navigation from "./Navigation";
import Home from "./Home";
import SleepSession from "./SleepSession";
import SleepStats from "./SleepStats";

export default () =>  (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/sleep-session" component={SleepSession} />
        <Route path="/sleep-stats" component={SleepStats} />
      </div>
    </BrowserRouter>
  );
