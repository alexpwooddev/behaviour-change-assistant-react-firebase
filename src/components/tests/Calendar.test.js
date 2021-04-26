import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../Calendar';

describe("Calendar", function() {
   let mountedCalendar;
   beforeEach(() => {
      mountedCalendar = shallow(<Calendar />);
   });

   it("renders without crashing", () => {
      mountedCalendar = shallow(<Calendar />);
   });

   it("renders a MonthHeader", () => {
      const monthHeader = mountedCalendar.find("MonthHeader");
      expect(monthHeader.length).toBe(1);
   });

   it("renders a DaysHeader", () => {
      const daysHeader = mountedCalendar.find("DaysHeader");
      expect(daysHeader.length).toBe(1);
   });

   it("renders a CellRows component", () => {
      const cellRows = mountedCalendar.find("CellRows");
      expect(cellRows.length).toBe(1);
   });



});