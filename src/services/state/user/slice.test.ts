import { userInitialState, userSlice } from './slice';

describe('User slice tests', () => {
  const userSliceReducer = userSlice.reducer;

  it('test initialization', () => {
    const newState = userSliceReducer(undefined, { type: '' });

    expect(newState).toEqual(userInitialState);
  });
});
