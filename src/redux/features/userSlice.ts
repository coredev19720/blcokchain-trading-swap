import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccAvailTrade,
  AccInfo,
  AccsPermissions,
  AccsSummary,
  AccSummary,
  AuthorInfo,
} from "@interface/account";

type UserState = {
  permissions: AccsPermissions | null;
  accounts: AccInfo[] | [];
  activeAccount: AccInfo | null;
  customerInfo: AuthorInfo | null;
  accountSummary: AccsSummary | null;
  accountAvailTrade: AccAvailTrade | null;
};

const initialState = {
  permissions: null,
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
      state.accountSummary = {
        ...state.accountSummary,
        [action.payload.id]: action.payload,
      };
    },
  },
});

export const {
  setPermissions,
  setAccounts,
  setActiveAccount,
  setAuthorInfo,
  setAccountSummary,
} = user.actions;
export default user.reducer;
