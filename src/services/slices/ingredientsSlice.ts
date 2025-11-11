import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isIngredientsLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false
};

export const getAllIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    getIngredients: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getAllIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
      })
      .addCase(getAllIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredients } = ingredientsSlice.selectors;
