import React from 'react';
import { shallow } from 'enzyme';
import PropertyTemplate from '../../src/components/PropertyTemplate';

describe('PropertyTempalte', () => {
  it('should render property name correctly', () => {
    const wrapper = shallow(
      <PropertyTemplate
        name={"test name"}
        value={"test value"}
      />
    )

    expect(wrapper.find('Text').first().props().children).toBe("test name");
  })

  it('should call render value correctly', () => {
    const wrapper = shallow(
      <PropertyTemplate
        name={"test name"}
        value={"test value"}
      />
    )

    expect(wrapper.find('Text').at(1).props().children).toBe("test value");
  })

  it('should trigger onPress when pressed', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <PropertyTemplate
        name={"test name"}
        value={"test value"}
        onPress={onPress}
      />
    )

    wrapper.simulate("press");
    expect(onPress).toHaveBeenCalled();
  })
});