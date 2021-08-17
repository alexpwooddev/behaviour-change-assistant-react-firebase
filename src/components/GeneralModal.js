import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../containers/Language';
import "./GeneralModal.css";

const GeneralModal = (props) => {
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
            onClick={props.hideOrShowModal}
          >
            <Text tid="modalClose"/>
          </button>
        </div>
      </div>
      </div>
   );
};

GeneralModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  hideOrShowModal: PropTypes.func.isRequired,
}

export default GeneralModal;