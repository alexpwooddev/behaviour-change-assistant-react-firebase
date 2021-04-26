import React from 'react';
import {shallow} from 'enzyme';
import Footer from '../Footer';

describe("Footer", function() {
   let mountedFooter;
   beforeEach(() => {
      mountedFooter = shallow(<Footer />);
   });

   it("renders wuthout crashing", () => {
      mountedFooter = shallow(<Footer />);
   });

   it("renders two anchor tags", () => {
      const aTags = mountedFooter.find("a");
      expect(aTags.length).toBe(2);
   });



});