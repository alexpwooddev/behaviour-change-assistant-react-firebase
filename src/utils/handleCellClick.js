import { createStickerRecord } from "../Factories/createStickerRecord.js";

export const handleCellClick = (e, showAchievementModal, showFutureErrorModal, hideOrShowFutureErrorModal, modifyStickers, handlePossibleAchievement, selectedMonth, selectedSticker, selectedGoal, stickers) => {
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
        selectedGoal,
        onGoalDay
      );

      let newStickersArray = Array.from(stickers);
      newStickersArray.push(stickerRecordToAdd);
      modifyStickers(newStickersArray);

      handlePossibleAchievement(newStickersArray);
    }
  };