import { v4 as uuidv4 } from "uuid";

export const createStickerRecord = (currentYear, currentViewedMonthValue, targetCellSpanTextContent, selectedSticker, selectedGoal, onGoalDay) => {
      const year  = currentYear;
      const month = currentViewedMonthValue;
      const date = parseInt(targetCellSpanTextContent);
      const sticker = selectedSticker;
      const goal = selectedGoal;
      const isOnGoalDay = onGoalDay;
      const uuid = uuidv4();

      return { year, month, date, sticker, goal, isOnGoalDay, uuid };
}