import { configureStore, combineReducers } from '@reduxjs/toolkit';

import AnnouncementSlice from './features/announcement-slice'

export const rootReducer = combineReducers({
  AnnouncementSlice
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch