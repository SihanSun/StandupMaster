import React from 'react';
import { shallow } from 'enzyme';

import EditPropertyScreen from '../../src/screens/EditPropertyScreen';

const navigation = {
  getParam: jest.fn(() => {
    return {
      name: 'test name',
      value: 'test value'
    }
  }),
  goBack: jest.fn()
}

describe('EditPropertyScreen', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <EditPropertyScreen
        navigation={navigation}
      />
    )
  })

  it('should render title', () => {
    const title = wrapper.find({testID: 'title'});
    expect(title.props().children[1]).toBe('test name')
  })

  it('should render save button', () => {
    const title = wrapper.find({testID: 'save'});
    expect(wrapper.find({testID: 'save'}).exists()).toBe(true)
  })

  it('should trigger save func', () => {
    const onSave = jest.fn();

    const navi = {
      getParam: jest.fn(() => {
        return onSave;
      }),
      goBack: jest.fn()
    }
    wrapper = shallow(
      <EditPropertyScreen
        navigation={navi}
      />
    )

    wrapper.find({testID: 'save'}).props().onPress();
    expect(onSave).toHaveBeenCalled();
  })

  it('should trigger goBack func when save is triggered', () => {
    const onSave = jest.fn();

    const navi = {
      getParam: jest.fn(() => {
        return onSave;
      }),
      goBack: jest.fn()
    }
    wrapper = shallow(
      <EditPropertyScreen
        navigation={navi}
      />
    )

    wrapper.find({testID: 'save'}).props().onPress();
    expect(navi.goBack).toHaveBeenCalled();
  })

  it('should render back button', () => {
    expect(wrapper.find({testID: 'back'}).exists()).toBe(true);
  })

  it('should trigger goBack when back button is pressed', () => {
    wrapper.find({testID: 'back'}).props().onPress();
    expect(navigation.goBack).toHaveBeenCalled();
  })

  it('should render text input', () => {
    expect(wrapper.find({testID: 'input'}).exists()).toBe(true);
  })
})