import { configureStore } from '@reduxjs/toolkit';
import stickersReducer from '../features/stickers/stickersSlice';
import goalsReducer from '../features/goals/goalsSlice';

export default configureStore({
    reducer: {
        stickers: stickersReducer,
        goals: goalsReducer,
    }
});