import React, { useState, useContext } from "react";
import { Text, LanguageContext } from '../containers/Language';
import "./GoalCard.css";
import DeleteModal from "./DeleteModal";


const GoalCard = (props) => {
  const [showDeleteModal, toggleDeleteModal] = useState(false);
  const { dictionary } = useContext(LanguageContext);
  
  const deleteGoal = (e) => {
    e.stopPropagation();
    
    hideOrShowDeleteModal();
    let goalTitleToRemove = props.goal[0];
    let newGoalsArray = Array.from(props.goals);
    newGoalsArray.splice(newGoalsArray.findIndex(goalArr => goalArr[0].toLowerCase() === goalTitleToRemove.toLowerCase()), 1);

    let newStickersArray = Array.from(props.stickers);
    newStickersArray = newStickersArray.filter(stickerObj => stickerObj["goal"].toLowerCase() !== goalTitleToRemove.toLowerCase());

    props.handleGoalDeletion(newGoalsArray, newStickersArray);
  };

  const hideOrShowDeleteModal = () => {
    toggleDeleteModal(!showDeleteModal);
  }

  function ucfirst(str) {
    var firstLetter = str.substr(0, 1);
    return firstLetter.toUpperCase() + str.substr(1);
}

  const goalDays = props.goal[1].map(day => {
    return ucfirst(day);
  });

  let className = "goal-card";

  if (props.selectedGoal === props.goal[0]) {
    className += ' goal-card-active';
  }

  return (
    <React.Fragment>
      <div
      data-goal={props.goal[0]}
      className={className}
      style={{ backgroundColor: `${props.goal[2]}` }}
      onClick={() => props.handleSelectedGoalChange(props.goal[0])}
      >

          <p>I, {props.goal[3]}, commit to <span className="goalText">{props.goal[0]}</span> this month on:</p><hr /> <p>{goalDays.join(', ')}.</p>
    
        <button 
          type="button" 
          className="btn-primary" 
          onClick={hideOrShowDeleteModal}
          // onClick = {(e) => {deleteGoal(e)}}
          >
          <Text tid="deleteGoalButton"/>
        </button>
      </div>
      {showDeleteModal && (
          <DeleteModal 
            title={dictionary.deleteModalTitle}
            message={dictionary.deleteModalMessage}
            deleteGoal={deleteGoal} 
            hideOrShowDeleteModal={hideOrShowDeleteModal} 
            />
        )}
    </React.Fragment>
    
  );
};

export default GoalCard;
