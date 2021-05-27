import React, { useState, useContext } from "react";

import { LanguageContext } from '../containers/Language';

import HeaderAndButton from "./HeaderAndButton";
import "./GoalsContainer.css";
import StickerSelector from "./StickerSelector";
import GoalCard from "./GoalCard";
import GoalModal from "./GoalModal";
import GeneralModal from "./GeneralModal";

const GoalsContainer = (props) => {
  const [showGoalModal, toggleGoalModal] = useState(false);
  const [showGoalsLimitModal, toggleShowGoalsLimitModal] = useState(false);
  const goals = props.goals;
  const { dictionary } = useContext(LanguageContext);

  const hideOrShowGoalsLimitModal = () => {
    toggleShowGoalsLimitModal(!showGoalsLimitModal);
  };

  const hideOrShowGoalModal = () => {
    if (goals.length === 3){
      hideOrShowGoalsLimitModal();
      return;
    } else{
      toggleGoalModal(!showGoalModal);
    }
  };

  return (
    <div className="goals-col">
      <HeaderAndButton hideOrShowGoalModal={hideOrShowGoalModal} />
      {goals.map((goal, id) => {
        return (
          <GoalCard
            key={id}
            goal={goal}
            goals={props.goals}
            stickers={props.stickers}
            handleSelectedGoalChange={props.handleSelectedGoalChange}
            handleGoalDeletion={props.handleGoalDeletion}
            selectedGoal={props.selectedGoal}
          />
        );
      })}
      {props.selectedGoal && (
        <StickerSelector
          selectedGoal={props.selectedGoal}
          stickers={props.stickers}
          selectedMonth={props.selectedMonth}
          handleSelectedStickerChange={props.handleSelectedStickerChange}
          selectedSticker={props.selectedSticker}
        />
      )}
      {showGoalModal && (
        <GoalModal
          addNewGoal={props.addNewGoal}
          hideOrShowGoalModal={hideOrShowGoalModal}
          goals={props.goals}
        />
      )}
      {showGoalsLimitModal && (
        <GeneralModal 
          title={dictionary.goalsLimitModalTitle}
          message={dictionary.goalsLimitModalMessage}
          hideOrShowModal={hideOrShowGoalsLimitModal} />
      )}
    </div>
  );
};

export default GoalsContainer;
