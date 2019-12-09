import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

const NavBar = () => (
  <div className="navbar">
    <h3>Task Manager</h3>
    <Link to="/">Current Tasks</Link>
    <Link to="/completed">Completed Tasks</Link>
  </div>
);

const Template = props => (
  <div>
    <NavBar />
    <p className="page-info">{props.title}:</p>
    <ul className={props.status}>
      <li>Task 1</li>
      <li>Task 2</li>
      <li>Task 3</li>
    </ul>
  </div>
);

const CurrentTasks = () => <Template title="Current Tasks" status="Current" />;

const CompletedTasks = () => (
  <Template title="Completed Tasks" status="Completed" />
);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={CurrentTasks} />
        <Route path="/completed" component={CompletedTasks} />
      </div>
    </BrowserRouter>
  );
}

export default App;
