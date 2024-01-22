import { TOrderKind, TOrderType, TSide } from "@/src/enum";
import { ITickerData, ITicket } from "@/src/interface/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  ticker: ITickerData | null;
  ticket: ITicket;
};

const initialState = {
  ticker: null,
  ticket: {
    side: TSide.BUY,
    price: 0,
    vol: 0,
    ticker: "",
    type: TOrderType.LO,
    kind: "normal" as TOrderKind,
  },
} as CounterState;

export const market = createSlice({
  name: "market",
  initialState,
  reducers: {
    reset: () => initialState,
    setTicker: (state, action: PayloadAction<ITickerData>) => {
      state.ticker = action.payload;
    },
    setTicket: (state, action: PayloadAction<ITicket>) => {
      state.ticket = action.payload;
    },
  },
});

export const { setTicker, reset, setTicket } = market.actions;
export default market.reducer;
