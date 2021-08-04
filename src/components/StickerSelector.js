import React, { useContext } from "react";
import { Text, LanguageContext } from '../containers/Language';

const StickerSelector = (props) => {
  const { dictionary } = useContext(LanguageContext);
  const handleSelectChange = (e) => {
    props.handleSelectedStickerChange(e.target.value);
  };

  return (
    <div className="sticker-selector">
      <h3><label htmlFor="stickers"><Text tid="stickerInstruction"/>:</label></h3>
      <select
        name="stickers"
        id="stickers"
        value={props.selectedSticker}
        onChange={handleSelectChange}
      >
        <option value="monkey">{dictionary.sticker1}</option>
        <option value="celebration">{dictionary.sticker2}</option>
        <option value="unicorn">{dictionary.sticker3}</option>
        <option value="sun">{dictionary.sticker4}</option>
      </select>
    </div>
  );
};

export default StickerSelector;
