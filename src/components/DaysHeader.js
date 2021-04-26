import React from "react";
import {
   format,
   startOfWeek,
   addDays,
 } from "date-fns";
import './DaysHeader.css';

const DaysHeader = (props) => {
   const dateFormat = "EEE";
   const days = [];
   let startDate = startOfWeek(props.selectedMonth, { weekStartsOn: 1 });

   for (let i = 0; i < 7; i++) {
     days.push(
       <div className="column days-of-week" key={i}>
         {format(addDays(startDate, i), dateFormat)}
       </div>
     );
   }
   return <div className="days row">{days}</div>;
 };

 export default DaysHeader