import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, login } from "../../services/authService";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (queryParams, thunkAPI) => {
    try {
      const user = await login(queryParams);
      console.log(user);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (queryParams, thunkAPI) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearStates: (state, { payload }) => {
      delete state.loading;
      delete state.error;
    },
    logoutUser: (state) => {
      // From here we can take action only at this "user" state
      // But, as we have taken care of this particular "logout" action
      // in rootReducer, we can use it to CLEAR the complete Redux Store's state
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.user = null;
      delete state.error;
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      delete state.loading;
      delete state.error;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "LOGIN_USER",
        errorMessage: payload?.error?.reason,
      };
      delete state.loading;
    },

    [fetchUserDetails.pending]: (state) => {
      state.user = null;
      delete state.error;
      state.loading = true;
    },
    [fetchUserDetails.fulfilled]: (state, action) => {
      state.user = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchUserDetails.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_USER_DETAILS",
        errorMessage: payload?.error?.reason,
      };
      delete state.loading;
    },
  },
});

export const { clearStates, setUser, logoutUser } = userSlice.actions;
export const userActions = userSlice.actions;
export default userSlice.reducer;
