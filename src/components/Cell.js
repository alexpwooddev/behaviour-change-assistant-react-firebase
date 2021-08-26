import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { isSameMonth } from "date-fns";

import { checkIfGoalAchievedOnThisClick } from "../utils/checkIfGoalAchievedOnThisClick.js";
import { handleCellClick } from "../utils/handleCellClick.js";
import { LanguageContext } from '../containers/Language';
import Sticker from "./Sticker";
import AchievementModal from "./AchievementModal";
import GeneralModal from "./GeneralModal";
import "./Cell.css";

const Cell = (props) => {
  const [achievement, setAchievement] = useState(undefined);
  const [achievementMessage, setAchievementMessage] = useState("");
  const [showAchievementModal, toggleAchievementModal] = useState(false);
  const [showFutureErrorModal, toggleFutureErrorModal] = useState(false);
  const { dictionary } = useContext(LanguageContext);
  
  const date = props.day.getDate();
  const isCurrentMonth = isSameMonth(props.day, props.monthStart);
  const futureClass = props.isFutureDayThisMonth ? 'future-cell' : '';
  let stickerRecord;
  let sticker;

  const hideOrShowFutureErrorModal = (e = undefined) => {
    if (e) {
      e.stopPropagation();
    }
    toggleFutureErrorModal(!showFutureErrorModal);
  }

  const hideOrShowAchievementModal = (e = undefined) => {
    if (e) {
      e.stopPropagation();
    }
    toggleAchievementModal(!showAchievementModal);
  };

  props.stickers.forEach((record) => {
    if (
      record["year"] === props.selectedMonth.getFullYear() &&
      record["month"] === props.selectedMonth.getMonth() &&
      record["date"] === date &&
      isCurrentMonth &&
      record["goal"] === props.selectedGoal
    ) {
      stickerRecord = record;
      sticker = record["sticker"];
    }
  });

  const handlePossibleAchievement = (stickersArray) => {
    let totalStickersCurrentMonth = props.getCurrentGoalProgress(stickersArray).stickersCurrentMonth;
    let totalGoalDaysCurrentMonth = props.getCurrentGoalProgress(props.stickers).totalGoalDaysCurrentMonth;
    let newAchievement = checkIfGoalAchievedOnThisClick(stickersArray, totalStickersCurrentMonth, totalGoalDaysCurrentMonth, props.cellClass);
    setAchievement(newAchievement);

    let achievementMessages = {
      fiveDayMessage: dictionary.fiveDayMessage,
      fullMonthMessage: dictionary.fullMonthMessage,
      nonGoalDayMessage: dictionary.nonGoalDayMessage,
    };

    if (newAchievement === "5Days") {
      setAchievementMessage(achievementMessages["fiveDayMessage"]);
      hideOrShowAchievementModal();
    } else if (newAchievement === "fullMonth") {
      setAchievementMessage(achievementMessages["fullMonthMessage"]);
      hideOrShowAchievementModal();
    } else if (newAchievement === "nonGoalDay") {
      setAchievementMessage(achievementMessages["nonGoalDayMessage"]);
      hideOrShowAchievementModal();
    }
  };


  return (
    <div
      style={{ backgroundColor: props.backgroundColor }}
      className={`column cell ${
        !isSameMonth(props.day, props.monthStart) ? "disabled" : ""
      } ${props.cellClass} ${futureClass}`}
      key={props.day}
      onClick={(e) => handleCellClick(e, showAchievementModal, showFutureErrorModal, hideOrShowFutureErrorModal, props.modifyStickers, handlePossibleAchievement, props.selectedMonth, props.selectedSticker, props.selectedGoal, props.stickers)}
      data-uuid={stickerRecord ? stickerRecord.uuid : ""}
    >
      <span className="number">{props.formattedDate}</span>
      <Sticker sticker={sticker} />
      {achievement !== undefined && (
        <AchievementModal
          message={achievementMessage}
          achievement={achievement}
          showAchievementModal={showAchievementModal}
          hideOrShowAchievementModal={hideOrShowAchievementModal}
        />
      )}
      {showFutureErrorModal && (
        <GeneralModal 
          title={dictionary.futureErrorTitle}
          message={dictionary.futureErrorMessage}
          hideOrShowModal={hideOrShowFutureErrorModal}      
        />
      )}
    </div>
  );
};

Cell.propTypes = {
  isFutureDayThisMonth: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  day: PropTypes.instanceOf(Date).isRequired,
  monthStart: PropTypes.instanceOf(Date).isRequired,
  selectedMonth: PropTypes.instanceOf(Date).isRequired,
  selectedGoal: PropTypes.string.isRequired,
  selectedSticker: PropTypes.string.isRequired,
  formattedDate: PropTypes.string.isRequired,
  stickers: PropTypes.array.isRequired,
  cellClass: PropTypes.string.isRequired,
  modifyStickers: PropTypes.func.isRequired,
  getCurrentGoalProgress: PropTypes.func.isRequired,
}

export default Cell;
