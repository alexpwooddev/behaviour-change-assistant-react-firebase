import React from "react";
import { Text } from '../containers/Language';
import LanguageSelector from './LanguageSelector';
import "./ProgressBar.css";

const ProgressBar = (props) => {
  const calculatePercentAchieved = () => {
    let currentProgress = props.getCurrentGoalProgress(props.stickers);
    let stickersCurrentMonth = currentProgress.stickersCurrentMonth;
    let totalGoalDaysCurrentMonth = currentProgress.totalGoalDaysCurrentMonth;
    let percentAchieved = props.selectedGoal
      ? parseFloat(stickersCurrentMonth / totalGoalDaysCurrentMonth)
      : 0;
    return percentAchieved;
  }

  return (
    <div className="progress-col">
      <LanguageSelector />
      <h2><Text tid="progressBarTitle"/></h2>
      <p className="progress-subtitle">&nbsp;(<Text tid="progressBarSubtitle"/>)</p>
      <div className="progress-wrapper">
        <div className="progress-bar" style={{height: `${calculatePercentAchieved() * 100}%`}}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
