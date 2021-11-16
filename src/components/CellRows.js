import React from "react";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { parseISO } from "date-fns";
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
  const selectedMonth = parseISO(useSelector(state => state.stickers.selectedMonth));

  const today = new Date();
  const monthStart = startOfMonth(selectedMonth); //e.g. 1 Oct
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
      let backgroundColor;
      let cellClass;

      if (props.atLeastOneGoalExists) {
        let selectedGoalTargetDays = props.selectedGoalRecord[0][1].map((record) =>
          record.slice(0, 3).toLowerCase()
        );
        let currentDayToRenderAbbreviated = day
          .toString()
          .split(" ")[0]
          .toLowerCase();

        if (selectedGoalTargetDays.includes(currentDayToRenderAbbreviated)) {
          backgroundColor = props.selectedGoalRecord[0][2];
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
          selectedGoal={props.selectedGoal}
          formattedDate={formattedDate}
          key={day}
          cellClass={cellClass}
          getCurrentGoalProgress={props.getCurrentGoalProgress}
          hideOrShowNoGoalsModal={props.hideOrShowNoGoalsModal}
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
  selectedGoal: PropTypes.string.isRequired,
  selectedGoalRecord: PropTypes.array.isRequired,
  getCurrentGoalProgress: PropTypes.func.isRequired,
  hideOrShowNoGoalsModal: PropTypes.func.isRequired,
}

export default CellRows;
