import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { isSameMonth } from "date-fns";

import { checkIfGoalAchievedOnThisClick } from "../utils/checkIfGoalAchievedOnThisClick.js";
import { handleCellClick } from "../utils/handleCellClick.js";
import { LanguageContext } from "../containers/Language";
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
  const futureClass = props.isFutureDayThisMonth ? "future-cell" : "";
  let stickerRecord;

  function getStickerRecord(stickers) {
    stickers.forEach((record) => {
      if (
        record["year"] === props.selectedMonth.getFullYear() &&
        record["month"] === props.selectedMonth.getMonth() &&
        record["date"] === date &&
        isCurrentMonth &&
        record["goal"] === props.selectedGoal
      ) {
        //aren't these state???? - and so shouldn't they be handled as such?
        //each cell needs to know if it has a sticker, and which one...
        stickerRecord = record;
      }
    });
  }
  getStickerRecord(props.stickers);

  const hideOrShowFutureErrorModal = (e = undefined) => {
    if (e) {
      e.stopPropagation();
    }
    toggleFutureErrorModal(!showFutureErrorModal);
  };

  const hideOrShowAchievementModal = (e = undefined) => {
    if (e) {
      e.stopPropagation();
    }
    toggleAchievementModal(!showAchievementModal);
  };

  const handlePossibleAchievement = (stickersArray, cellClass) => {
    let newAchievement = checkIfGoalAchievedOnThisClick(
      props.getCurrentGoalProgress,
      stickersArray,
      cellClass
    );
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
      onClick={(e) =>
        handleCellClick(
          e,
          showAchievementModal,
          showFutureErrorModal,
          hideOrShowFutureErrorModal,
          props.modifyStickers,
          handlePossibleAchievement,
          props.selectedMonth,
          props.selectedSticker,
          props.selectedGoal,
          props.stickers,
          props.cellClass
        )
      }
      data-uuid={stickerRecord ? stickerRecord.uuid : ""}
    >
      <span className="number">{props.formattedDate}</span>
      <Sticker sticker={stickerRecord ? stickerRecord["sticker"] : ""} />
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
  backgroundColor: PropTypes.string,
  day: PropTypes.instanceOf(Date).isRequired,
  monthStart: PropTypes.instanceOf(Date).isRequired,
  selectedMonth: PropTypes.instanceOf(Date).isRequired,
  selectedGoal: PropTypes.string.isRequired,
  selectedSticker: PropTypes.string.isRequired,
  formattedDate: PropTypes.string.isRequired,
  stickers: PropTypes.array.isRequired,
  cellClass: PropTypes.string,
  modifyStickers: PropTypes.func.isRequired,
  getCurrentGoalProgress: PropTypes.func.isRequired,
};

export default Cell;
