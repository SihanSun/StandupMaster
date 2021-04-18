import React from 'react';
import { shallow } from 'enzyme';
import SummaryCard from '../../src/components/SummaryCard';

const summary = {
  isBlocked: false, 
  prevWork: 'prevWork', 
  block: 'block', 
  planToday: 'planToday', 
  name: 'name', 
  pictureUrl: 'pictureUrl'
};

describe('SummaryCard', () => {
  it('should render prevWork title', () => {
    const wrapper = shallow(
      <SummaryCard
        prevWork={summary.prevWork}
      />
    );
    
    const prevWorkTitle = wrapper.find({testID: 'prevWork'}).at(0).find('Text').at(0);
    expect(prevWorkTitle.props().children).toBe('Finished Work');
  });

  it('should render prevWork content', () => {
    const wrapper = shallow(
      <SummaryCard
        prevWork={summary.prevWork}
      />
    );
    
    const prevWorkContent = wrapper.find({testID: 'prevWork'}).at(0).find('Text').at(1);
    expect(prevWorkContent.props().children).toBe(summary.prevWork);
  });

  it('should render blocks title', () => {
    const wrapper = shallow(
      <SummaryCard
        block={summary.block}
      />
    );
    
    const blockTitle = wrapper.find({testID: 'blocks'}).at(0).find('Text').at(0);
    expect(blockTitle.props().children).toBe('Blocks');
  });

  it('should render blocks content', () => {
    const wrapper = shallow(
      <SummaryCard
        block={summary.block}
      />
    );
    
    const blockContent = wrapper.find({testID: 'blocks'}).at(0).find('Text').at(1);
    expect(blockContent.props().children).toBe(summary.block);
  });

  it('should render planToday title', () => {
    const wrapper = shallow(
      <SummaryCard
        planToday={summary.planToday}
      />
    );
    
    const planTodayTitle = wrapper.find({testID: 'planToday'}).at(0).find('Text').at(0);
    expect(planTodayTitle.props().children).toBe('Plans Today');
  });

  it('should render planToday content', () => {
    const wrapper = shallow(
      <SummaryCard
        planToday={summary.planToday}
      />
    );
    
    const planTodayContent = wrapper.find({testID: 'planToday'}).at(0).find('Text').at(1);
    expect(planTodayContent.props().children).toBe(summary.planToday);
  });

  it('should render name', () => {
    const wrapper = shallow(
      <SummaryCard
        name={summary.name}
      />
    );
    
    const planTodayContent = wrapper.find({testID: 'name'}).at(0).find('Text').at(0);
    expect(planTodayContent.props().children).toBe(summary.name);
  });
});