import React from 'react';
import { shallow } from 'enzyme';
import SingleEntryCard from '../../src/components/SingleEntryCard';

describe('RowTemplate', () => {
  it('should trigger onPress when pressed', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <SingleEntryCard
        onPress={onPress}
      />
    );

    wrapper.simulate('press');

    expect(onPress).toHaveBeenCalled();
  })

  it('should render title correctly', () => {
    const wrapper = shallow(
      <SingleEntryCard
        title={"test title"}
      />
    )

    expect(wrapper.find('Text').at(0).props().children).toBe('test title');
  })

  it('should render content correctly', () => {
    const wrapper = shallow(
      <SingleEntryCard
        content={"test content"}
      />
    )

    expect(wrapper.find('Text').at(1).props().children).toBe('test content');
  })
});