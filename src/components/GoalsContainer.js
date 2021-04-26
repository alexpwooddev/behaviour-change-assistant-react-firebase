import React, { useState } from "react";
import HeaderAndButton from "./HeaderAndButton";
import "./GoalsContainer.css";
import StickerSelector from "./StickerSelector";
import GoalCard from "./GoalCard";
import GoalModal from "./GoalModal";
import GeneralModal from "./GeneralModal";

const GoalsContainer = (props) => {
  const [showGoalModal, toggleGoalModal] = useState(false);
  const [showGeneralModal, toggleGeneralModal] = useState(false);
  const goals = props.goals;

  const hideOrShowGeneralModal = () => {
    toggleGeneralModal(!showGeneralModal);
  }

  const hideOrShowGoalModal = () => {
    if (goals.length === 3){
      toggleGeneralModal(!showGeneralModal);
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
      {showGeneralModal && (
        <GeneralModal 
          title="Remember, Less is More" 
          message="Prioritising what we want to change increases our chances of success, so this assistant allows up to 3 goals at a time."
          hideOrShowGeneralModal={hideOrShowGeneralModal} />
      )}
    </div>
  );
};

export default GoalsContainer;
