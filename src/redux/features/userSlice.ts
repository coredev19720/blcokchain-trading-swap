import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountAvailTrade,
  AccountInfo,
  AccountsPermissions,
  AccountSummary,
  CustomerInfo,
} from "@interface/services/response";

type UserState = {
  permissions: AccountsPermissions[] | [];
  accounts: AccountInfo[] | [];
  activeAccount: AccountInfo | null;
  customerInfo: CustomerInfo | null;
  accountSummary: AccountSummary | null;
  accountAvailTrade: AccountAvailTrade | null;
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
    setPermission: (state, action: PayloadAction<AccountsPermissions[]>) => {
      state.permissions = action.payload;
    },
    setAccounts: (state, action: PayloadAction<AccountInfo[]>) => {
      state.accounts = action.payload;
    },
    setActiveAccount: (state, action: PayloadAction<AccountInfo>) => {
      state.activeAccount = action.payload;
    },
    setCustomerInfo: (state, action: PayloadAction<CustomerInfo>) => {
      state.customerInfo = action.payload;
    },
    setAccountSummary: (state, action: PayloadAction<AccountSummary>) => {
      state.accountSummary = action.payload;
    },
    setAccountAvailTrade: (state, action: PayloadAction<AccountAvailTrade>) => {
      state.accountAvailTrade = action.payload;
    },
  },
});

export const {
  setPermission,
  setAccounts,
  setActiveAccount,
  setCustomerInfo,
  setAccountSummary,
  setAccountAvailTrade,
} = user.actions;
export default user.reducer;
