import React from 'react';
import {shallow} from 'enzyme';
import StickerSelector from '../StickerSelector';

describe("StickerSelector", function() {
   let mountedStickerSelector;
   beforeEach(() => {
      mountedStickerSelector = shallow(<StickerSelector />);
   });

   it("renders without crashing", () => {
      mountedStickerSelector = shallow(<StickerSelector />);
   });

   it("renders 4 sticker options", () => {
      const stickers = mountedStickerSelector.find("option");
      expect(stickers.length).toBe(4);
   });

});