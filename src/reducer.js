export const reducer = (state, action) => {
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