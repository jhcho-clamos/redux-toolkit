import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import counterSlice from "../features/counter/counter-slice";
import userSlice from "../features/user/user-slice";
import { apiSlice } from "../dogs/dogs-api-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, PURGE, PERSIST } from "redux-persist";

export const store = configureStore({
  reducer: {
    reducer: counterSlice,
    appreducer: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PURGE, PERSIST],
      },
    }).concat(apiSlice.middleware);
  },
  devTools: true,
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
