import React from 'react';

const CheckedDaysModal = (props) => {
    return (
      <div className="modal">
        <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
        </div>
        <div className="modal-body">{props.message}</div>
        <div className="modal-footer">
          <button
            id="modal-close-button"
            type="button"
            className="btn btn-secondary"
            onClick={props.hideOrShowCheckedDaysModal}
          >
            Close
          </button>
        </div>
      </div>
      </div>
   );
   
  
};

export default CheckedDaysModal;