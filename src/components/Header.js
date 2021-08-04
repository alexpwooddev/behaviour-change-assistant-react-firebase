import React from "react";

import { Text } from '../containers/Language';
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1><Text tid="appName"/></h1>
    </header>
  );
};

export default Header;
