import React from 'react';
import createDataContext from './createDataContext';

const UserContext = React.createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'set_cognito_user':
      return { ...state, cognitoUser: action.payload };
    default:
      return state;
  }
}

const setCognitoUser = dispatch => {
  return (cognitoUser) => {
    dispatch({ type: 'set_cognito_user', payload: cognitoUser });
  }
}

export const { Provider, Context } = createDataContext(
  userReducer,
  { setCognitoUser },
  { cognitoUser: null }
);