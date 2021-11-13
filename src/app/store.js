import { configureStore } from '@reduxjs/toolkit';
import stickersReducer from '../features/stickers/stickersSlice';

export default configureStore({
    reducer: {
        stickers: stickersReducer,
    }
});