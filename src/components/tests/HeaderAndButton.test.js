import React from 'react';
import { shallow } from 'enzyme';
import HeaderAndButton from '../HeaderAndButton';

describe("HeaderAndButton", function() {
   let mountedHeaderAndButton;
   beforeEach(() => {
      mountedHeaderAndButton = shallow(<HeaderAndButton />);
   });

   it("renders without crashing", () => {
      mountedHeaderAndButton = shallow(<HeaderAndButton />);
   });

   it("renders a h2", () => {
      const h2 = mountedHeaderAndButton.find("h2");
      expect(h2.length).toBe(1);
    });

    it("renders a p", () => {
      const p = mountedHeaderAndButton.find("p");
      expect(p.length).toBe(1);
    });

    it("renders a button", () => {
      const button = mountedHeaderAndButton.find("button");
      expect(button.length).toBe(1);
    });
});