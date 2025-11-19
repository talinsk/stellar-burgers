import { ingredientsSlice } from './slice';

describe('Ingredients slice tests', () => {
  const ingredientsSliceReducer = ingredientsSlice.reducer;

  it('test initialization', () => {
    const newState = ingredientsSliceReducer(undefined, { type: '' });

    expect(newState).toMatchObject({
      isIngredientsLoading: false,
      ingredients: []
    });
  });
});
