import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
interface User {
  age: number;
  [member: number]: string;
}
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["age"],
};

const initialState: User = {
  age: 211,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    gets(state, action: PayloadAction<number>) {
      state.age += action.payload;
    },
    init(state) {
      state.age = initialState.age;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, (state) => initialState);
  },
});

export const { gets, init } = userSlice.actions;
export default persistReducer(persistConfig, userSlice.reducer);
