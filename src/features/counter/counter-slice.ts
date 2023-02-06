import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["value", "name"],
};

interface CounterState {
  value: number;
  name?: string;
}

const initialState: CounterState = {
  value: 0,
  name: "hi",
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
  // 초기화
  extraReducers(builder) {
    builder.addCase(PURGE, (state) => initialState);
  },
});

export const { incremented } = counterSlice.actions;
export default persistReducer(persistConfig, counterSlice.reducer);
