import axios from 'axios';

import { CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILE, PROFILE_LOADING, SET_CURRENT_USER } from './actionTypes';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from './authActions';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
            dispatch({
                       type: GET_PROFILE,
                       payload: res.data
                     }))
    .catch(err =>
             dispatch({
                        type: GET_PROFILE,
                        payload: {}
                      }));
};

// Delete account & profile
export const deleteAccount = history => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res => {
        // Remove token from localStorage
        localStorage.removeItem('jwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch({
                   type: SET_CURRENT_USER,
                   payload: {}
                 });
      })
      .catch(err =>
               dispatch({
                          type: GET_ERRORS,
                          payload: err.response.data
                        }));
  }
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
             dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                      }));
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};