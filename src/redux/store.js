import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice.js";
import placeReducer from "./slices/placeSlice.js";
import groupReducer from "./slices/groupSlice.js";
import lockReducer from "./slices/lockSlice.js";
import groupLockReducer from "./slices/groupLockSlice.js";
//Import individual slices and configure store

export default configureStore({
  reducer: {
    user: userReducer,
    places: placeReducer,
    groups: groupReducer,
    locks: lockReducer,
    groupLocks: groupLockReducer,
  },
  devTools: true,
});
