import { createSlice, isPending } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  authChecked,
  getUser,
  login,
  logout,
  registerUser,
  updateUser
} from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string;
};

export const userInitialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUserError: (state) => state.error,
    selectUserLoading: (state) => state.isLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authChecked, (state) => {
        state.isAuthChecked = true;
      })
      // login
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      // register
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      // get user
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      // logout
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      // updating user
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      .addMatcher(
        isPending(login, registerUser, getUser, logout, updateUser),
        (state) => {
          state.isLoading = true;
        }
      );
  }
});

export const {
  selectUser,
  selectIsAuthChecked,
  selectUserError,
  selectUserLoading
} = userSlice.selectors;
