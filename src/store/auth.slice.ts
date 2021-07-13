import { createSlice } from "@reduxjs/toolkit";
import { initUser } from "context/authContext";
import { AppDispatch, AppThunk, RootState } from "store";
import { IAuthForm, IUser } from "typings/user";
import * as auth from "../auth";

interface IAuthState {
  user: IUser | null;
}

const initialState: IAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login =
  (form: IAuthForm): AppThunk =>
  (dispatch: AppDispatch) =>
    auth.login(form).then(user => dispatch(setUser(user)));
export const register =
  (form: IAuthForm): AppThunk =>
  (dispatch: AppDispatch) =>
    auth.register(form).then(user => dispatch(setUser(user)));
export const logout = (): AppThunk => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));
export const init = (): AppThunk => (dispatch: AppDispatch) =>
  initUser().then(user => {
    console.log("initUser");

    dispatch(setUser(user));
  });
