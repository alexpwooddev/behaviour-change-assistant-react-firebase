import React from "react";
import { Text } from '../containers/Language';
import LanguageSelector from './LanguageSelector';
import "./ProgressBar.css";

const ProgressBar = (props) => {

  return (
    <div className="progress-col">
      <LanguageSelector />
      <h2><Text tid="progressBarTitle"/></h2>
      <p className="progress-subtitle">&nbsp;(<Text tid="progressBarSubtitle"/>)</p>
      <div className="progress-wrapper">
        <div className="progress-bar" style={{height: `${props.percentAchieved * 100}%`}}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
