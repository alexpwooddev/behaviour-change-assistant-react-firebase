import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
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

  const { dictionary } = useContext(LanguageContext);
  const goals = props.goals;
  

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
            selectedGoal={props.selectedGoal}
          />
        );
      })}
      {props.selectedGoal && (
        <StickerSelector
          selectedGoal={props.selectedGoal}
          handleSelectedStickerChange={props.handleSelectedStickerChange}
        />
      )}
      {showGoalModal && (
        <GoalModal
          hideOrShowGoalModal={hideOrShowGoalModal}
          hideOrShowGoalDuplicateModal={props.hideOrShowGoalDuplicateModal}
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

GoalsContainer.propTypes = {
  goals: PropTypes.array.isRequired,
  selectedGoal: PropTypes.string.isRequired,
  hideOrShowGoalDuplicateModal: PropTypes.func.isRequired,
  handleSelectedStickerChange: PropTypes.func.isRequired,
}

export default GoalsContainer;
