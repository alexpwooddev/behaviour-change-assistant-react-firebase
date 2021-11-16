import React, { useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from "date-fns";

import { LanguageContext } from '../containers/Language';
import { setSelectedMonth } from "../features/stickers/stickersSlice";
import './MonthHeader.css';


const MonthHeader = (props) => {
   const { userLanguage } = useContext(LanguageContext);

   const selectedMonth = parseISO(useSelector(state => state.stickers.selectedMonth));

   const dispatch = useDispatch();

   const handleMonthChange = (changeDirection) => {
      dispatch(setSelectedMonth(changeDirection));
   }

   const dateFormat = "MMMM yyyy";
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

   const monthYear = format(selectedMonth, dateFormat);
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
            <div className="icon" id="icon-left" onClick={() => handleMonthChange("subtract")}>
               chevron_left
            </div>
         </div>
         <div className="column">
            <span id="month-year">{monthYearDisplay}</span>
         </div>
         <div className="column">
            <div className="icon" id="icon-right" onClick={() => handleMonthChange("add")}>
               chevron_right
            </div>
         </div>
      </div>
   );
};

export default MonthHeader;