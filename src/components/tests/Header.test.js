import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe("Header", function() {
   let mountedHeader;
   beforeEach(() => {
      mountedHeader = shallow(<Header />);
   });

   it("renders without crashing", () => {
      mountedHeader = shallow(<Header />);
   });

   it("contains an image", () => {
      const img = mountedHeader.find('img');
      expect(img.length).toBe(1);
   });

   it("contains an h1", () => {
      const h1 = mountedHeader.find('h1');
      expect(h1.length).toBe(1);
   });




});