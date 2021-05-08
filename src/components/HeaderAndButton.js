import React from 'react';
import { Text } from '../containers/Language';

const HeaderAndButton = (props) => {
  return (
    <div>
      <span>
        <h2><Text tid="goalsContainerHeader"/></h2>
      </span>
      <button type="button" className="btn-primary positive" id="toggle-goal-modal" onClick={props.hideOrShowGoalModal}>
        <Text tid="addGoalButton"/>
      </button>
    </div>
  );
};

export default HeaderAndButton;
