import React from 'react';
import "./StorageWarning.css";


const StorageWarning = () => {
   return (
      <p className="storage-warning">
          <span className="bold">WARNING:</span> your goals &amp; stickers are stored in your browser history. If you clear your history, you'll lose them!!!
      </p>
   );
};

export default StorageWarning;

