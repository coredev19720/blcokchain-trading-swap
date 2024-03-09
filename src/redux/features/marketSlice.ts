import { dumpPorts } from "@src/constants/dumpData";
import { dumpOrders } from "@src/constants/dumpData/dashboard";
import { TMarket, TOrderKind, TOrderType, TSide } from "@enum/common";
import { ITickerData, ITicket, IOrder } from "@interface/common";
import { IPortItem } from "@interface/table";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stock } from "@/src/constraints/interface/services/response";

type MarketState = {
  ticker: Stock | null;
  ticket: ITicket;
  stocks: Stock[];
  orders: IOrder[];
  order: IOrder | null;
  ports: IPortItem[];
  port: IPortItem | null;
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
    market: TMarket.HOSE,
  },
  stocks: [],
  orders: [],
  order: null,
  ports: [],
  port: null,
} as MarketState;

export const market = createSlice({
  name: "market",
  initialState,
  reducers: {
    reset: () => initialState,
    setTicker: (state, action: PayloadAction<Stock>) => {
      state.ticker = action.payload;
    },
    setTicket: (state, action: PayloadAction<ITicket>) => {
      state.ticket = action.payload;
    },
    appendOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders = [action.payload, ...state.orders];
    },
    updateOrders: (state, action: PayloadAction<IOrder>) => {
      const orders = state.orders.map((o) => {
        if (o.code === action.payload.code) {
          return action.payload;
        }
        return o;
      });
      state.orders = orders;
    },
    setOrder: (state, action: PayloadAction<IOrder | null>) => {
      state.order = action.payload;
    },
    setPort: (state, action: PayloadAction<IPortItem | null>) => {
      state.port = action.payload;
    },
    setPorts: (state, action: PayloadAction<IPortItem[]>) => {
      state.ports = action.payload;
    },
    setStocks: (state, action: PayloadAction<Stock[]>) => {
      state.stocks = action.payload;
    },
  },
});

export const {
  setTicker,
  reset,
  setTicket,
  appendOrder,
  setOrder,
  updateOrders,
  setPort,
  setPorts,
  setStocks,
} = market.actions;
export default market.reducer;
