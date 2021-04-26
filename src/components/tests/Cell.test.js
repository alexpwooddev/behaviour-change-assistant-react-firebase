import React from "react";
import { shallow } from "enzyme";
import Cell from "../Cell";

describe("Cell", function() {
   let mountedCell;

   beforeEach(() => {
      mountedCell = shallow(<Cell />);
   });

   it("renders without crashing", () => {
      mountedCell = shallow(<Cell />);
   });

   it("has a class of disabled or a class of selected", () => {
      const cellClass = mountedCell.find(".disabled") ? mountedCell.find(".disabled") : mountedCell.find(".selected");
      expect(cellClass.length).toBe(1);
   });

});

describe("When a formatted date is passed to it", function() {
   let mountedCell;
   let props;

   beforeEach(() => {
      props = {
         formattedDate: 1
      };

      mountedCell = shallow(<Cell {...props} />);
   });


   it("renders a span with a number as a string", () => {
      const spanWithNumber = mountedCell.find('.number');
      const spanWithNumberContent = spanWithNumber.text();
      expect(typeof spanWithNumberContent).toBeString();
   });

   it("renders a span with a number as a string and the string is not empty", () => {
      const spanWithNumber = mountedCell.find('.number');
      const spanWithNumberContent = spanWithNumber.text();
      expect(spanWithNumberContent.length).toBeGreaterThan(0);
   });
});
