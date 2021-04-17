import React from 'react';
import { shallow } from 'enzyme';
import Summaries from '../../src/components/Summaries';

const summaries = [{
  isBlocked: false, 
  prevWork: 'prevWork', 
  block: 'block', 
  planToday: 'planToday', 
  name: 'name', 
  pictureUrl: 'pictureUrl'
}];

describe('PropertyTempalte', () => {
  it('should trigger onRequestClose when pressed', () => {
    const onRequestClose = jest.fn();
    const wrapper = shallow(
      <Summaries
        onRequestClose={onRequestClose}
      />
    )

    wrapper.find({testID: 'requestClose'}).simulate("press");
    expect(onRequestClose).toHaveBeenCalled();
  })

  it('should render correct number of summaries', () => {
    const wrapper = shallow(
      <Summaries
        summaries={summaries}
      />
    );
    
    const flatList = wrapper.find('FlatList').at(0);
    expect(flatList.props().data.length).toBe(1);
  })

  it('should pass correct isBlocked to summary card', () => {
    const wrapper = shallow(
      <Summaries
        summaries={summaries}
      />
    );
    
    const flatList = wrapper.find('FlatList').at(0);
    const renderItem = flatList.props().renderItem;

    const summaryCard = shallow(
      <renderItem
        item={summaries[0]}
      />
    );

    expect(summaryCard.props().item.isBlocked).toBe(summaries[0].isBlocked);
  })

  it('should pass correct prevWork to summary card', () => {
    const wrapper = shallow(
      <Summaries
        summaries={summaries}
      />
    );
    
    const flatList = wrapper.find('FlatList').at(0);
    const renderItem = flatList.props().renderItem;

    const summaryCard = shallow(
      <renderItem
        item={summaries[0]}
      />
    );

    expect(summaryCard.props().item.prevWork).toBe(summaries[0].prevWork);
  })

  it('should pass correct block to summary card', () => {
    const wrapper = shallow(
      <Summaries
        summaries={summaries}
      />
    );
    
    const flatList = wrapper.find('FlatList').at(0);
    const renderItem = flatList.props().renderItem;

    const summaryCard = shallow(
      <renderItem
        item={summaries[0]}
      />
    );

    expect(summaryCard.props().item.block).toBe(summaries[0].block);
  })

  it('should pass correct planToday to summary card', () => {
    const wrapper = shallow(
      <Summaries
        summaries={summaries}
      />
    );
    
    const flatList = wrapper.find('FlatList').at(0);
    const renderItem = flatList.props().renderItem;

    const summaryCard = shallow(
      <renderItem
        item={summaries[0]}
      />
    );

    expect(summaryCard.props().item.planToday).toBe(summaries[0].planToday);
  })

  it('should pass correct name to summary card', () => {
    const wrapper = shallow(
      <Summaries
        summaries={summaries}
      />
    );
    
    const flatList = wrapper.find('FlatList').at(0);
    const renderItem = flatList.props().renderItem;

    const summaryCard = shallow(
      <renderItem
        item={summaries[0]}
      />
    );

    expect(summaryCard.props().item.name).toBe(summaries[0].name);
  })

  it('should pass correct pictureUrl to summary card', () => {
    const wrapper = shallow(
      <Summaries
        summaries={summaries}
      />
    );
    
    const flatList = wrapper.find('FlatList').at(0);
    const renderItem = flatList.props().renderItem;

    const summaryCard = shallow(
      <renderItem
        item={summaries[0]}
      />
    );

    expect(summaryCard.props().item.pictureUrl).toBe(summaries[0].pictureUrl);
  })
});