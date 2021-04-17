import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as TeamsAPI from '../../src/api/teams';

import ProfileScreen from '../../src/screens/ProfileScreen';

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
  state: {
    userInfo, cognitoUser
  },
  setUserProfilePicture: jest.fn(),
  setUserDisplayName: jest.fn(),
  setUserFirstName: jest.fn(),
  setUserLastName: jest.fn(),
  setUserLastName: jest.fn(),
  signOut: jest.fn()
}

describe('ProfileScreen', () => {
  let wrapper;

  beforeEach(() => {
    ProfileScreen.contextTypes = {
      state: PropTypes.any,
      setUserProfilePicture: PropTypes.any,
      setUserDisplayName: PropTypes.any,
      setUserFirstName: PropTypes.any,
      setUserLastName: PropTypes.any,
      setUserLastName: PropTypes.any,
      signOut: PropTypes.any
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
      <ProfileScreen/>, {context}
    );

  })
  it('should fetch team in startup', () => {
    const image = wrapper.find({testID: 'picture'});
    expect(image.props().source.uri).toBe(userInfo.profilePictureUrl);
  });

  it('should ask permission when change photo', async () => {
    await wrapper.find({testID: "changePicture"}).props().onPress();
    expect(ImagePicker.requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
  })

  it('should launch image library', async () => {
    await wrapper.find({testID: "changePicture"}).props().onPress();
    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
  })

  it('should call setUserProfilePicture', async () => {
    await wrapper.find({testID: "changePicture"}).props().onPress();
    expect(context.setUserProfilePicture).toHaveBeenCalled();
  })

  it('should render all team properties', () => {
    const flatList = wrapper.find('FlatList').at(0);
    expect(flatList.props().data.length).toBe(4);
  })

  it('should render email property title', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[0].name).toBe('Email');
  })

  it('should render email property value', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[0].value).toBe(userInfo.email);
  })

  it('should render displayName property title', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[1].name).toBe('Display Name');
  })

  it('should render displayName property value', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[1].value).toBe(userInfo.displayName);
  })

  it('should render firstName property title', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[2].name).toBe('First Name');
  })

  it('should render firstName property value', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[2].value).toBe(userInfo.firstName);
  })

  it('should render lastName property title', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[3].name).toBe('Last Name');
  })

  it('should render lastName property value', () => {
    const flatList = wrapper.find('FlatList').at(0);
    const data = flatList.props().data;
    expect(data[3].value).toBe(userInfo.lastName);
  })

  it('should trigger setUserDisplayName correctly', () => {
    const instance = wrapper.instance();
    instance.changeUserDisplayName();
    expect(context.setUserDisplayName).toHaveBeenCalled();
  })

  it('should trigger setUserFirstName correctly', () => {
    const instance = wrapper.instance();
    instance.changeUserFirstName();
    expect(context.setUserFirstName).toHaveBeenCalled();
  })

  it('should trigger setUserLastName correctly', () => {
    const instance = wrapper.instance();
    instance.changeUserLastName();
    expect(context.setUserLastName).toHaveBeenCalled();
  })

  it('should trigger removeTeamMember when quit team', () => {
    TeamsAPI.removeTeamMember = jest.fn();
    wrapper.find({testID: "quitTeam"}).props().onPress();
    expect(TeamsAPI.removeTeamMember).toHaveBeenCalled();
  })

  it('should trigger signOut when signOut button is clicked', () => {
    TeamsAPI.removeTeamMember = jest.fn();
    wrapper.find({testID: "signOut"}).props().onPress();
    expect(context.signOut).toHaveBeenCalled();
  })
})