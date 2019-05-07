import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, auth, ...rest}) =>
  <Route {...rest}
         render={
           props =>
             auth.isAuthenticated ?
               <Component {...props} /> :
               <Redirect to="/" />
         }
  />;

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const marStateToProps = state => ({
  auth: state.auth
});

export default connect(marStateToProps)(PrivateRoute);