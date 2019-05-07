import { ADD_POST, CLEAR_ERRORS, GET_ERRORS } from '../actions/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    case CLEAR_ERRORS:
      return {};

    case ADD_POST:
      return {};

    default:
      return state;
  }
}