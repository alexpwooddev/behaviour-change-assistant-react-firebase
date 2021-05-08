import React, { useEffect, useState } from "react";
import { addMonths, subMonths } from "date-fns";

import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import GeneralModal from "./components/GeneralModal";
import GoalsContainer from "./components/GoalsContainer";
import Header from "./components/Header";
import { LanguageProvider } from './containers/Language';
import LanguageSelector from './components/LanguageSelector';
import ProgressBar from "./components/ProgressBar";
import StorageWarning from "./components/StorageWarning";

import "./App.css";
import * as dataHelper from './dataHelper.js';


function App() {
  const [goals, setGoals] = useState(dataHelper.readGoalsFromLocal('goalsRecord'));
  const [stickers, setStickers] = useState(dataHelper.readStickersFromLocal('stickersAndDatesRecord'));
  const [showGoalDuplicateModal, toggleGoalDuplicateModal] = useState(false);
  const [showNoGoalsModal, toggleNoGoalsModal] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState("monkey");

  let initialGoalsState;
  if (goals.length > 0){
    initialGoalsState = goals[0][0];
  } else {
    initialGoalsState = ""
  }

  const [selectedGoal, setSelectedGoal] = useState(initialGoalsState);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  

  useEffect(() => {
    dataHelper.createToLocalStorage('goalsRecord', goals);
  }, [goals]);

  useEffect(() => {
    dataHelper.createToLocalStorage('stickersAndDatesRecord', stickers);
  }, [stickers]);

  const hideOrShowGoalDuplicateModal = () => {
    toggleGoalDuplicateModal(!showGoalDuplicateModal);
  };

  const hideOrShowNoGoalsModal = () => {
    toggleNoGoalsModal(!showNoGoalsModal);
  };

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
    const goalDuplicate = goals.filter(goalRecord => goalRecord[0] === goal[0]);
    if (goalDuplicate.length > 0) {
      hideOrShowGoalDuplicateModal();
      return;
    }
    
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

  const noGoalsExist = goals.length > 0 ? false : true;

  const modifyStickers = (stickersArray) => {  
    if (noGoalsExist) {
      hideOrShowNoGoalsModal();
      return;
    }
    
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

    let goalDays;
    if (goals.length > 0 && selectedGoal !== "") {
      goalDays = goals.filter(
        (recordArr) => recordArr[0] === selectedGoal
      )[0][1];
    } else {
      goalDays = [];
    }

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
    <LanguageProvider>
      <div className="App">
        <Header />
        <div className="main-wrapper">
          <LanguageSelector />
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
          {showGoalDuplicateModal && (
            <GeneralModal
              title="No copies allowed!"
              message="You can't create the same goal twice."
              hideOrShowModal={hideOrShowGoalDuplicateModal}
            />
          )}
          {showNoGoalsModal && (
            <GeneralModal 
              title="Start with a new goal"
              message="You need to create a goal before using the calendar and adding stickers."
              hideOrShowModal={hideOrShowNoGoalsModal}
            />
          )}
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;