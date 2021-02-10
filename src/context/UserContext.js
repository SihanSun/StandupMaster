import React from 'react';

const UserContext = React.createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'change_name':
      return { state, name: action.payload };
    case 'change_status':
      return { state, status: action.payload };
  }
}

const changeUserName = dispatch => {
  return (name) => {
    dispatch({ type: 'change_name', payload: name });
  }
}

const changeUserStatus = dispatch => {
  return (status) => {
    dispatch({ type: 'change_status', payload: status });
  }
}

export const UserProvider = ({ children }) => {
  return <UserContext.Provider>
    {children}
  </UserContext.Provider>
}