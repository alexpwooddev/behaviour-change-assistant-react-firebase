import React from "react";
import "./GoalCard.css";

const GoalCard = (props) => {
  const deleteGoal = (e) => {
    e.stopPropagation();
    let goalTitleToRemove = e.target.closest("div").dataset["goal"];
    let newGoalsArray = Array.from(props.goals);
    newGoalsArray.splice(newGoalsArray.findIndex(goalArr => goalArr[0].toLowerCase() === goalTitleToRemove.toLowerCase()), 1);

    let newStickersArray = Array.from(props.stickers);
    newStickersArray = newStickersArray.filter(stickerObj => stickerObj["goal"].toLowerCase() !== goalTitleToRemove.toLowerCase());

    props.handleGoalDeletion(newGoalsArray, newStickersArray);
  };

  return (
    <div
      data-goal={props.goal[0]}
      className="goal-card"
      style={{ backgroundColor: `${props.goal[2]}` }}
      onClick={() => props.handleSelectedGoalChange(props.goal[0])}
    >

        <p>I commit to: <span className="goalText">{props.goal[0]}</span></p>
  
      <button type="button" className="btn-primary" onClick={(e) => deleteGoal(e)}>
        Delete Goal
      </button>
    </div>
  );
};

export default GoalCard;
