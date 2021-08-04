import React from 'react';

import { Text } from '../containers/Language';
import './Footer.css';

const Footer = () => {
   return (
      <footer>
        <p className="icon-attribution">
          <Text tid="iconAttributionP1" />&nbsp;
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
            >Freepik</a
          >
            &nbsp;<Text tid="iconAttributionP2"/>&nbsp;
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com</a
          >
        </p>      
      </footer>
   );
};

export default Footer;