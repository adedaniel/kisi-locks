import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaces } from "../../services/placeService";

export const fetchPlaces = createAsyncThunk(
  "place/fetchPlaces",
  async (queryParams, thunkAPI) => {
    try {
      const places = await getPlaces(queryParams);
      return places;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const placeSlice = createSlice({
  name: "place",
  initialState: {
    places: { data: null, pagination: null },
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
    [fetchPlaces.pending]: (state) => {
      state.places.data = null;
      delete state.error;
      state.loading = true;
    },
    [fetchPlaces.fulfilled]: (state, action) => {
      state.places = action.payload;
      delete state.loading;
      delete state.error;
    },
    [fetchPlaces.rejected]: (state, { payload }) => {
      state.error = {
        errorType: "FETCH_PLACES",
        errorMessage: payload?.error?.reason,
      };
      delete state.loading;
    },
  },
});

export const { clearStates } = placeSlice.actions;
export const placeActions = placeSlice.actions;
export default placeSlice.reducer;
