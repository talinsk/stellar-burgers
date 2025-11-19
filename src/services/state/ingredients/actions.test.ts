import { testBun, testMain, testSauce } from '../../__test__/testIngredients';
import { getIngredients } from './actions';
import { ingredientsSlice } from './slice';

describe('CurrentOrder actions tests', () => {
  it('test getIngredients fulfilled', () => {
    const ingredients = [testBun, testMain, testSauce];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredients
    };

    const state = ingredientsSlice.reducer(undefined, action);
    expect(state.ingredients).toHaveLength(3);
    expect(state.ingredients[0]).toEqual(testBun);
    expect(state.ingredients[1]).toEqual(testMain);
    expect(state.ingredients[2]).toEqual(testSauce);
    expect(state.isIngredientsLoading).toEqual(false);
  });

  it('test getIngredients pending', () => {
    const action = {
      type: getIngredients.pending.type
    };

    const state = ingredientsSlice.reducer(undefined, action);
    expect(state.isIngredientsLoading).toEqual(true);
  });

  it('test getIngredients rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'TestMessage' }
    };

    const state = ingredientsSlice.reducer(undefined, action);
    expect(state.isIngredientsLoading).toEqual(false);
  });
});
