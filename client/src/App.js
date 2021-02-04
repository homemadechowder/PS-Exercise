import React, { Component } from "react";
import { BrowserRouter as 
  Router,
  Switch,
  Route,
  Link } from 'react-router-dom';
import Editor from './components/editor/editor.page';
import logo from "./logo.svg";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Editor} />
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
