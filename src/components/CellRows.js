import React from "react";
import PropTypes from 'prop-types';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";

import "./CellRows.css";
import Cell from "./Cell";

const CellRows = (props) => {
  const today = new Date();
  const monthStart = startOfMonth(props.selectedMonth); //e.g. 1 Oct
  const monthEnd = endOfMonth(monthStart); // e.g. 31 Oct
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); //e.g. Mon 28 Sep
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 }); //e.g. Sun 1 Nov
  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      let selectedGoalRecord;
      let backgroundColor;
      let cellClass;
      let atLeastOneGoalExists = props.goals.length > 0;

      if (atLeastOneGoalExists) {
        selectedGoalRecord = props.goals.filter(
          (goal) => goal[0].toLowerCase() === props.selectedGoal.toLowerCase()
        );

        let selectedGoalTargetDays = selectedGoalRecord[0][1].map((record) =>
          record.slice(0, 3).toLowerCase()
        );
        let currentDayToRenderAbbreviated = day
          .toString()
          .split(" ")[0]
          .toLowerCase();

        if (selectedGoalTargetDays.includes(currentDayToRenderAbbreviated)) {
          backgroundColor = selectedGoalRecord[0][2];
          cellClass = "goalDay";
        } else {
          backgroundColor = "white";
          cellClass = "nonGoalDay";
        }
      }

      const isFutureDayThisMonth = day > today;

      days.push(
        <Cell
          isFutureDayThisMonth={isFutureDayThisMonth}
          backgroundColor={backgroundColor}
          day={day}
          monthStart={monthStart}
          selectedMonth={props.selectedMonth}
          selectedGoal={props.selectedGoal}
          selectedSticker={props.selectedSticker}
          formattedDate={formattedDate}
          key={day}
          stickers={props.stickers}
          cellClass={cellClass}
          modifyStickers={props.modifyStickers}
          getCurrentGoalProgress={props.getCurrentGoalProgress}
        />
      );
      day = addDays(day, 1);
    }

    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <>
      <div className="body">{rows}</div>
    </>
  );
};

CellRows.propTypes = {
  selectedMonth: PropTypes.instanceOf(Date).isRequired,
  selectedSticker: PropTypes.string.isRequired,
  goals: PropTypes.array.isRequired,
  stickers: PropTypes.array.isRequired,
  selectedGoal: PropTypes.string.isRequired,
  modifyStickers: PropTypes.func.isRequired,
  getCurrentGoalProgress: PropTypes.func.isRequired,
}

export default CellRows;
