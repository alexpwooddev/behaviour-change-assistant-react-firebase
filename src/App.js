import React, { useEffect, useState, useContext, useReducer } from "react";

import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import GeneralModal from "./components/GeneralModal";
import GoalsContainer from "./components/GoalsContainer";
import Header from "./components/Header";
import { LanguageContext } from './containers/Language';
import ProgressBar from "./components/ProgressBar";
import { reducer } from './reducer';
import StorageWarning from "./components/StorageWarning";
import { targetDaysInMonthYear } from "./utils/targetDaysInMonthYear";

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
    const noGoalsExist = state.goals.length > 0 ? false : true;
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

  const handleGoalDeletion = (newGoals, newStickers) => {
    dispatch({type:"SET_GOALS", payload: newGoals});

    modifyStickers(newStickers);

    let newSelectedGoal = newGoals.length === 0 ? "" : newGoals[0][0];
    setSelectedGoal(newSelectedGoal);
  };

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


  /* -----------------------------
  -----LOGIC ON STATE------
  --------------------------------- */

  const atLeastOneGoalExists = state.goals.length > 0;

  const selectedGoalRecord = state.goals.filter(
    (goal) => goal[0].toLowerCase() === selectedGoal.toLowerCase()
  );

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
            atLeastOneGoalExists={atLeastOneGoalExists}
            stickers={state.stickers}
            selectedGoal={selectedGoal}
            selectedGoalRecord={selectedGoalRecord}
            selectedMonth={state.selectedMonth}
            selectedSticker={state.selectedSticker}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            modifyStickers={modifyStickers}
            getCurrentGoalProgress={getCurrentGoalProgress}
          />
          <ProgressBar 
            selectedGoal={selectedGoal}
            stickers={state.stickers}
            getCurrentGoalProgress={getCurrentGoalProgress}
          />
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