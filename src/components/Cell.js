import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { isSameMonth } from "date-fns";

import { createStickerRecord } from "../Factories/createStickerRecord.js";
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

  const handleCellClick = (e) => {
    if (showAchievementModal || showFutureErrorModal) return;
    
    const targetedCell = e.target.closest("div");
    const stickerAlreadyExists = targetedCell.childNodes.length > 1;
    const onGoalDay = targetedCell.classList.contains("goalDay") ? true : false;
    const isFutureDay = targetedCell.classList.contains('future-cell');

    if (isFutureDay) {
      hideOrShowFutureErrorModal();
      return;
    }

    //remove existing stickers
    if (stickerAlreadyExists) {
      let newStickersArray = Array.from(props.stickers);
      newStickersArray.splice(
        newStickersArray.findIndex(
          (record) => record["uuid"] === targetedCell.dataset.uuid
        ),
        1
      );

      props.modifyStickers(newStickersArray);
    } else {
      //add new sticker
      let stickerRecordToAdd = createStickerRecord(
        props.selectedMonth.getFullYear(),
        props.selectedMonth.getMonth(),
        parseInt(targetedCell.firstChild.textContent),
        props.selectedSticker,
        props.selectedGoal,
        onGoalDay
      );

      let newStickersArray = Array.from(props.stickers);
      newStickersArray.push(stickerRecordToAdd);
      props.modifyStickers(newStickersArray);

      handlePossibleAchievement(newStickersArray);
    }
  };

  const handlePossibleAchievement = (stickersArray) => {
    let newAchievement = checkIfGoalAchievedOnThisClick(stickersArray);
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

  function checkIfGoalAchievedOnThisClick(stickersArray) {
    let totalStickersCurrentMonth = props.getCurrentGoalProgress(stickersArray).stickersCurrentMonth;
    let currentProgress = props.getCurrentGoalProgress(props.stickers);
    let totalGoalDaysCurrentMonth = currentProgress.totalGoalDaysCurrentMonth;

    const achievementCheckFuncs = [];
    achievementCheckFuncs.push(
      [
        fullMonthComplete,
        [totalStickersCurrentMonth, totalGoalDaysCurrentMonth],
      ],
      [fiveDaysCompleted, [totalStickersCurrentMonth]],
      [nonGoalDayCompleted, []]
    );

    const achievementCheckFuncReturns = achievementCheckFuncs.map((func) =>
      func[0](...func[1])
    );

    return achievementCheckFuncReturns.find(
      (returnValue) => typeof returnValue !== "undefined"
    );

    function nonGoalDayCompleted() {
      if (props.cellClass === "nonGoalDay") return "nonGoalDay";
    }
    function fiveDaysCompleted(totalStickersCurrentMonth) {
      if (totalStickersCurrentMonth === 5 && props.cellClass === "goalDay" ) return "5Days";
    }
    function fullMonthComplete(
      totalStickersCurrentMonth,
      totalGoalDaysCurrentMonth
    ) {
      if (totalStickersCurrentMonth === totalGoalDaysCurrentMonth && props.cellClass === "goalDay")
        return "fullMonth";
    }
  }

  return (
    <div
      style={{ backgroundColor: props.backgroundColor }}
      className={`column cell ${
        !isSameMonth(props.day, props.monthStart) ? "disabled" : ""
      } ${props.cellClass} ${futureClass}`}
      key={props.day}
      onClick={handleCellClick}
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
