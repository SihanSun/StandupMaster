import React from 'react';
import createDataContext from './createDataContext';

const PROFILE_PICTURE_DEFAULT = require('../../assets/meeting.jpg');

const teamReducer = (state, action) => {
  switch (action.type) {
    case 'set_name':
      return { ...state, name: action.payload };
    case 'set_announcement':
      return { ...state, announcement: action.payload };
    case 'set_profile_picture':
      return { ...state, pictureSrc: action.payload };
    case 'set_invitation_code':
      return { ...state, invitationCode: action.payload };
    default:
      return state;
  }
}

const setTeamName = dispatch => {
  return (name) => {
    dispatch({ type: 'set_name', payload: name });
  }
}

const setTeamAnnouncement = dispatch => {
  return (announcement) => {
    dispatch({ type: 'set_announcement', payload: announcement });
  }
}

const setTeamProfilePicture = dispatch => {
  return (source) => {
    dispatch({ type: 'set_profile_picture', payload: source });
  }
}

const setTeamInvitationCode = dispatch => {
  return (code) => {
    dispatch({ type: 'set_invitation_code', payload: code });
  }
}

export const { Provider, Context } = createDataContext(
  teamReducer,
  { setTeamName, setTeamAnnouncement, setTeamProfilePicture, setTeamInvitationCode },
  { name: 'Team Default', 
    announcement: 'There is no new announcement today',
    pictureSrc: PROFILE_PICTURE_DEFAULT,
    invitationCode: ''
   }
);