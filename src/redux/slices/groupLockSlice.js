import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addGroupLock,
  getGroupLocks,
  removeLockFromGroup,
} from "../../services/lockService";

export const fetchGroupLocks = createAsyncThunk(
  "groupLock/fetchGroupLocks",
  async (queryParams, thunkAPI) => {
    try {
      const groupLocks = await getGroupLocks(queryParams);
      return groupLocks;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const addLockToGroup = createAsyncThunk(
  "groupLock/addLockToGroup",
  async (queryParams, thunkAPI) => {
    try {
      const groupLock = await addGroupLock(queryParams);
      return groupLock;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const deleteGroupLock = createAsyncThunk(
  "groupLock/deleteGroupLock",
  async (queryParams, thunkAPI) => {
    try {
      await removeLockFromGroup(queryParams);
      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const groupLockSlice = createSlice({
  name: "groupLock",
  initialState: {
    groupLocks: { data: null, pagination: null },
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
    [fetchGroupLocks.pending]: (state) => {
      state.groupLocks.data = null;
      delete state.error;
      state.loading = true;
    },
    [fetchGroupLocks.fulfilled]: (state, action) => {
      state.groupLocks = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchGroupLocks.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_GROUP_LOCKS",
        errorMessage: payload?.error?.reason,
      };
      delete state.loading;
    },

    [addLockToGroup.pending]: (state) => {
      delete state.error;
      state.loading = true;
    },
    [addLockToGroup.fulfilled]: (state, action) => {
      delete state.loading;
      delete state.error;
    },
    [addLockToGroup.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "ADD_LOCK_TO_GROUP",
        errorMessage: payload?.error?.reason,
      };
      delete state.loading;
    },

    [deleteGroupLock.pending]: (state) => {
      delete state.error;
    },
    [deleteGroupLock.fulfilled]: (state, action) => {
      delete state.loading;
      delete state.error;
    },
    [deleteGroupLock.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "DELETE_GROUP_LOCK",
        errorMessage: payload?.error?.reason,
      };
      delete state.loading;
    },
  },
});

export const { clearStates } = groupLockSlice.actions;
export const groupLockActions = groupLockSlice.actions;
export default groupLockSlice.reducer;
