import React from "react";
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
            currentProgress={props.currentProgress}
            getCurrentGoalProgress={props.getCurrentGoalProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
