import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendCurrentOrder = createAsyncThunk(
  'currentOrder/send',
  async (data: string[]) => await orderBurgerApi(data)
);
