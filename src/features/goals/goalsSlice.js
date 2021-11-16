import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as dataHelper from "../../dataHelper";

const initialState = {
  goals: [],
  selectedGoal: "",
  status: "idle",
};


export const fetchGoalsOnStart = createAsyncThunk(
  "goals/fetchGoalsOnStart",
  async () => {
    const localGoals = await dataHelper.readGoalsFromLocal();
    return localGoals;
  }
);

export const addGoal = createAsyncThunk("goals/addGoal", async (newGoal) => {
     // dispatch({type:"ADD_GOAL", payload: goal});
    // setSelectedGoal(goal[0]);
    
    //can't be reading state here in the thunk... could prepare the newGoals down
    //in the component and pass it in here
    const newGoals = state.goals.push(newGoal);
    await dataHelper.createToLocalStorage('', newGoals);
    return newGoals;
});

export const deleteGoal = createAsyncThunk();

export const setSelectedGoal = createAsyncThunk();

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGoalsOnStart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoalsOnStart, (state, action) => {
        state.status = "succeeded";
        const localGoals = action.payload;
        const selectedGoal = localGoals.length > 0 ? localGoals[0][0] : "";
        state.goals = localGoals;
        state.selectedGoal = selectedGoal;
      })
      .addCase(fetchGoalsOnStart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
