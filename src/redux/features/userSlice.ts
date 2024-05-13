import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccAvailTrade,
  AccInfo,
  AccsPermissions,
  AccsSummary,
  AccSummary,
  AccVerifyInfo,
  AuthorInfo,
} from "@interface/account";

type UserState = {
  permissions: AccsPermissions | null;
  accounts: AccInfo[] | [];
  activeAccount: AccInfo | null;
  customerInfo: AuthorInfo | null;
  accountSummary: AccsSummary | null;
  accountAvailTrade: AccAvailTrade | null;
  verifyInfo: AccVerifyInfo | null;
};

const initialState = {
  permissions: null,
  accounts: [],
  activeAccount: null,
  accountSummary: null,
  accountAvailTrade: null,
  verifyInfo: null,
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
    setVerifyInfo: (state, action: PayloadAction<AccVerifyInfo>) => {
      state.verifyInfo = action.payload;
    },
  },
});

export const {
  setPermissions,
  setAccounts,
  setActiveAccount,
  setAuthorInfo,
  setAccountSummary,
  setVerifyInfo,
} = user.actions;
export default user.reducer;
