import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGroupById, getGroups } from "../../services/groupService";

export const fetchGroups = createAsyncThunk(
  "group/fetchGroups",
  async (queryParams, thunkAPI) => {
    try {
      const groups = await getGroups(queryParams);
      return groups;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const fetchGroupById = createAsyncThunk(
  "group/fetchGroupById",
  async (queryParams, thunkAPI) => {
    try {
      const group = await getGroupById(queryParams);
      return group;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState: {
    selectedGroup: null,
    groups: { data: null, pagination: null },
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
    [fetchGroups.pending]: (state) => {
      state.groups.data = null;
      delete state.error;
      state.loading = true;
    },
    [fetchGroups.fulfilled]: (state, action) => {
      state.groups = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchGroups.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_GROUPS",
        errorMessage: payload?.error?.reason,
      };
      delete state.loading;
    },

    [fetchGroupById.pending]: (state) => {
      state.selectedGroup = null;
      delete state.error;
      state.loading = true;
    },
    [fetchGroupById.fulfilled]: (state, action) => {
      state.selectedGroup = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchGroupById.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_SELECTED_GROUP",
        errorMessage: payload?.error?.reason,
      };
      delete state.loading;
    },
  },
});

export const { clearStates } = groupSlice.actions;
export const groupActions = groupSlice.actions;
export default groupSlice.reducer;
