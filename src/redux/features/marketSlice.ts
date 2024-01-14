import { TSide } from "@/src/enum";
import { ITickerData } from "@/src/interface/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  ticker: ITickerData;
  side: TSide;
  price: number;
};

const initialState = {
  ticker: {},
} as CounterState;

export const market = createSlice({
  name: "market",
  initialState,
  reducers: {
    reset: () => initialState,
    setTicker: (state, action: PayloadAction<ITickerData>) => {
      state.ticker = action.payload;
    },
  },
});

export const { setTicker, reset } = market.actions;
export default market.reducer;
