import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountDetails,
  AccountInfo,
  AccountsResponse,
  GetPermissionInfoResponse,
} from "@interface/services/response";

type UserState = {
  permissions: GetPermissionInfoResponse | null;
  accounts: AccountsResponse | null;
  activeAccount: AccountInfo | null;
};

const initialState = {
  permissions: null,
  accounts: null,
  activeAccount: null,
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPermission: (
      state,
      action: PayloadAction<GetPermissionInfoResponse>
    ) => {
      state.permissions = action.payload;
    },
    setAccounts: (state, action: PayloadAction<AccountsResponse>) => {
      state.accounts = action.payload;
    },
    setActiveAccount: (state, action: PayloadAction<AccountInfo>) => {
      state.activeAccount = action.payload;
    },
  },
});

export const { setPermission, setAccounts, setActiveAccount } = user.actions;
export default user.reducer;
