import { dumpOrders } from "@/src/constants/dumpData/dashboard";
import { TOrderKind, TOrderType, TSide } from "@/src/enum";
import { ITickerData, ITicket, IOrder } from "@/src/interface/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  ticker: ITickerData | null;
  ticket: ITicket;
  orders: IOrder[];
};

const initialState = {
  ticker: null,
  ticket: {
    side: TSide.BUY,
    price: 0,
    vol: 0,
    symbol: "",
    type: TOrderType.LO,
    kind: "normal" as TOrderKind,
  },
  orders: dumpOrders,
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
    setTransaction: (state, action: PayloadAction<IOrder>) => {
      state.orders = [action.payload, ...state.orders];
    },
  },
});

export const { setTicker, reset, setTicket, setTransaction } = market.actions;
export default market.reducer;
