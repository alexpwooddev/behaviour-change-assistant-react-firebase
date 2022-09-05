import React from "react";
import PropTypes from 'prop-types';

import "./Calendar.css";
import MonthHeader from "./MonthHeader";
import DaysHeader from "./DaysHeader";
import CellRows from "./CellRows";


const Calendar = (props) => {
  return (
    <div className="calendar-col">
      <div className="calendar">
        <div>
          {" "}
          <MonthHeader />
        </div>
        <div>
          <DaysHeader />
        </div>
        <div>
          <CellRows
            atLeastOneGoalExists={props.atLeastOneGoalExists}
            selectedGoal={props.selectedGoal}
            selectedGoalRecord={props.selectedGoalRecord}
            getCurrentGoalProgress={props.getCurrentGoalProgress}
            hideOrShowNoGoalsModal={props.hideOrShowNoGoalsModal}
          />
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  selectedGoal: PropTypes.string.isRequired,
  selectedGoalRecord: PropTypes.array.isRequired,
  getCurrentGoalProgress: PropTypes.func.isRequired,
  hideOrShowNoGoalsModal: PropTypes.func.isRequired,
}

export default Calendar;
