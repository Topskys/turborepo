import { configureStore } from "@reduxjs/toolkit";
import auth from "./modules/reducers/auth";


export const store = configureStore({
  reducer: {
    auth,
  }
});