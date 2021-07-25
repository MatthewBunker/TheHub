import Login from './Components/Login';
import Stock from './Components/Stocks/Stock';
import Finances from './Components/Finances/Finances';
import TodoList from './Components/TodoList/TodoList';

import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/stock" component={Stock} />
          <Route path="/finances" component={Finances} />
          <Route path="/todolist" component={TodoList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
