import React from "react";
import { format } from "date-fns";
import './MonthHeader.css';

const MonthHeader = (props) => {
   const dateFormat = "MMMM yyyy";

   return (
      <div className="header row flex-middle">
         <div className="column">
            <div className="icon" id="icon-left" onClick={props.prevMonth}>
               chevron_left
            </div>
         </div>
         <div className="column">
            <span id="month-year">{format(props.selectedMonth, dateFormat)}</span>
         </div>
         <div className="column">
            <div className="icon" id="icon-right" onClick={props.nextMonth}>
               chevron_right
            </div>
         </div>
      </div>
   );
};

export default MonthHeader;