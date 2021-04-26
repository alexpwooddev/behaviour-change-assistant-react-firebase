import React from 'react';
import "./DeleteModal.css";

const DeleteModal = (props) => {
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
            onClick={props.deleteGoal}
          >
            Yes, delete!
          </button>
          <button
            id="modal-close-button"
            type="button"
            className="btn btn-secondary"
            onClick={props.hideOrShowDeleteModal}
          >
            Cancel
          </button>
        </div>
      </div>
      </div>
   );
   
  
};

export default DeleteModal;