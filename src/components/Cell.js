import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { isSameMonth, parseISO } from "date-fns";

import { checkIfGoalAchievedOnThisClick } from "../utils/checkIfGoalAchievedOnThisClick.js";
import { LanguageContext } from "../containers/Language";
import Sticker from "./Sticker";
import AchievementModal from "./AchievementModal";
import GeneralModal from "./GeneralModal";
import { createStickerRecord } from "../Factories/createStickerRecord.js";
import { setStickers } from '../features/stickers/stickersSlice';
import "./Cell.css";

const Cell = (props) => {
  const [achievement, setAchievement] = useState(undefined);
  const [achievementMessage, setAchievementMessage] = useState("");
  const [showAchievementModal, toggleAchievementModal] = useState(false);
  const [showFutureErrorModal, toggleFutureErrorModal] = useState(false);
  const { dictionary } = useContext(LanguageContext);

  const stickers = useSelector(state => state.stickers.stickers);
  const selectedSticker = useSelector(state => state.stickers.selectedSticker);
  const selectedMonth = parseISO(useSelector(state => state.stickers.selectedMonth));
  const dispatchRedux = useDispatch();

  const date = props.day.getDate();
  const isCurrentMonth = isSameMonth(props.day, props.monthStart);
  const futureClass = props.isFutureDayThisMonth ? "future-cell" : "";
  let stickerRecord;

  const modifyStickers = async (stickersArray) => {  
    const noGoalsExist = props.selectedGoal === '' ? true : false;
    if (noGoalsExist) {
      props.hideOrShowNoGoalsModal();
      return;
    }
    await dispatchRedux(setStickers(stickersArray));
  };

  function getStickerRecord(stickers) {
    stickers.forEach((record) => {
      if (
        record["year"] === selectedMonth.getFullYear() &&
        record["month"] === selectedMonth.getMonth() &&
        record["date"] === date &&
        isCurrentMonth &&
        record["goal"] === props.selectedGoal
      ) {
        stickerRecord = record;
      }
    });
  }
  getStickerRecord(stickers);

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
      let newStickersArray = Array.from(stickers);
      newStickersArray.splice(
        newStickersArray.findIndex(
          (record) => record["uuid"] === targetedCell.dataset.uuid
        ),
        1
      );

      modifyStickers(newStickersArray);
    } else {
      //add new sticker
      let stickerRecordToAdd = createStickerRecord(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        parseInt(targetedCell.firstChild.textContent),
        selectedSticker,
        props.selectedGoal,
        onGoalDay
      );

      let newStickersArray = Array.from(stickers);
      newStickersArray.push(stickerRecordToAdd);
      modifyStickers(newStickersArray);

      handlePossibleAchievement(newStickersArray, props.cellClass);
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
        handleCellClick(e)
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
  selectedGoal: PropTypes.string.isRequired,
  formattedDate: PropTypes.string.isRequired,
  cellClass: PropTypes.string,
  getCurrentGoalProgress: PropTypes.func.isRequired,
};

export default Cell;
