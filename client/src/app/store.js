import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import charactersReducer from "../slices/charactersSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    characters: charactersReducer,
  },
});
