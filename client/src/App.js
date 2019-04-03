import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './componnents/layout/Header';
import Landing from './componnents/layout/Landing';
import Register from './componnents/auth/Register';
import Login from './componnents/auth/Login';
import Footer from './componnents/layout/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact
                 path="/"
                 component={Landing} />
          <div className="container">
            <Route exact
                   path="/login"
                   component={Login} />
            <Route exact
                   path="/register"
                   component={Register} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;