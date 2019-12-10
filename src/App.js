import React, { Component } from "react";
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

class App extends Component {
  // async componentDidMount() {
  //   messaging.requestPermission()
  //     .then(async function() {
  //       const token = await messaging.getToken();
  //       console.log('token: ', token);
  //     })
  //     .catch(function(err) {
  //       console.log("Unable to get permission to notify.", err);
  //     });
  //   navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  // }

  render (){
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={CurrentTasks} />
          <Route path="/completed" component={CompletedTasks} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
