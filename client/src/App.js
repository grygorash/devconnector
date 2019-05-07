import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';

import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
import CreateEditProfile from './components/create-edit-profile/CreateEditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';
import Footer from './components/layout/Footer';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expire token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route
              exact
              path="/"
              component={Landing} />
            <div className="container">
              <Route
                path="/login"
                component={Login} />
              <Route
                path="/register"
                component={Register} />
              <Route
                path="/profiles"
                component={Profiles} />
              <Route
                path="/profile/:handle"
                component={Profile} />
              <Switch>
                <PrivateRoute
                  path="/dashboard"
                  component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/create-profile"
                  component={CreateEditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/edit-profile"
                  component={CreateEditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/add-experience"
                  component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/add-education"
                  component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/feed"
                  component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/post/:id"
                  component={Post} />
              </Switch>
              <Route
                path="/not-found"
                component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;