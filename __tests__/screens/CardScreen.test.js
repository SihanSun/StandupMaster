import React from 'react';
import { shallow } from 'enzyme';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import * as StatusAPI from '../../src/api/userStatus';
import * as UserAPI from '../../src/api/users';

import CardScreen from '../../src/screens/CardScreen';

// remove console error
console.error = jest.fn();

const userInfo = {
  teamId: 123,
  email: 'test@example.com',
  profilePictureUrl: 'profile url',
  firstName: 'first name',
  lastName: 'last name',
  displayName: 'display name'
}

const cognitoUser = {
  signInUserSession: {
    idToken: {
      jwtToken: 'test token'
    }
  }
}

const context = { 
  state: { cognitoUser, userInfo }, 
  setUserStatus: jest.fn(), 
  setUserInfo: jest.fn(), 
  uploadUserStatus: jest.fn()
}

describe('CardScreen', () => {
  let wrapper;

  beforeEach(() => {
    CardScreen.contextTypes = {
      state: PropTypes.any,
      setUserStatus: PropTypes.any,
      setUserInfo: PropTypes.any,
      uploadUserStatus: PropTypes.any
    }

    AsyncStorage.getItem = jest.fn();
  })

  it('should fetch prev work locally', (done) => {
    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1, "prevWork");
      done();
    });
  })

  it('should fetch isBlocked locally', (done) => {
    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(2, "isBlocked");
      done();
    });
  })

  it('should fetch Block locally', (done) => {
    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(3, "block");
      done();
    });
  })

  it('should fetch planToday locally', (done) => {
    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(4, "planToday");
      done();
    });
  })

  it('should render all user status without blocks', (done) => {
    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      const renderData = wrapper.find('FlatList').at(0).props().data;
      expect(renderData.length).toBe(2);
      done();
    });
  })

  it('should render all user status with blocks', (done) => {
    AsyncStorage.getItem = jest.fn(async(key) => {
      if (key === 'isBlocked') {
        return true;
      } else {
        return null;
      }
    })

    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      const renderData = wrapper.find('FlatList').at(0).props().data;
      expect(renderData.length).toBe(3);
      done();
    });
  })

  it('should render prevWork Title', (done) => {
    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      const renderData = wrapper.find('FlatList').at(0).props().data;
      expect(renderData[0].title).toBe('What did I do?');
      done();
    });
  })

  it('should render prevWork content', (done) => {
    AsyncStorage.getItem = jest.fn(async(key) => {
      if (key === 'prevWork') {
        return 'prev work content';
      } else {
        return null;
      }
    })

    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      const renderData = wrapper.find('FlatList').at(0).props().data;
      expect(renderData[0].content).toBe('prev work content');
      done();
    });
  })

  it('should render block Title', (done) => {
    AsyncStorage.getItem = jest.fn(async(key) => {
      if (key === 'isBlocked') {
        return true;
      } else {
        return null;
      }
    })

    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      const renderData = wrapper.find('FlatList').at(0).props().data;
      expect(renderData[1].title).toBe('Any blocks?');
      done();
    });
  })

  it('should render block content', (done) => {
    AsyncStorage.getItem = jest.fn(async(key) => {
      if (key === 'isBlocked') {
        return true;
      } else if (key === 'block'){
        return 'block content';
      } else {
        return null;
      }
    })

    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      const renderData = wrapper.find('FlatList').at(0).props().data;
      expect(renderData[1].content).toBe('block content');
      done();
    });
  })

  it('should render planToday Title', (done) => {
    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      const renderData = wrapper.find('FlatList').at(0).props().data;
      expect(renderData[1].title).toBe("What's my plan for today?");
      done();
    });
  })

  it('should render planToday content', (done) => {
    AsyncStorage.getItem = jest.fn(async(key) => {
      if (key === 'planToday') {
        return 'planToday content'
      } else {
        return null;
      }
    })

    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      const renderData = wrapper.find('FlatList').at(0).props().data;
      expect(renderData[1].content).toBe('planToday content');
      done();
    });
  })

  it('should render title correctly in renderFunc', (done) => {
    wrapper = shallow(
      <CardScreen/>, {context}
    )

    setImmediate(() => {
      const item = {title: 'test title'}
      const RenderItem = wrapper.find('FlatList').at(0).props().renderItem;
      const SingleEntryCard = shallow(
        <RenderItem
          item={item}
        />
      );
      console.log(SingleEntryCard.props());
      expect(SingleEntryCard.props().title).toBe('test title');
      done();
    });
  })

})