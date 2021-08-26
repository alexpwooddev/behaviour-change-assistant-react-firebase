import React, { useContext } from "react";
import PropTypes from 'prop-types';

import { LanguageContext } from '../containers/Language';
import './DaysHeader.css';

const DaysHeader = (props) => {
   const { userLanguage } = useContext(LanguageContext);
   const enDaysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
   const spanDaysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];
 
   let daysToDisplay = userLanguage === 'en' ? enDaysOfWeek : spanDaysOfWeek;
 
   const days = [];
   for (let i = 0; i < 7; i++) {
    days.push(
       <div className="column days-of-week" key={i}>
         {daysToDisplay[i]}
       </div>
     );
   }
   return <div className="days row">{days}</div>;
 };

 DaysHeader.propTypes = {
   selectedMonth: PropTypes.instanceOf(Date).isRequired,
 }

 export default DaysHeader