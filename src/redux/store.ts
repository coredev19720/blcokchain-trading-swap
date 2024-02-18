import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import marketReducer from "./features/marketSlice";
import layoutReducer from "./features/layoutSlice";

export const store = configureStore({
  reducer: {
    market: marketReducer,
    user: userReducer,
    layout: layoutReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
