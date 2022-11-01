import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../_reducers/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
