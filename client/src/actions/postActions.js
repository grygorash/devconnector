import axios from 'axios';

import { ADD_POST, DELETE_POST, GET_ERRORS, GET_POST, GET_POSTS, POST_LOADING } from './actionTypes';
import { clearErrors } from './authActions';


// Get posts
export const getPosts = noReload => dispatch => {
  !noReload && dispatch(setPostLoading());

  axios
    .get('/api/posts')
    .then(res =>
            dispatch({
                       type: GET_POSTS,
                       payload: res.data
                     }))
    .catch(err =>
             dispatch({
                        type: GET_POSTS,
                        payload: null
                      }));
};

// Get post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/posts/${id}`)
    .then(res =>
            dispatch({
                       type: GET_POST,
                       payload: res.data
                     }))
    .catch(err =>
             dispatch({
                        type: GET_POST,
                        payload: null
                      }));
};

// Add post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res =>
            dispatch({
                       type: ADD_POST,
                       payload: res.data
                     }))
    .then(dispatch(clearErrors()))
    .catch(err =>
             dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                      }));
};

// Add comment
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
            dispatch({
                       type: GET_POST,
                       payload: res.data
                     }))
    .then(dispatch(clearErrors()))
    .catch(err =>
             dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                      }));
};

// Delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
            dispatch({
                       type: DELETE_POST,
                       payload: id
                     }))
    .catch(err =>
             dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                      }));
};

// Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
            dispatch({
                       type: GET_POST,
                       payload: res.data
                     }))
    .catch(err =>
             dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                      }));
};

// Add like
export const addLike = (id, noReload) => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res =>
            dispatch(getPosts(noReload)))
    .catch(err =>
             dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                      }));
};

// Delete like
export const addUnlike = (id, noReload) => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res =>
            dispatch(getPosts(noReload)))
    .catch(err =>
             dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                      }));
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};