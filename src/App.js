import React, { useEffect, useState, useContext, useReducer } from "react";
import { addMonths, subMonths } from "date-fns";

import Calendar from "./components/Calendar";
import { dayToIndexMapper } from "./utils/dayToIndexMapper";
import Footer from "./components/Footer";
import GeneralModal from "./components/GeneralModal";
import GoalsContainer from "./components/GoalsContainer";
import Header from "./components/Header";
import { LanguageContext } from './containers/Language';
import ProgressBar from "./components/ProgressBar";
import StorageWarning from "./components/StorageWarning";

import "./App.css";
import * as dataHelper from './dataHelper.js';

const defaultState = {
  goals: dataHelper.readGoalsFromLocal('goalsRecord'),
  stickers: dataHelper.readStickersFromLocal('stickersAndDatesRecord'),
  selectedSticker: "monkey",
  selectedMonth: new Date(),
  showGoalDuplicateModal: false,
  showNoGoalsModal: false,
}

const reducer = (state, action) => {
  if (action.type ==="ADD_GOAL") {
    const newGoals = [...state.goals, action.payload];
    return {
      ...state,
      goals: newGoals,
    }
  }
  if (action.type === "SET_GOALS") {
    return {
      ...state,
      goals: action.payload,
    }
  }
  if (action.type === "SET_STICKERS") {
    return {
      ...state,
      stickers: action.payload,
    }
  }
  if (action.type === "SET_SELECTED_STICKER") {
    return {
      ...state,
      selectedSticker: action.payload,
    }
  }
  if (action.type === "SET_SELECTED_MONTH") {
    let newSelectedMonth;
    if (action.payload === "add") {
      newSelectedMonth = addMonths(state.selectedMonth, 1);
    } else {
      newSelectedMonth = subMonths(state.selectedMonth, 1);
    }
    return {
      ...state,
      selectedMonth: newSelectedMonth,
    }
  }
  if (action.type === "TOGGLE_GOAL_DUPLICATE_MODAL") {
    return {
      ...state,
      showGoalDuplicateModal: !state.showGoalDuplicateModal,
    }
  }
  if (action.type === "TOGGLE_NO_GOALS_MODAL") {
    return {
      ...state,
      showNoGoalsModal: !state.showNoGoalsModal,
    }
  } 

  throw new Error("no matching action type");
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [selectedGoal, setSelectedGoal] = useState(state.goals.length > 0 ? state.goals[0][0] : "");

  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    dataHelper.createToLocalStorage('goalsRecord', state.goals);
  }, [state.goals]);

  useEffect(() => {
    dataHelper.createToLocalStorage('stickersAndDatesRecord', state.stickers);
  }, [state.stickers]);


  /* -----------------------------
  -----STATE MANAGEMENT------
  --------------------------------- */
  const hideOrShowGoalDuplicateModal = () => {
    dispatch({type: "TOGGLE_GOAL_DUPLICATE_MODAL"});
  };

  const hideOrShowNoGoalsModal = () => {
    dispatch ({type: "TOGGLE_NO_GOALS_MODAL"});
  };

  const handleSelectedStickerChange = (sticker) => {
    dispatch({type: "SET_SELECTED_STICKER", payload: sticker})
  };

  const modifyStickers = (stickersArray) => {  
    if (noGoalsExist) {
      hideOrShowNoGoalsModal();
      return;
    }
    dispatch({type: "SET_STICKERS", payload: stickersArray});
  };

  const nextMonth = () => {
    dispatch({type: "SET_SELECTED_MONTH", payload: "add"});
  };

  const prevMonth = () => {
    dispatch({type: "SET_SELECTED_MONTH", payload: "subtract"});
  };

  const addNewGoal = (goal) => {
    if (goalDuplicateCheck(goal)) return;
    
    dispatch({type:"ADD_GOAL", payload: goal});
    setSelectedGoal(goal[0]);
  };


  /* -----------------------------
  -----LOGIC ON STATE------
  --------------------------------- */

  const goalDuplicateCheck = (goal) => {
    const goalDuplicate = state.goals.filter(goalRecord => goalRecord[0] === goal[0]);
    const goalDupliacteExists = goalDuplicate.length > 0;
    if (goalDupliacteExists) {
      hideOrShowGoalDuplicateModal();
      return true;
    } else {
      return false;
    }
  }

  const handleSelectedGoalChange = (goal) => {
    setSelectedGoal(goal);

    const lastStickerThisGoalAndMonth = state.stickers
      .filter((obj) => obj["month"] === state.selectedMonth.getMonth())
      .filter((obj) => obj["goal"] === goal)
      .pop();

    if (lastStickerThisGoalAndMonth) {
      handleSelectedStickerChange(lastStickerThisGoalAndMonth["sticker"]);
    } else {
      handleSelectedStickerChange("monkey");
    }
  };

  const handleGoalDeletion = (newGoals, newStickers) => {
    dispatch({type:"SET_GOALS", payload: newGoals});

    modifyStickers(newStickers);

    let newSelectedGoal = newGoals.length === 0 ? "" : newGoals[0][0];
    setSelectedGoal(newSelectedGoal);
  };

  const noGoalsExist = state.goals.length > 0 ? false : true;

  function getCurrentGoalProgress(stickersArray) {
    if (state.goals.length === 0) {
      return {
        stickersCurrentMonth: 0,
        totalGoalDaysCurrentMonth: 0,
      };
    }

    let goalDays;
    if (state.goals.length > 0 && selectedGoal !== "") {
      goalDays = state.goals.filter(
        (recordArr) => recordArr[0] === selectedGoal
      )[0][1];
    } else {
      goalDays = [];
    }

    const currentYear = state.selectedMonth.getFullYear();
    const currentMonth = state.selectedMonth.getMonth();
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

  let currentProgress = getCurrentGoalProgress(state.stickers);

  const calculatePercentAchieved = () => {
    let stickersCurrentMonth = currentProgress.stickersCurrentMonth;
    let totalGoalDaysCurrentMonth = currentProgress.totalGoalDaysCurrentMonth;
    let percentAchieved = selectedGoal
      ? parseFloat(stickersCurrentMonth / totalGoalDaysCurrentMonth)
      : 0;
    return percentAchieved;
  }

  return (
      <div className="App">
        <Header />
        <div className="main-wrapper">
          <GoalsContainer
            goals={state.goals}
            addNewGoal={addNewGoal}
            stickers={state.stickers}
            selectedGoal={selectedGoal}
            handleSelectedGoalChange={handleSelectedGoalChange}
            selectedMonth={state.selectedMonth}
            handleSelectedStickerChange={handleSelectedStickerChange}
            selectedSticker={state.selectedSticker}
            handleGoalDeletion={handleGoalDeletion}
          />
          <Calendar
            goals={state.goals}
            stickers={state.stickers}
            selectedGoal={selectedGoal}
            selectedMonth={state.selectedMonth}
            selectedSticker={state.selectedSticker}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            modifyStickers={modifyStickers}
            currentProgress={currentProgress}
            getCurrentGoalProgress={getCurrentGoalProgress}
          />
          <ProgressBar percentAchieved={calculatePercentAchieved()} />
          <StorageWarning />
          <Footer />
          {state.showGoalDuplicateModal && (
            <GeneralModal
              title={dictionary.goalDuplicateModalTitle}
              message={dictionary.goalDuplicateModalTitle}
              hideOrShowModal={hideOrShowGoalDuplicateModal}
            />
          )}
          {state.showNoGoalsModal && (
            <GeneralModal 
              title={dictionary.noGoalsModalTitle}
              message={dictionary.noGoalsModalMessage}
              hideOrShowModal={hideOrShowNoGoalsModal}
            />
          )}
        </div>
      </div>
  );
}

export default App;