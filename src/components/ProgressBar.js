import React from "react";
import "./ProgressBar.css";

const ProgressBar = (props) => {

  return (
    <div className="progress-col">
      <h2>Selected Goal Progress</h2>
      <p className="progress-subtitle">&nbsp;(for this month's targeted days)</p>
      <div className="progress-wrapper">
        <div className="progress-bar" style={{height: `${props.percentAchieved * 100}%`}}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
