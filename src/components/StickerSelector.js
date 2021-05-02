import React from "react";

const StickerSelector = (props) => {
  const handleSelectChange = (e) => {
    props.handleSelectedStickerChange(e.target.value);
  };

  return (
    <div className="sticker-selector">
      <h3><label htmlFor="stickers">Choose a sticker to mark completed goals:</label></h3>
      <select
        name="stickers"
        id="stickers"
        value={props.selectedSticker}
        onChange={handleSelectChange}
      >
        <option value="monkey">Monkey</option>
        <option value="celebration">Celebration</option>
        <option value="unicorn">Unicorn</option>
        <option value="sun">Sun</option>
      </select>
    </div>
  );
};

export default StickerSelector;
