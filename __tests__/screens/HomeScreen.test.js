import React from 'react';
import { shallow, mount, render } from 'enzyme';

import HomeScreen from '../../src/screens/HomeScreen';
import { Provider } from '../../src/context/SharedContext';

import teamAPI from '../../src/api/teams';
console.error = jest.fn()

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
  }],
  owner: {
    email: 'test1@example.com'
  }
};

describe('HomeScreen', () => {
  beforeEach(() => {
    teamAPI.getTeam = jest.fn(async () => {
      return teamInfo
    });
    
  })
  it('should fetch team in startup', () => {
    const wrapper = render(
      <Provider testValue={{state: { cognitoUser, userInfo }}}>
        <HomeScreen/>
      </Provider>
    );
  
    const homeScreen = wrapper.find('HomeScreen');
  });
})