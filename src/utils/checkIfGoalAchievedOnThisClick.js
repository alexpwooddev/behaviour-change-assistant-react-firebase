export function checkIfGoalAchievedOnThisClick(
  getCurrentGoalProgress,
  stickersArray,
  cellClass
) {
  let totalStickersCurrentMonth =
    getCurrentGoalProgress(stickersArray).stickersCurrentMonth;
  let totalGoalDaysCurrentMonth =
    getCurrentGoalProgress(stickersArray).totalGoalDaysCurrentMonth;
  const achievementCheckFuncs = [];
  achievementCheckFuncs.push(
    [fullMonthComplete, [totalStickersCurrentMonth, totalGoalDaysCurrentMonth]],
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
    if (cellClass === "nonGoalDay") return "nonGoalDay";
  }
  function fiveDaysCompleted(totalStickersCurrentMonth) {
    if (totalStickersCurrentMonth === 5 && cellClass === "goalDay")
      return "5Days";
  }
  function fullMonthComplete(
    totalStickersCurrentMonth,
    totalGoalDaysCurrentMonth
  ) {
    if (
      totalStickersCurrentMonth === totalGoalDaysCurrentMonth &&
      cellClass === "goalDay"
    )
      return "fullMonth";
  }
}
