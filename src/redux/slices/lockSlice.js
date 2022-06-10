import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocks } from "../../services/lockService";

export const fetchLocks = createAsyncThunk(
  "lock/fetchLocks",
  async (queryParams, thunkAPI) => {
    try {
      const locks = await getLocks(queryParams);
      return locks;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const lockSlice = createSlice({
  name: "lock",
  initialState: {
    locks: { data: [], pagination: null },
    loading: false,
    error: null,
  },
  reducers: {
    clearStates: (state, { payload }) => {
      delete state.loading;
      delete state.error;
    },
  },
  extraReducers: {
    [fetchLocks.pending]: (state) => {
      state.locks.data = [];
      delete state.error;
      state.loading = true;
    },
    [fetchLocks.fulfilled]: (state, action) => {
      state.locks = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchLocks.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_LOCKS",
        errorMessage: payload?.error?.reason,
      };
      delete state.loading;
    },
  },
});

export const { clearStates } = lockSlice.actions;
export const lockActions = lockSlice.actions;
export default lockSlice.reducer;
