import React, { useEffect, useState, useContext, useReducer, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';

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
import { setSelectedSticker, fetchStickersOnStart }  from './features/stickers/stickersSlice';


const defaultState = {
  goals: dataHelper.readGoalsFromLocal(),
  selectedMonth: new Date(),
  showGoalDuplicateModal: false,
  showNoGoalsModal: false,
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const stickers = useSelector(state => state.stickers.stickers);
  const [selectedGoal, setSelectedGoal] = useState(state.goals.length > 0 ? state.goals[0][0] : "");
  const { dictionary } = useContext(LanguageContext);
  const dispatchRedux = useDispatch();

  useEffect(() => {
    dataHelper.createToLocalStorage('goalsRecord', state.goals);
  }, [state.goals]);

  useEffect(() => {
    dispatchRedux(fetchStickersOnStart());
  }, []);


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
    dispatchRedux(setSelectedSticker(sticker));
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

  const handleGoalDeletion = (newGoals) => {
    dispatch({type:"SET_GOALS", payload: newGoals});

    let newSelectedGoal = newGoals.length === 0 ? "" : newGoals[0][0];
    setSelectedGoal(newSelectedGoal);
  };

  const handleSelectedGoalChange = (goal) => {
    setSelectedGoal(goal);

    const lastStickerThisGoalAndMonth = stickers
      .filter((obj) => obj["month"] === state.selectedMonth.getMonth())
      .filter((obj) => obj["goal"] === goal)
      .pop();

    return lastStickerThisGoalAndMonth
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

  const getCurrentGoalProgress = useCallback((stickersArray) => {
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
  }, [state.goals, selectedGoal, state.selectedMonth ]);

  const calculatePercentAchieved = useCallback(() => {
    let currentProgress = getCurrentGoalProgress(stickers);
    let stickersCurrentMonth = currentProgress.stickersCurrentMonth;
    let totalGoalDaysCurrentMonth = currentProgress.totalGoalDaysCurrentMonth;
    let percentAchieved = selectedGoal
      ? parseFloat(stickersCurrentMonth / totalGoalDaysCurrentMonth)
      : 0;
    return percentAchieved;
  }, [stickers, selectedGoal, getCurrentGoalProgress]);


  return (
      <div className="App">
        <Header />
        <div className="main-wrapper">
          <GoalsContainer
            goals={state.goals}
            addNewGoal={addNewGoal}
            selectedGoal={selectedGoal}
            handleSelectedGoalChange={handleSelectedGoalChange}
            selectedMonth={state.selectedMonth}
            handleSelectedStickerChange={handleSelectedStickerChange}
            handleGoalDeletion={handleGoalDeletion}
          />
          <Calendar
            atLeastOneGoalExists={atLeastOneGoalExists}
            selectedGoal={selectedGoal}
            selectedGoalRecord={selectedGoalRecord}
            selectedMonth={state.selectedMonth}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            getCurrentGoalProgress={getCurrentGoalProgress}
            hideOrShowNoGoalsModal={hideOrShowNoGoalsModal}
          />
          <ProgressBar 
            percentAchieved={calculatePercentAchieved()}
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