import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadFeedOrders = createAsyncThunk(
  'orders/get',
  async () => await getFeedsApi()
);

export const loadProfileOrders = createAsyncThunk(
  'orders/profile/get',
  getOrdersApi
);

export const loadOrder = createAsyncThunk(
  'order/getByNumber',
  getOrderByNumberApi
);
