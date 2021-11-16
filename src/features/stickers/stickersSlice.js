import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMonths, subMonths, parseISO } from "date-fns";

import * as dataHelper from '../../dataHelper';

const initialState = {
  stickers: [],
  selectedSticker: "monkey",
  selectedMonth: new Date().toISOString(),
  status: "idle",
};

export const fetchStickersOnStart = createAsyncThunk(
  "stickers/fetchStickersOnStart",
  async () => {
    const localStickers = await dataHelper.readStickersFromLocal();
    return localStickers;
  }
);

export const setStickers = createAsyncThunk(
  "stickers/setStickers",
  async(stickers) => {
    await dataHelper.createToLocalStorage('stickersAndDatesRecord', stickers);
    return stickers;
  }
);

export const stickersSlice = createSlice({
  name: "stickers",
  initialState,
  reducers: {
    setSelectedSticker: (state, action) => {
      state.selectedSticker = action.payload;
    },
    setSelectedMonth: (state, action) => {
      if (action.payload === "add") {
        state.selectedMonth = addMonths(parseISO(state.selectedMonth), 1).toISOString();
      } else {
        state.selectedMonth = subMonths(parseISO(state.selectedMonth), 1).toISOString();
      }
    }
  },
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
    builder
      .addCase(setStickers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setStickers.fulfilled, (state, action) => {
        state.status = "succeeded";
        const localStickers = action.payload;
        state.stickers = localStickers;
      })
      .addCase(setStickers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { setSelectedSticker, setSelectedMonth } = stickersSlice.actions;

export default stickersSlice.reducer;
