import React from "react";

import { Text } from '../containers/Language';
import './Header.css';

const Header = () => {
  return (
    <header>
      {/* <img
        src="mindspace-logo-darkBackground.jpeg"
        alt="company logo"
        id="header-image-left"
      /> */}
      <h1><Text tid="appName"/></h1>
    </header>
  );
};

export default Header;
