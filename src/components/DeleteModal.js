import React from 'react';
import { Text } from '../containers/Language';
import "./DeleteModal.css";

const DeleteModal = (props) => {
    return (
      <div className="modal delete-modal">
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
            <Text tid="deleteModalConfirmation" />
          </button>
          <button
            id="modal-close-button"
            type="button"
            className="btn btn-secondary"
            onClick={props.hideOrShowDeleteModal}
          >
            <Text tid="cancelButton" />
          </button>
        </div>
      </div>
      </div>
   );
   
  
};

export default DeleteModal;