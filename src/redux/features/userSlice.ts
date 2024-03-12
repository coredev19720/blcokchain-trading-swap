import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccAvailTrade,
  AccInfo,
  AccsPermissions,
  AccSummary,
  AuthorInfo,
} from "@interface/account";

type UserState = {
  permissions: AccsPermissions | [];
  accounts: AccInfo[] | [];
  activeAccount: AccInfo | null;
  customerInfo: AuthorInfo | null;
  accountSummary: AccSummary | null;
  accountAvailTrade: AccAvailTrade | null;
};

const initialState = {
  permissions: [],
  accounts: [],
  activeAccount: null,
  accountSummary: null,
  accountAvailTrade: null,
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<AccsPermissions>) => {
      state.permissions = action.payload;
    },
    setAccounts: (state, action: PayloadAction<AccInfo[]>) => {
      state.accounts = action.payload;
    },
    setActiveAccount: (state, action: PayloadAction<AccInfo>) => {
      state.activeAccount = action.payload;
    },
    setAuthorInfo: (state, action: PayloadAction<AuthorInfo>) => {
      state.customerInfo = action.payload;
    },
    setAccountSummary: (state, action: PayloadAction<AccSummary>) => {
      state.accountSummary = action.payload;
    },
    setAccountAvailTrade: (state, action: PayloadAction<AccAvailTrade>) => {
      state.accountAvailTrade = action.payload;
    },
  },
});

export const {
  setPermissions,
  setAccounts,
  setActiveAccount,
  setAuthorInfo,
  setAccountSummary,
  setAccountAvailTrade,
} = user.actions;
export default user.reducer;
