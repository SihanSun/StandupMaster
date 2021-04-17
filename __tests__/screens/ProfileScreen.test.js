import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import ProfileScreen from '../../src/screens/ProfileScreen';

const flushPromises = () => new Promise(setImmediate);

const userInfo = {
  teamId: 123,
  email: 'test@example.com',
  profilePictureUrl: 'profile url'
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
      setUserLastName: PropTypes.any
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
})