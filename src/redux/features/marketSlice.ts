import { TSide } from "@/src/enum";
import { ITickerData } from "@/src/interface/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  ticker: ITickerData | null;
  side: TSide | null;
  price: number | null;
};

const initialState = {
  ticker: null,
  side: null,
  price: null,
} as CounterState;

export const market = createSlice({
  name: "market",
  initialState,
  reducers: {
    reset: () => initialState,
    setTicker: (state, action: PayloadAction<ITickerData>) => {
      state.ticker = action.payload;
    },
    setSide: (state, action: PayloadAction<TSide>) => {
      state.side = action.payload;
    },
  },
});

export const { setTicker, reset, setSide } = market.actions;
export default market.reducer;
