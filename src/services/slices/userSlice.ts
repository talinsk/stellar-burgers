import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: ''
};

export const login = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => await loginUserApi(loginData)
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (updateData: TRegisterData) => await updateUserApi(updateData)
);

const getUser = createAsyncThunk('user/get', async () => await getUserApi());

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser())
        .catch(() => {
          dispatch(logout());
        })
        .finally(() => {
          dispatch(authChecked());
        });
    } else {
      dispatch(authChecked());
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUserError: (state) => state.error,
    selectUserLoading: (state) => state.isLoading
  },
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
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

const { authChecked } = userSlice.actions;
export const {
  selectUser,
  selectIsAuthChecked,
  selectUserError,
  selectUserLoading
} = userSlice.selectors;
