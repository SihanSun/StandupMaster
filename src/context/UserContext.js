import React from 'react';
import createDataContext from './createDataContext';
import { Auth } from 'aws-amplify';
import { navigate } from '../navigationRef';

const UserContext = React.createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'set_cognito_user':
      return { ...state, cognitoUser: action.payload };
    case 'sign_out':
      return { ...state, cognitoUser: null };
    default:
      return state;
  }
}

const setCognitoUser = dispatch => {
  return (cognitoUser) => {
    dispatch({ type: 'set_cognito_user', payload: cognitoUser });
  }
}

const signOut = dispatch => {
  return () => {
    Auth.signOut({ global: true })
      .then(() => {
        dispatch({ type: 'sign_out'});
        navigate('resolveAuth')
      });
  }
}

export const { Provider, Context } = createDataContext(
  userReducer,
  { setCognitoUser, signOut },
  { cognitoUser: null }
);