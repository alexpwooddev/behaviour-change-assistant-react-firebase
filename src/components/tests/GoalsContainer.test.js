import React from 'react';
import { shallow } from 'enzyme';
import GoalsContainer from '../GoalsContainer';

describe("GoalsContainer", function() {
   let mountedGoalsContainer;
   beforeEach(() => {
      mountedGoalsContainer = shallow(<GoalsContainer />)
   });

   it("renders without crashing", () => {
      mountedGoalsContainer = shallow(<GoalsContainer />);
   });

   it("renders a HeaderAndButton", () => {
      const headerAndButton = mountedGoalsContainer.find('HeaderAndButton');
      expect(headerAndButton.length).toBe(1);
   });

   it("renders a GoalCard", () => {
      const goalCard = mountedGoalsContainer.find('GoalCard');
      expect(goalCard.length).toBe(1);
   });

});