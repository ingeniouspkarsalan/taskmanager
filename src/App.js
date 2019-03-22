import React, { Component } from 'react';
import './App.css';
import Navbars from './components/layouts/headerNav';
import Landing from './components/layouts/landing';
import Footer from "./components/layouts/footer";

import Login from "./components/auth/login";
import Register from "./components/auth/register";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={ store }>
      <Router>
        <Navbars/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/login" component={ Login }/>
        <Route exact path="/register" component={ Register }/>
        <Footer/>
        </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
