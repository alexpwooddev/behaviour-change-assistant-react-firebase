import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import dataHelper from "../../dataHelper";

const initialState = {
  stickers: [],
  selectedSticker: "monkey",
  status: "idle",
};

export const fetchStickersOnStart = createAsyncThunk(
  "stickers/fetchStickersOnStart",
  async () => {
    const localStickers = await dataHelper.readStickersFromLocal(
      "stickersAndDatesRecord"
    );
    return localStickers;
  }
);

export const stickersSlice = createSlice({
  name: "stickers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStickersOnStart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStickersOnStart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const localStickers = action.payload;
        state.stickers = localStickers;
      })
      .addCase(fetchStickersOnStart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
