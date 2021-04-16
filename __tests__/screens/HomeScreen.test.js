import React from 'react';
import { shallow, mount } from 'enzyme';

import HomeScreen from '../../src/screens/HomeScreen';
import { Provider } from '../../src/context/SharedContext';

import teamAPI from '../../src/api/teams';

const userInfo = {
  teamId: 123,
  email: 'test@example.com'
}
const cognitoUser = {
  signInUserSession: {
    idToken: {
      jwtToken: 'test token'
    }
  }
}

const teamInfo = {
  members: [{
    email: 'test1@example.com'
  }, {
    email: 'test2@example.com'
  }, {
    email: 'test3@example.com'
  }]
};

describe('HomeScreen', () => {
  beforeEach(() => {
    teamAPI.getTeam = jest.fn(async () => {
      return teamInfo
    });
    
  })
  it('should fetch team in startup', () => {
    const wrapper = shallow(
      <Provider value={{state: { cognitoUser, userInfo }}}>
        <HomeScreen/>
      </Provider>
    );
  
    const homeScreen = wrapper.find('HomeScreen').dive();
    expect(homeScreen.find('RowTemplate')).toBe(true);
  });
})