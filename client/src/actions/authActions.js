import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER } from './actionTypes';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
             dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                      })
    );
};

// Login  - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const {token} = res.data;
      // Set token to localStorage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
             dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  history && history.push('/');
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
