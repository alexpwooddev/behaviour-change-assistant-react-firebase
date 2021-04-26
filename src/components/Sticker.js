import React from "react";

const Sticker = (props) => {
  if(props.sticker) {
    return <img
    src={`stickers/${props.sticker}.png`}
    alt={`${props.sticker} icon`}
    data-icon={props.sticker}
  ></img>
  } else {
    return null;
  }

};

export default Sticker;