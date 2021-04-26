import React from 'react';
import { shallow }  from 'enzyme';
import ProgressBar from '../ProgressBar';

describe("ProgressBar", function() {
   let mountedProgressBar;
   beforeEach(() => {
      mountedProgressBar = shallow(<ProgressBar />);
   });

   it("renders without crashing", () => {
      mountedProgressBar = shallow(<ProgressBar />);
   });

   it("contains a ProgressBar div", () => {
      const progressBar = mountedProgressBar.find(".progress-bar");
      expect(progressBar.length).toBe(1);
   });

});