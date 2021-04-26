import React from 'react';
import { shallow } from 'enzyme';
import GoalCard from '../GoalCard';

describe("GoalCard", function() {
   let mountedGoalCard;
   beforeEach(() => {
      mountedGoalCard = shallow(<GoalCard />);
   });

   it("renders without crashing", () => {
      mountedGoalCard = shallow(<GoalCard />);
   });

   it("renders a span", () => {
      const span = mountedGoalCard.find('span');
      expect(span.length).toBe(1);
   });

   it("renders a button", () => {
      const button = mountedGoalCard.find('button');
      expect(button.length).toBe(1);
   });

});