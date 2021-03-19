import React from 'react';
import createDataContext from './createDataContext';
import { Auth } from 'aws-amplify';
import { navigate } from '../navigationRef';

const PROFILE_PICTURE_DEFAULT = require('../../assets/pokemon.png');

const userReducer = (state, action) => {
  switch (action.type) {
    case 'set_cognito_user':
      return { ...state, cognitoUser: action.payload };
    case 'sign_out':
      return { ...state, cognitoUser: null };
    case 'set_display_name':
      return { ...state, displayName: action.payload };
    case 'set_first_name':
      return { ...state, firstName: action.payload };
    case 'set_last_name':
      return { ...state, lastName: action.payload };
    case 'set_last_name':
      return { ...state, pictureSrc: action.payload };
    case 'set_email':
      return { ...state, email: action.payload };
    case 'set_profile_picture':
      return { ...state, pictureSrc: action.payload };
    default:
      return state;
  }
}

const setCognitoUser = dispatch => {
  return (cognitoUser) => {
    cognitoUser && dispatch({ type: 'set_cognito_user', payload: cognitoUser });
  }
}

const setDisplayName = dispatch => {
  return (displayName) => {
    displayName && dispatch({ type: 'set_display_name', payload: displayName });
  }
}

const setFirstName = dispatch => {
  return (firstName) => {
    firstName && dispatch({ type: 'set_first_name', payload: firstName});
  }
}

const setLastName = dispatch => {
  return (lastName) => {
    lastName && dispatch({ type: 'set_last_name', payload: lastName });
  }
}

const setUserProfilePicture = dispatch => {
  return (source) => {
    console.log('source is ');
    console.log(source); 
    source && dispatch({ type: 'set_profile_picture', payload: source });
  }
}

const setUserEmail = dispatch => {
  return (email) => {
    email && dispatch({ type: 'set_email', payload: email });
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
  { setCognitoUser, signOut, setDisplayName, 
    setFirstName, setLastName, setUserProfilePicture, 
    setUserEmail },
  { cognitoUser: null, displayName: 'Default User', firstName: '', lastName: '', 
    pictureSrc: PROFILE_PICTURE_DEFAULT, email: ''}
);