import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { projectListSlice } from "pages/project-list/ProjectList.slice";
import { authSlice } from "./auth.slice";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
