import { authChecked, getUser, login, logout, registerUser, updateUser } from './actions';
import { userSlice } from './slice';

describe('User actions tests', () => {
  const testUser = {
    email: 'testEMail',
    name: 'testUserName'
  };
  const errorMessage = 'testMessage';

  it('test checkUserAuth', () => {
    const action = {
      type: authChecked.type
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isAuthChecked).toEqual(true);

    // other fields didn't affected
    expect(state.error).toEqual('');
    expect(state.isLoading).toEqual(false);
    expect(state.user).toBeNull();
  });

  // getUser
  it('test getUser fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: {
        success: true,
        user: testUser
      }
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.user).toEqual(testUser);

    // other fields didn't affected
    expect(state.error).toEqual('');
    expect(state.isLoading).toEqual(false);
    expect(state.isAuthChecked).toEqual(false);
  });

  it('test getUser pending', () => {
    const action = {
      type: getUser.pending.type
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(true);
  });

  it('test getUser rejected', () => {
    const action = {
      type: getUser.rejected.type
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(false);
  });

  // login
  it('test login fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: {
        success: true,
        user: testUser
      }
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.user).toEqual(testUser);

    // other fields didn't affected
    expect(state.error).toEqual('');
    expect(state.isLoading).toEqual(false);
    expect(state.isAuthChecked).toEqual(false);
  });

  it('test login pending', () => {
    const action = {
      type: login.pending.type
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(true);
  });

  it('test login rejected', () => {
    const action = {
      type: login.rejected.type,
      error: { message: errorMessage }
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  // registerUser
  it('test registerUser fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        success: true,
        user: testUser
      }
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.user).toEqual(testUser);

    // other fields didn't affected
    expect(state.error).toEqual('');
    expect(state.isLoading).toEqual(false);
    expect(state.isAuthChecked).toEqual(false);
  });

  it('test registerUser pending', () => {
    const action = {
      type: registerUser.pending.type
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(true);
  });

  it('test registerUser rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: errorMessage }
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  // updateUser
  it('test updateUser fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: {
        success: true,
        user: testUser
      }
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.user).toEqual(testUser);

    // other fields didn't affected
    expect(state.error).toEqual('');
    expect(state.isLoading).toEqual(false);
    expect(state.isAuthChecked).toEqual(false);
  });

  it('test updateUser pending', () => {
    const action = {
      type: updateUser.pending.type
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(true);
  });

  it('test updateUser rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  // logout
  it('test logout fulfilled', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: {
        success: true,
        user: testUser
      }
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.user).toBeNull();

    // other fields didn't affected
    expect(state.error).toEqual('');
    expect(state.isLoading).toEqual(false);
    expect(state.isAuthChecked).toEqual(false);
  });

  it('test logout pending', () => {
    const action = {
      type: logout.pending.type
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(true);
  });

  it('test logout rejected', () => {
    const action = {
      type: logout.rejected.type
    };

    const state = userSlice.reducer(undefined, action);
    expect(state.isLoading).toEqual(false);
  });
});
