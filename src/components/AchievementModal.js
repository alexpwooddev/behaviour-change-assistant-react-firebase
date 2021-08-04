import React from "react";
import { Text } from '../containers/Language';

import "./AchievementModal.css";

const AchievementModal = (props) => {
  if(props.showAchievementModal) {
    return (
      <div className="modal achievement-modal">
        <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title"><Text tid="achievementTitle"/></h5>
        </div>
        <div className="modal-body">{props.message}</div>
        <div className="modal-footer">
          <button
            id="modal-close-button"
            type="button"
            className="btn btn-secondary"
            onClick={props.hideOrShowAchievementModal}
          >
            <Text tid="modalClose"/>
          </button>
        </div>
      </div>
      </div>
    );
  } else {
    return null;
  }

};

export default AchievementModal;
