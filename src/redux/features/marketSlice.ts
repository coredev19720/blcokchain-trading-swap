import { TMarket, TOrderKind, TOrderType, TSide } from "@enum/common";
import {
  ITicket,
  InsRTData,
  Instrument,
  OrderInfo,
  PortItem,
} from "@interface/market";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stock } from "@/src/constraints/interface/market";

type MarketState = {
  selectedStock: Stock;
  ticket: ITicket;
  stocks: Stock[];
  orders: OrderInfo[];
  order: OrderInfo | null;
  ports: PortItem[];
  port: PortItem | null;
  inst: InsRTData | null;
};

const initialState = {
  selectedStock: {
    symbol: "",
    FullName: "",
  },
  ticket: {
    side: TSide.buy,
    price: "0",
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
  inst: null,
} as MarketState;

export const market = createSlice({
  name: "market",
  initialState,
  reducers: {
    reset: () => initialState,
    setSelectedStock: (state, action: PayloadAction<Stock>) => {
      state.selectedStock = action.payload;
    },
    setTicket: (state, action: PayloadAction<ITicket>) => {
      state.ticket = action.payload;
    },
    appendOrder: (state, action: PayloadAction<OrderInfo>) => {
      state.orders = [action.payload, ...state.orders];
    },
    updateOrders: (state, action: PayloadAction<OrderInfo>) => {
      const orders = state.orders.map((o) => {
        if (o.orderid === action.payload.orderid) {
          return action.payload;
        }
        return o;
      });
      state.orders = orders;
    },
    setOrder: (state, action: PayloadAction<OrderInfo | null>) => {
      state.order = action.payload;
    },
    setOrders: (state, action: PayloadAction<OrderInfo[]>) => {
      state.orders = action.payload;
    },
    setPort: (state, action: PayloadAction<PortItem | null>) => {
      state.port = action.payload;
    },
    setPorts: (state, action: PayloadAction<PortItem[]>) => {
      state.ports = action.payload;
    },
    setStocks: (state, action: PayloadAction<Stock[]>) => {
      state.stocks = action.payload;
    },
    setInstrument: (state, action: PayloadAction<InsRTData | null>) => {
      state.inst = action.payload;
    },
  },
});

export const {
  setSelectedStock,
  setOrders,
  reset,
  setTicket,
  appendOrder,
  setOrder,
  updateOrders,
  setPort,
  setPorts,
  setStocks,
  setInstrument,
} = market.actions;
export default market.reducer;
