import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { sendCurrentOrder } from './actions';

type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

type TCurrentOrderState = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  newOrder: TOrder | null;
};

export const currentOrderInitialState: TCurrentOrderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  newOrder: null
};

export const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState: currentOrderInitialState,
  selectors: {
    selectCurrentOrder: (state) => state.constructorItems,
    selectNewOrder: (state) => state.newOrder,
    selectNewOrderRequest: (state) => state.orderRequest
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
    },
    clearCurrentOrder: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderRequest = false;
    },
    clearNewOrder: (state) => {
      state.newOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCurrentOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(sendCurrentOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(sendCurrentOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.newOrder = action.payload.order;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearCurrentOrder,
  clearNewOrder
} = currentOrderSlice.actions;
export const { selectCurrentOrder, selectNewOrder, selectNewOrderRequest } =
  currentOrderSlice.selectors;
