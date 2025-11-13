import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../../utils/cookie';

export const getUser = createAsyncThunk(
  'user/get',
  async () => await getUserApi()
);

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

export const authChecked = createAction('user/authChecked');
