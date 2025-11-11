import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isIngredientsLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    selectIngredients: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients } = ingredientsSlice.selectors;
