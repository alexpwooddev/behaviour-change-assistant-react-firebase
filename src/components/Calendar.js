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
          <MonthHeader
            prevMonth={props.prevMonth}
            nextMonth={props.nextMonth}
            selectedMonth={props.selectedMonth}
          />
        </div>
        <div>
          <DaysHeader selectedMonth={props.selectedMonth} />
        </div>
        <div>
          <CellRows
            atLeastOneGoalExists={props.atLeastOneGoalExists}
            selectedMonth={props.selectedMonth}
            selectedGoal={props.selectedGoal}
            selectedGoalRecord={props.selectedGoalRecord}
            selectedSticker={props.selectedSticker}
            stickers={props.stickers}
            modifyStickers={props.modifyStickers}
            getCurrentGoalProgress={props.getCurrentGoalProgress}
          />
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  stickers: PropTypes.array.isRequired,
  selectedGoal: PropTypes.string.isRequired,
  selectedGoalRecord: PropTypes.array.isRequired,
  selectedMonth: PropTypes.instanceOf(Date).isRequired,
  selectedSticker: PropTypes.string.isRequired,
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  modifyStickers: PropTypes.func.isRequired,
  getCurrentGoalProgress: PropTypes.func.isRequired,
}

export default Calendar;
