import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LayoutState = {
  theme: "light" | "dark";
};

const initialState = {
  theme: "light",
} as LayoutState;

export const layout = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = layout.actions;
export default layout.reducer;
