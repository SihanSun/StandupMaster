import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as TeamsAPI from '../../src/api/teams';

import TeamProfileScreen from '../../src/screens/TeamProfileScreen';

const navigation = {
  getParam: jest.fn(() => {
    return {
      name: 'test name',
      value: 'test value'
    }
  }),
  goBack: jest.fn()
}

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

const teamInfo = {
  id: 123,
  name: 'name',
  announcement: 'announcement',
  profilePictureUrl: 'profile url',
  members: [{
    email: 'test1@example.com'
  }, {
    email: 'test2@example.com'
  }, {
    email: 'test3@example.com'
  }],
  pendingMembers: [{
    email: 'test4@example.com'
  }, {
    email: 'test5@example.com'
  }, {
    email: 'test6@example.com'
  }],
  owner: {
    email: 'test1@example.com'
  }
};

const context = {
  state: {
    userInfo, cognitoUser, teamInfo
  },
  setTeamProfilePicture: jest.fn(),
  setTeamName: jest.fn(),
  setTeamAnnouncement: jest.fn()
}

describe('TeamProfileScreen', () => {
  let wrapper;

  beforeEach(() => {
    TeamProfileScreen.contextTypes = {
      state: PropTypes.any,
      setTeamProfilePicture: PropTypes.any,
      setTeamName: PropTypes.any,
      setTeamAnnouncement: PropTypes.any
    }

    ImagePicker.requestMediaLibraryPermissionsAsync = jest.fn(async () => {
      return {
        status: 'granted'
      }
    });
    ImagePicker.launchImageLibraryAsync = jest.fn(async () => {
      return {
        cancelled: false
      }
    })
    ImageManipulator.manipulateAsync = jest.fn(async () => {
      return {
        base64: 'test base 64'
      }
    });

    wrapper = shallow(
      <TeamProfileScreen
	    navigation={navigation}
	  />, {context}
    );
	
  })
  it('should fetch team in startup', () => {
    const image = wrapper.find({testID: 'picture'});
    expect(image.props().source.uri).toBe(teamInfo.profilePictureUrl);
  });

  it('should ask permission when change photo', async () => {
    await wrapper.find({testID: "changePicture"}).props().onPress();
    expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
  })
  
  it('should launch image library', async () => {
    await wrapper.find({testID: "changePicture"}).props().onPress();
    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
  })

  it('should call setTeamProfilePicture', async () => {
    await wrapper.find({testID: "changePicture"}).props().onPress();
    expect(context.setTeamProfilePicture).toHaveBeenCalled();
  })
  
  it('should render all team properties', () => {
    const flatList = wrapper.find('FlatList').at(0);
    expect(flatList.props().data.length).toBe(6);
  })

  it('should render name property title', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[0].name).toBe('Team Name');
  })

  it('should render name property value', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[0].value).toBe(teamInfo.name);
  })

  it('should render ANNOUNCEMENT property title', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[1].name).toBe('Announcement');
  })

  it('should render ANNOUNCEMENT property value', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[1].value).toBe(teamInfo.announcement);
  })

  it('should render INVITE property title', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[2].name).toBe('Invite Member');
  })

  it('should render INVITE property value', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[2].value).toBe('Enter email here');
  })

  it('should render REMOVE property title', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[3].name).toBe('Remove Member');
  })

  it('should render REMOVE property value', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[3].value).toBe('Enter email here');
  })
  
  it('should render PENDING property title', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[4].name).toBe('Pending Members');
  })

  it('should render PENDING property value', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[4].value).toBe(teamInfo.pendingMembers.length);
  })

  it('should trigger setTeamName correctly', () => {
    const instance = wrapper.instance();
    instance.changeTeamName();
    expect(context.setTeamName).toHaveBeenCalled();
  })

  it('should trigger setTeamAnnouncement correctly', () => {
    const instance = wrapper.instance();
    instance.changeTeamAnnouncement();
    expect(context.setTeamAnnouncement).toHaveBeenCalled();
  })
  
  it('should trigger goBack when back button is pressed', () => {
    wrapper.find({testID: 'back'}).props().onPress();
    expect(navigation.goBack).toHaveBeenCalled();
  })
})