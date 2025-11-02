import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

type TCurrentOrderState = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
};

const initialState: TCurrentOrderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false
};

export const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  selectors: {
    getCurrentOrder: (state) => state
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingr = action.payload;
        if (ingr.type === 'bun') {
          state.constructorItems.bun = ingr;
        } else {
          state.constructorItems.ingredients.push(ingr);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingr = action.payload;
      const indexToRemove = state.constructorItems.ingredients.findIndex(
        (i) => i.id === ingr.id
      );
      if (indexToRemove >= 0) {
        state.constructorItems.ingredients.splice(indexToRemove, 1);
      }
    },
    moveUpIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingr = action.payload;
      const ingrs = state.constructorItems.ingredients;
      const index = ingrs.findIndex((i) => i.id === ingr.id);

      if (index > 0) {
        [ingrs[index], ingrs[index - 1]] = [ingrs[index - 1], ingrs[index]];
      }
    },
    moveDownIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingr = action.payload;
      const ingrs = state.constructorItems.ingredients;
      const index = ingrs.findIndex((i) => i.id === ingr.id);

      if (index < ingrs.length - 1) {
        [ingrs[index], ingrs[index + 1]] = [ingrs[index + 1], ingrs[index]];
      }
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} = currentOrderSlice.actions;
export const reducer = currentOrderSlice.reducer;
export const { getCurrentOrder } = currentOrderSlice.selectors;
