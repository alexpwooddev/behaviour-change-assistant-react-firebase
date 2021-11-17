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
  const newGoals = await dataHelper.createToLocalStorage(
    "goalsRecord",
    newGoal,
    true
  );
  return newGoals;
});

export const setGoals = createAsyncThunk("goals/setGoals", async (newGoals) => {
  const newlyCreatedGoals = await dataHelper.createToLocalStorage(
    "goalsRecord",
    newGoals
  );
  return newlyCreatedGoals;
});

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setSelectedGoal: (state, action) => {
      state.selectedGoal = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGoalsOnStart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoalsOnStart.fulfilled, (state, action) => {
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
    builder
      .addCase(addGoal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newGoals = action.payload;
        state.goals = newGoals;
        state.selectedGoal = newGoals[0];
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(setGoals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newGoals = action.payload;
        state.goals = newGoals;
        state.selectedGoal = newGoals.length === 0 ? "" : newGoals[0][0];
      })
  },
});

export const { setSelectedGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
