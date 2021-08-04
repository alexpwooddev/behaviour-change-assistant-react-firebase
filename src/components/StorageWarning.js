import React from 'react';
import { Text } from '../containers/Language';
import "./StorageWarning.css";


const StorageWarning = () => {
   return (
      <p className="storage-warning">
          <span className="bold"><Text tid="storageWarningP1"/>:&nbsp;</span><Text tid="storageWarningP2" /> 
      </p>
   );
};

export default StorageWarning;

