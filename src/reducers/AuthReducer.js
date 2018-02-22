import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USER_LOGGED_OUT
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  loading: false  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER: 
      return { ...state, loading: true}
    case LOGIN_USER_SUCCESS: 
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case EMAIL_CHANGED: 
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED: 
      return { ...state, password: action.payload };
    case USER_LOGGED_OUT: 
      return INITIAL_STATE;
    default: 
      return state; 
  }
}