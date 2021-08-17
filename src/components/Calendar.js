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
            selectedMonth={props.selectedMonth}
            onDateClick={props.onDateClick}
            selectedGoal={props.selectedGoal}
            selectedSticker={props.selectedSticker}
            goals={props.goals}
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
  goals: PropTypes.array.isRequired,
  stickers: PropTypes.array.isRequired,
  selectedGoal: PropTypes.string.isRequired,
  selectedMonth: PropTypes.instanceOf(Date).isRequired,
  selectedSticker: PropTypes.string.isRequired,
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  modifyStickers: PropTypes.func.isRequired,
  getCurrentGoalProgress: PropTypes.func.isRequired,
}

export default Calendar;
