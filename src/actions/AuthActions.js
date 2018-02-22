import { AsyncStorage } from 'react-native';


import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USER_LOGGED_OUT
} from './types';

export const loginUserSuccess = (dispatch, user) => {
  console.log("Logging in was a success");
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  // redirect here 
};

export const loginUser = ({ email, password }) => {

  try {
    return (dispatch) => {
      dispatch({ type: LOGIN_USER });

      // create a fake user and log it in
      const user = { email };
      try {
        AsyncStorage.setItem('InfoCityUser', JSON.stringify(email)).then(() => {
          console.log("This is the thing: ", email);
          loginUserSuccess(dispatch, user);
        });
      } catch (error) {
        console.log("Error while saving user", error);
      }
      
      
    }
  } catch (error) {
    console.log("Went to shit", error);
  }
  // at the moment we will fake this and just pass the user along to the maps

};

export const logOutUser = (user) => {
  try {
    return (dispatch) => {
      dispatch({ type: USER_LOGGED_OUT });

      AsyncStorage.removeItem('InfoCityUser', user);
     }
  } catch (err) {
    console.log("Error... ", err);
  }
}

export const mailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};