import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi, getOrderByNumberApi } from '@api';

type TOrdersState = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  isFeedLoading: boolean;
  orderByNumber: TOrder | null;
};

const initialState: TOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isFeedLoading: false,
  orderByNumber: null
};

export const loadFeedOrders = createAsyncThunk(
  'orders/get',
  async () => await getFeedsApi()
);

export const loadOrder = createAsyncThunk(
  'order/getByNumber',
  async (orderId: number) => await getOrderByNumberApi(orderId)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  selectors: {
    getFeeds: (state) => state,
    getOrderByNumber: (state) => state.orderByNumber
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeedOrders.pending, (state) => {
        console.log('loadFeed.pending');
        state.isFeedLoading = true;
      })
      .addCase(loadFeedOrders.rejected, (state, action) => {
        state.isFeedLoading = false;
      })
      .addCase(loadFeedOrders.fulfilled, (state, action) => {
        console.log('loadFeed.fulfilled');
        state.isFeedLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(loadOrder.pending, (state) => {
        console.log('loadOrder.pending');
        state.orderByNumber = null;
      })
      .addCase(loadOrder.rejected, (state, action) => {})
      .addCase(loadOrder.fulfilled, (state, action) => {
        console.log('loadOrder.fulfilled');
        if (action.payload.orders && action.payload.orders.length > 0) {
          state.orderByNumber = action.payload.orders[0];
        }
      });
  }
});

export const { getFeeds, getOrderByNumber } = ordersSlice.selectors;
