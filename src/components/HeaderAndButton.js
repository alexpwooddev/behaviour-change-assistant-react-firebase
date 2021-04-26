import React from 'react';

const HeaderAndButton = (props) => {
  return (
    <div>
      <span>
        <h2>Monthly Goals</h2>
      </span>
      <button type="button" className="btn-primary positive" id="toggle-goal-modal" onClick={props.hideOrShowGoalModal}>
        Add New Goal
      </button>
    </div>
  );
};

export default HeaderAndButton;
