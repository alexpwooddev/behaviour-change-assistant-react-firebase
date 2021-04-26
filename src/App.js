import React, { useEffect, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import Calendar from "./components/Calendar";
import GoalsContainer from "./components/GoalsContainer";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import Footer from "./components/Footer";
import StorageWarning from "./components/StorageWarning";
import "./App.css";
import * as dataHelper from './dataHelper.js';


function App() {
  const [goals, setGoals] = useState(dataHelper.readGoalsFromLocal('goalsRecord'));
  const [stickers, setStickers] = useState(dataHelper.readStickersFromLocal('stickersAndDatesRecord'));


  //[{year: 2021, month: 2, date: 4, sticker: "monkey", goal: "asd", isOnGoalDay: false}]


  console.log({goals});
  let initialGoalsState;
  if (goals.length > 0){
    initialGoalsState = goals[0][0];
  } else {
    initialGoalsState = ""
  }

  const [selectedSticker, setSelectedSticker] = useState("monkey");
  const [selectedGoal, setSelectedGoal] = useState(initialGoalsState);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    dataHelper.createToLocalStorage('goalsRecord', goals);
  }, [goals]);

  useEffect(() => {
    dataHelper.createToLocalStorage('stickersAndDatesRecord', stickers);
  }, [stickers]);

  const nextMonth = () => {
    setSelectedMonth(addMonths(selectedMonth, 1));
  };

  const prevMonth = () => {
    setSelectedMonth(subMonths(selectedMonth, 1));
  };

  const handleSelectedGoalChange = (goal) => {
    setSelectedGoal(goal);

    const lastStickerThisGoalAndMonth = stickers
      .filter((obj) => obj["month"] === selectedMonth.getMonth())
      .filter((obj) => obj["goal"] === goal)
      .pop();

    if (lastStickerThisGoalAndMonth) {
      setSelectedSticker(lastStickerThisGoalAndMonth["sticker"]);
    } else {
      setSelectedSticker("monkey");
    }
  };

  const addNewGoal = (goal) => {
    let newGoalsArray = Array.from(goals);
    newGoalsArray.push(goal);
    setGoals(newGoalsArray);
    setSelectedGoal(goal[0]);
  };

  const handleGoalDeletion = (newGoals, newStickers) => {
    setGoals(newGoals);
    setStickers(newStickers);

    let newSelectedGoal = newGoals.length === 0 ? "" : newGoals[0][0];
    setSelectedGoal(newSelectedGoal);
  };

  const handleSelectedStickerChange = (sticker) => {
    setSelectedSticker(sticker);
  };

  const modifyStickers = (stickersArray) => {
    setStickers(stickersArray);
  };

  const dayToIndexMapper = {
    sunday: "0",
    monday: "1",
    tuesday: "2",
    wednesday: "3",
    thursday: "4",
    friday: "5",
    saturday: "6",
  };

  function getCurrentGoalProgress(stickersArray) {
    if (goals.length === 0) {
      return {
        stickersCurrentMonth: 0,
        totalGoalDaysCurrentMonth: 0,
      };
    }

    console.log({goals});
    //[["dk",["monday"],"#4FE899"]]

    let goalDays;
    console.log(goals.length > 0);
    console.log({selectedGoal});
    if (goals.length > 0 && selectedGoal !== "") {
      goalDays = goals.filter(
        (recordArr) => recordArr[0] === selectedGoal
      )[0][1];
    } else {
      goalDays = [];
    }
    
    console.log({goalDays});

    const currentYear = selectedMonth.getFullYear();
    const currentMonth = selectedMonth.getMonth();
    const allGoalDayTypeCounts = [];
    goalDays.forEach((goalDay) => {
      allGoalDayTypeCounts.push(
        targetDaysInMonthYear(currentYear, currentMonth, goalDay)
      );
    });
    const totalGoalDays = allGoalDayTypeCounts.reduce(
      (acc, curr) => acc + curr,
      0
    );

    const stickersOnGoalDays = stickersArray
      .filter((obj) => obj["month"] === currentMonth)
      .filter((obj) => obj["goal"] === selectedGoal)
      .filter((obj) => obj["isOnGoalDay"] === true).length;

    return {
      stickersCurrentMonth: stickersOnGoalDays,
      totalGoalDaysCurrentMonth: totalGoalDays,
    };
  }

  function targetDaysInMonthYear(year, month, targetDay) {
    let day, counter, date;
    let targetDayIndex = parseInt(dayToIndexMapper[targetDay]);

    day = 1;
    counter = 0;
    date = new Date(year, month, day);
    while (date.getMonth() === month) {
      if (date.getDay() === targetDayIndex) {
        // Sun=0, Mon=1, Tue=2, etc.
        counter += 1;
      }
      day += 1;
      date = new Date(year, month, day);
    }
    return counter;
  }

  let currentProgress = getCurrentGoalProgress(stickers);
  let stickersCurrentMonth = currentProgress.stickersCurrentMonth;
  let totalGoalDaysCurrentMonth = currentProgress.totalGoalDaysCurrentMonth;

  let percentAchieved = selectedGoal
    ? parseFloat(stickersCurrentMonth / totalGoalDaysCurrentMonth)
    : 0;

  return (
    <div className="App">
      <Header />
      <div className="main-wrapper">
        <GoalsContainer
          goals={goals}
          addNewGoal={addNewGoal}
          stickers={stickers}
          selectedGoal={selectedGoal}
          handleSelectedGoalChange={handleSelectedGoalChange}
          selectedMonth={selectedMonth}
          handleSelectedStickerChange={handleSelectedStickerChange}
          selectedSticker={selectedSticker}
          handleGoalDeletion={handleGoalDeletion}
        />
        <Calendar
          goals={goals}
          stickers={stickers}
          selectedGoal={selectedGoal}
          selectedMonth={selectedMonth}
          selectedSticker={selectedSticker}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          modifyStickers={modifyStickers}
          currentProgress={currentProgress}
          getCurrentGoalProgress={getCurrentGoalProgress}
        />
        <ProgressBar percentAchieved={percentAchieved} />
        <StorageWarning />
        <Footer />
      </div>
    </div>
  );
}

export default App;