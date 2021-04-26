import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe("App", function() {
  let mountedApp;
  beforeEach(() => {
    mountedApp = shallow(<App />);
  });


  it("renders without crashing", () => {
    mountedApp = shallow(<App />);
  });

  it("renders a header", () => {
    const header = mountedApp.find('Header');
    expect(header.length).toBe(1);
  });

  it("renders a GoalsContainer", () => {
    const goalsContainer = mountedApp.find('GoalsContainer');
    expect(goalsContainer.length).toBe(1);
  });

  it("renders a Calendar", () => {
    const calendar = mountedApp.find('Calendar');
    expect(calendar.length).toBe(1);
  });

  it("renders a ProgressBar", () => {
    const progressBar = mountedApp.find('ProgressBar');
    expect(progressBar.length).toBe(1);
  });

});