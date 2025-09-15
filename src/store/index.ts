import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    Auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // Enable this for better debugging
      thunk: true, // Allows action creators to return functions
    }).concat([logger]);
  },
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
