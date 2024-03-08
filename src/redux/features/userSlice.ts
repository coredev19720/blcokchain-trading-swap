import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountDetails,
  AccountInfo,
  AccountsPermissions,
  AccountsResponse,
  GetPermissionInfoResponse,
} from "@interface/services/response";

type UserState = {
  permissions: AccountsPermissions[] | [];
  accounts: AccountInfo[] | [];
  activeAccount: AccountInfo | null;
};

const initialState = {
  permissions: [],
  accounts: [],
  activeAccount: null,
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
  },
});

export const { setPermission, setAccounts, setActiveAccount } = user.actions;
export default user.reducer;
