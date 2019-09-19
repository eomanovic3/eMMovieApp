/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import { fromJS } from 'immutable';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
});

/* eslint-disable default-case, no-param-reassign */
function appReducer(state = initialState, action) {
  return state;
}


export default appReducer;
