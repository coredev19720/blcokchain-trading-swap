import { IUserInfo } from "@/src/interface/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  userInfo: IUserInfo;
};

const initialState = {
  userInfo: {
    name: "Default Name",
    email: "email@default.com",
  },
} as CounterState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser, reset } = user.actions;
export default user.reducer;
