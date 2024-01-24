import { TOrderKind, TOrderType, TSide } from "@/src/enum";
import { ITickerData, ITicket, ITransaction } from "@/src/interface/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  ticker: ITickerData | null;
  ticket: ITicket;
  transactions: ITransaction[];
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
  transactions: [],
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
    setTransaction: (state, action: PayloadAction<ITransaction>) => {
      state.transactions = [action.payload, ...state.transactions];
    },
  },
});

export const { setTicker, reset, setTicket, setTransaction } = market.actions;
export default market.reducer;
