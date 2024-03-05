import { ITickerOpt } from "@interface/common";
import { IPortItem } from "@interface/table";

export const tickerOpts: ITickerOpt[] = [
  {
    title: "Công ty Cổ phần Chứng khoán Thành phố Hồ Chí Minh",
    value: "HCM",
  },
  {
    title: "Công ty Cổ phần Tập đoàn Hòa Phát",
    value: "HPG",
  },
  {
    title: "Công ty Cổ phần Chứng khoán SSI",
    value: "SSI",
  },
  {
    title: "Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam",
    value: "VCB",
  },
  {
    title: "Ngân hàng Thương mại Cổ phần Á Châu",
    value: "ACB",
  },
  { title: "Công ty Cổ phần Đầu tư Thế Giới Di Động", value: "MWG" },
  { title: "Công ty Cổ phần Chứng khoán FPT", value: "FTS" },
  { title: "Ngân hàng Thương mại Cổ phần Việt Nam Thịnh Vượng", value: "VPB" },
  { title: "Công ty Cổ phần Chứng khoán VNDIRECT", value: "VND" },
  { title: "Tập đoàn Vingroup - Công ty Cổ phần", value: "VIC" },
  { title: "Công ty Cổ phần Sữa Việt Nam", value: "VNM" },
  { title: "Công ty Cổ phần Vinhomes", value: "VHM" },
  { title: "Ngân hàng Thương mại Cổ phần Kỹ thương Việt Nam", value: "TCB" },
];

export const dumpPorts: IPortItem[] = [
  {
    symbol: "HCM",
    qty: 1000,
    marketPrice: 27.5,
    price: 27.2,
    tradableQty: 1000,
  },
  {
    symbol: "HPG",
    qty: 1000,
    marketPrice: 28.2,
    price: 26.45,
    tradableQty: 1000,
  },
  {
    symbol: "SSI",
    qty: 1000,
    marketPrice: 32.4,
    price: 35.8,
    tradableQty: 1000,
  },
  {
    symbol: "VCB",
    qty: 1000,
    marketPrice: 82.5,
    price: 90.5,
    tradableQty: 1000,
  },
  {
    symbol: "ACB",
    qty: 1000,
    marketPrice: 23.2,
    price: 20.2,
    tradableQty: 1000,
  },
  {
    symbol: "MWG",
    qty: 1000,
    marketPrice: 42.8,
    price: 40.2,
    tradableQty: 1000,
  },
  {
    symbol: "FTS",
    qty: 1000,
    marketPrice: 44.5,
    price: 43.5,
    tradableQty: 1000,
  },
  {
    symbol: "VPB",
    qty: 1000,
    marketPrice: 18.5,
    price: 18,
    tradableQty: 1000,
  },
  {
    symbol: "VND",
    qty: 1000,
    marketPrice: 20.5,
    price: 18.2,
    tradableQty: 1000,
  },
  {
    symbol: "VIC",
    qty: 1000,
    marketPrice: 42.5,
    price: 37.2,
    tradableQty: 1000,
  },
  {
    symbol: "VNM",
    qty: 1000,
    marketPrice: 67,
    price: 57.2,
    tradableQty: 1000,
  },
  {
    symbol: "VHM",
    qty: 1000,
    marketPrice: 42,
    price: 47.2,
    tradableQty: 1000,
  },
  {
    symbol: "TCB",
    qty: 1000,
    marketPrice: 35.4,
    price: 30,
    tradableQty: 1000,
  },
];
