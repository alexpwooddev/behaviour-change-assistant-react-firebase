import React, { useEffect, useContext, useReducer, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { parseISO } from "date-fns";

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
import { setSelectedSticker, fetchStickersOnStart }  from './features/stickers/stickersSlice';
import { fetchGoalsOnStart } from './features/goals/goalsSlice';


const defaultState = {
  showGoalDuplicateModal: false,
  showNoGoalsModal: false,
}

function App() {
  const [reducerState, dispatch] = useReducer(reducer, defaultState);
  const stickers = useSelector(state => state.stickers.stickers);
  const goals = useSelector(state => state.goals.goals);
  const selectedGoal = useSelector(state => state.goals.selectedGoal);
  const selectedMonth = parseISO(useSelector(state => state.stickers.selectedMonth));
  const dispatchRedux = useDispatch();

  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    dispatchRedux(fetchGoalsOnStart());
  }, [dispatchRedux]);

  useEffect(() => {
    dispatchRedux(fetchStickersOnStart());
  }, [dispatchRedux]);


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


  /* -----------------------------
  -----LOGIC ON STATE------
  --------------------------------- */

  const atLeastOneGoalExists = goals.length > 0;

  console.log(selectedGoal);
  const selectedGoalRecord = goals.filter(
    (goal) => goal[0].toLowerCase() === selectedGoal.toLowerCase()
  );

  const getCurrentGoalProgress = useCallback((stickersArray) => {
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
  }, [goals, selectedGoal, selectedMonth ]);

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
            goals={goals}
            selectedGoal={selectedGoal}
            handleSelectedStickerChange={handleSelectedStickerChange}
            hideOrShowGoalDuplicateModal={hideOrShowGoalDuplicateModal}
          />
          <Calendar
            atLeastOneGoalExists={atLeastOneGoalExists}
            selectedGoal={selectedGoal}
            selectedGoalRecord={selectedGoalRecord}
            getCurrentGoalProgress={getCurrentGoalProgress}
            hideOrShowNoGoalsModal={hideOrShowNoGoalsModal}
          />
          <ProgressBar 
            percentAchieved={calculatePercentAchieved()}
          />
          <StorageWarning />
          <Footer />
          {reducerState.showGoalDuplicateModal && (
            <GeneralModal
              title={dictionary.goalDuplicateModalTitle}
              message={dictionary.goalDuplicateModalTitle}
              hideOrShowModal={hideOrShowGoalDuplicateModal}
            />
          )}
          {reducerState.showNoGoalsModal && (
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