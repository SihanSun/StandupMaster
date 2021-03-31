import React from 'react';
import createDataContext from './createDataContext';
import { Auth } from 'aws-amplify';
import { navigate } from '../navigationRef';
import { putTeam, getTeam } from '../api/teams';
import { getStatus, putStatus } from '../api/userStatus';
import { getUsers, putUsers } from '../api/users';

const SharedContextReducer = (state, action) => {
  switch (action.type) {
    case 'set_cognito_user':
      return { ...state, cognitoUser: action.payload };
    case 'sign_out':
      return { ...state, cognitoUser: null}
    case 'set_user_info': 
      return { ...state, userInfo: action.payload };
    case 'set_team_info':
      return { ...state, teamInfo: action.payload }
    case 'set_user_status':
      return { ...state, userStatus: action.payload }
  }
}

const setCognitoUser = dispatch => {
  return (cognitoUser) => {
    cognitoUser && dispatch({ type: 'set_cognito_user', payload: cognitoUser });
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

const setUserInfo = dispatch => {
  return (userInfo) => {
    userInfo && dispatch({ type: 'set_user_info', payload: userInfo });
  }
}

const setUserDisplayName = dispatch => {
  return async (jwtToken, userInfo, newName) => {
    const { email, displayName, firstName, lastName } = userInfo;
    const data = JSON.stringify({
      email,
      displayName: newName,
      firstName,
      lastName
    });
    await putUsers(jwtToken, email, data);
    const newUserInfo = await getUsers(jwtToken, email);
    console.log('new user info!');
    console.log(newUserInfo);
    newUserInfo && dispatch({ type: 'set_user_info', payload: newUserInfo });
  }
}

const setUserFirstName = dispatch => {
  return async (jwtToken, userInfo, newFirstName) => {
    const { email, displayName, firstName, lastName } = userInfo;
    const data = JSON.stringify({
      email,
      displayName,
      firstName: newFirstName,
      lastName
    });
    await putUsers(jwtToken, email, data);
    const newUserInfo = await getUsers(jwtToken, email);
    console.log('new user info!');
    console.log(newUserInfo);
    newUserInfo && dispatch({ type: 'set_user_info', payload: newUserInfo });
  }
}

const setUserLastName = dispatch => {
  return async (jwtToken, userInfo, newLastName) => {
    const { email, displayName, firstName, lastName } = userInfo;
    const data = JSON.stringify({
      email,
      displayName,
      firstName,
      lastName: newLastName
    });
    await putUsers(jwtToken, email, data);
    const newUserInfo = await getUsers(jwtToken, email);
    console.log('new user info!');
    console.log(newUserInfo);
    newUserInfo && dispatch({ type: 'set_user_info', payload: newUserInfo });
  }
}

const setUserProfilePicture = dispatch => {
  return async (jwtToken, userInfo, profilePicture) => {
    const { email, displayName, firstName, lastName } = userInfo;
    const data = JSON.stringify({
      email,
      displayName,
      firstName,
      lastName,
      profilePicture
    });
    await putUsers(jwtToken, email, data);
    const newUserInfo = await getUsers(jwtToken, email);
    console.log('new user info!');
    console.log(newUserInfo);
    newUserInfo && dispatch({ type: 'set_user_info', payload: newUserInfo });
  }
}

const setTeamInfo = dispatch => {
  return (teamInfo) => {
    teamInfo && dispatch({ type: 'set_team_info', payload: teamInfo });
  }
}

const setTeamName = dispatch => {
  return async (jwtToken, teamInfo, newName) => {
    const { id, name, owner, announcement } = teamInfo;
    const payload = {
      name: newName,
      ownerEmail: owner.email,
      announcement
    }
    const data = JSON.stringify(payload);
    await putTeam(jwtToken, id, data);
    const newTeamInfo = await getTeam(jwtToken, id);
    teamInfo && dispatch({ type: 'set_team_info', payload: newTeamInfo });
  }
}

const setTeamAnnouncement = dispatch => {
  return async (jwtToken, teamInfo, newAnnouncement) => {
    const { id, name, owner, announcement } = teamInfo;
    const payload = {
      name,
      ownerEmail: owner.email,
      announcement: newAnnouncement
    }
    const data = JSON.stringify(payload);
    await putTeam(jwtToken, id, data);
    const newTeamInfo = await getTeam(jwtToken, id); 
    teamInfo && dispatch({ type: 'set_team_info', payload: newTeamInfo });
  }
}

const setTeamProfilePicture = dispatch => {
  return async (jwtToken, teamInfo, profilePicture) => {
    const { id, name, owner, announcement } = teamInfo;
    const payload = {
      name,
      ownerEmail: owner.email,
      announcement,
      profilePicture
    }
    const data = JSON.stringify(payload);
    await putTeam(jwtToken, id, data);
    const newTeamInfo = await getTeam(jwtToken, id); 
    teamInfo && dispatch({ type: 'set_team_info', payload: newTeamInfo });
  }
}

const setUserStatus = dispatch => {
  return (userStatus) => {
    userStatus && dispatch({ type: 'set_user_status', payload: userStatus});
  }
}

const uploadUserStatus = dispatch => {
  return async (jwtToken, userInfo, callback) => {
    const { email, isBlocked, presentation } = userInfo;
    const data = JSON.stringify({
      isBlocked,
      presentation
    });
    await putStatus(jwtToken, email, data);
    const userStatus = await getStatus(jwtToken, email);
    setUserStatus(userStatus);
  }
}

export const { Provider, Context } = createDataContext(
  SharedContextReducer,
  { setCognitoUser, signOut, setUserInfo, setTeamInfo, setUserStatus, setUserProfilePicture,
    setTeamName, setTeamAnnouncement, setTeamProfilePicture,
    uploadUserStatus,
    setUserDisplayName, setUserFirstName, setUserLastName
   },
  { cognitoUser: null, userInfo: null, teamInfo: null, userStatus: null }
);