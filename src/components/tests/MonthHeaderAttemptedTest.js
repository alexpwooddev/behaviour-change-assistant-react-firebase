import React from "react";
import { shallow } from "enzyme";
import { format } from "date-fns";
import MonthHeader from "../MonthHeader";

jest.mock("date-fns", () => ({ format: jest.fn() }));

describe("When a date is passed tp MonthHeader", function () {
  let mountedMonthHeader;
  let props;

  beforeEach(() => {
   props = {
      currentDate:
        "Thu Jan 07 2021 13:32:38 GMT+1000 (Australian Eastern Standard Time)",
    }; 
   
   mountedMonthHeader = shallow(<MonthHeader {...props} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a span that renders a month and year as a string", () => {
    format.mockReturnValueOnce("January 2021");
    const spanWithNumber = mountedMonthHeader.find("span");
    expect(spanWithNumber.text().length).toBeGreaterThan(1);
  });
});
