import React, { useContext } from "react";
import { format } from "date-fns";

import { LanguageContext } from '../containers/Language';
import './MonthHeader.css';


const MonthHeader = (props) => {
   const dateFormat = "MMMM yyyy";
   const { userLanguage } = useContext(LanguageContext);
   const enSpanMonthsMap = {
      January: "Enero",
      February: "Febrero",
      March: "Marzo",
      April: "Abril",
      May: "Mayo",
      June: "Junio",
      July: "Julio",
      August: "Agosto",
      September: "Septiembre",
      October: "Octubre",
      November: "Noviembre",
      December: "Diciembre"
   }

   const monthYear = format(props.selectedMonth, dateFormat);
   const monthYearArr = monthYear.split(' ');
   let monthYearDisplay;

   if (userLanguage === 'en'){
      monthYearDisplay = monthYear;
   } else {
      monthYearDisplay = `${enSpanMonthsMap[monthYearArr[0]]} ${monthYearArr[1]}`;
   }



   return (
      <div className="header row flex-middle">
         <div className="column">
            <div className="icon" id="icon-left" onClick={props.prevMonth}>
               chevron_left
            </div>
         </div>
         <div className="column">
            <span id="month-year">{monthYearDisplay}</span>
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