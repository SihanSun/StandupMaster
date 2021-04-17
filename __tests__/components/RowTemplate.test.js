import React from 'react';
import { shallow } from 'enzyme';
import RowTemplate from '../../src/components/RowTemplate';

describe('RowTemplate', () => {
  it('should trigger onPress when pressed', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <RowTemplate
        onPress={onPress}
      />
    );

    wrapper.simulate('press');

    expect(onPress).toHaveBeenCalled();
  })

  it('should render image correctly', () => {
    const wrapper = shallow(
      <RowTemplate
        image={{uri: 'test uri'}}
      />
    );

    expect(wrapper.find('Image').at(0).props().source.uri).toBe('test uri');
  })

  it('should render title correctly', () => {
    const wrapper = shallow(
      <RowTemplate
        title={"test title"}
      />
    )

    expect(wrapper.find('Text').at(0).props().children).toBe('test title');
  })

  it('should render description correctly', () => {
    const wrapper = shallow(
      <RowTemplate
        description={"test description"}
      />
    )

    expect(wrapper.find('Text').at(1).props().children).toBe('test description');
  })


  it('should render secondary image correctly', () => {
    const wrapper = shallow(
      <RowTemplate
      secondaryImage={{uri: 'test uri 2'}}
      />
    )

    expect(wrapper.find('Image').at(1).props().source.uri).toBe('test uri 2');
  })

  it('should render meta info correctly', () => {
    const wrapper = shallow(
      <RowTemplate
      metaInfo={"test meta"}
      />
    )

    expect(wrapper.find('Text').at(2).props().children).toBe('test meta');
  })
});