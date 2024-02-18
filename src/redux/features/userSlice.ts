import { IAccount, IUserInfo } from "@/src/interface/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { accounts } from "@/src/constants/dumpData/dashboard";
type UserState = {
  userInfo: IUserInfo;
  account: IAccount | null;
};

const initialState = {
  userInfo: {
    name: "Xuan dieu",
    email: "lxdieu90@gmail.com",
  },
  account: accounts[0],
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
    setAccount: (state, action: PayloadAction<IAccount>) => {
      state.account = action.payload;
    },
  },
});

export const { setUser, reset, setAccount } = user.actions;
export default user.reducer;
