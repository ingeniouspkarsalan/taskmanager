import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/layouts/navbar";
import Landing from './components/layouts/landing';
import Footer from "./components/layouts/footer";

import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Dashboard from './components/dashboard/dashboard';

import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

import PrivateRoute from "./common/privateRoute";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser,logoutuser } from "./actions/authAction";

if(localStorage.jwt_token){
  setAuthToken(localStorage.jwt_token);
  const decode = jwt_decode(localStorage.jwt_token);
  store.dispatch(setCurrentUser(decode));
  const currenttime = Date.now() / 1000;
  if(decode.exp < currenttime){
    store.dispatch(logoutuser());
    window.location.href='/login';
  }
}


class App extends Component {
  render() {
    return (
      <div>
        <Provider store={ store }>
      <Router>
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/login" component={ Login }/>
        <Route exact path="/register" component={ Register }/>
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard}/>
        </Switch>
        <Footer/>
        </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
