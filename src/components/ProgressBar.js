import React from "react";
import "./ProgressBar.css";

const ProgressBar = (props) => {

  return (
    <div className="progress-col">
      <h2>Progress</h2>
      <div className="progress-wrapper">
        <div className="progress-bar" style={{height: `${props.percentAchieved * 100}%`}}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
