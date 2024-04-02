import { InsRTData } from "@/src/constraints/interface/market";

export const initInstrument: InsRTData = {
  Id: "", // identify
  SB: "", // Symbol: Mã chứng khoán
  SI: "", // StockId
  FN: "", // FullName: Tên mã
  TD: "", // Tradingdate: ngày giao dịch
  ST: "", // StockType
  CL: 0, // Ceiling: giá trần
  FL: 0, // Floor: giá sàn
  RE: 0, // Reference: giá tham chiếu
  B3: 0, // bidPrice3: top 3 giá mua tốt nhất
  V3: 0, // volPrice3: top 3 khối lượng mua tốt nhất
  B2: 0, // bidPrice2: top 3 giá mua tốt nhất
  V2: 0, // volPrice2: top 3 khối lượng mua tốt nhất
  B1: 0, // bidPrice1: top 3 giá mua tốt nhất
  V1: 0, // volPrice1: top 3 khối lượng mua tốt nhất
  CP: 0, // closePrice: giá khớp cuối
  CV: 0, // closeVol: khối lượng khớp cuối
  CH: 0, // Change: thay đổi so với giá tham chiếu
  CHP: 0, // changePercent: phần trăm thay đổi so với giá tham chiếu
  S1: 0, // offerPrice1: top 3 giá bán tốt nhất
  U1: 0, // offerVol1 top 3 khối lượng bán tốt nhất
  S2: 0, // offerPrice2: top 3 giá bán tốt nhất
  U2: 0, // offerVol2 top 3 khối lượng bán tốt nhất
  S3: 0, // offerPrice3: top 3 giá bán tốt nhất
  U3: 0, // offerVol3 top 3 khối lượng bán tốt nhất
  TT: 0, // totalTrading: tổng khổi lượng giao dịch
  TV: 0, // totalTradingValue: tổng giá trị giao dịch
  AP: 0, // averagePrice: giá trung binh
  OP: 0, // Open: giá mở cửa
  HI: 0, // High: giá cao nhất
  LO: 0, // Low: giá thấp nhất
  FB: 0, // foreignBuy: nước ngoài mua
  FS: 0, // foreignSell: nước ngoài bán
  FR: 0, // foreignRemain
  FO: 0, // foreignRoom: room nước ngoài
  TO: 0, // TOTAL_OFFER_QTTY
  TB: 0, // TOTAL_BID_QTTY
  PP: 0, // PRIOR_PRICE
  SS: "", // Status
  P1: "", // priceOne
  PMQ: 0, // PT_MATCH_QTTY: khối lượng khớp lệnh thỏa thuận
  PMP: 0, // PT_MATCH_PRICE: giá khớp lệnh thỏa thuận
  PTQ: 0, // PT_TOTAL_TRADED_QTTY: khối lượng giao dịch thỏa thuận
  PTV: 0, // PT_TOTAL_TRADED_VALUE: giá trị giao dịch thỏa thuận
  FC: "", // FloorCode
  P2: "", // priceTwo
  OI: "", // openInterest
  OIC: "", // openInterestChange
  FTD: "", // firstTradingDate
  LTD: "", // lastTradingDate
  ULS: "", // underlyingSymbol
  TSI: "", // tradingSessionID
  LS: "", // ListedShare
  CWT: "", // CoveredWarrantType
  EX: "", // Exchange: sàn giao dịch
  EP: "", // ExercisePrice
  ER: "", // ExerciseRatio
  IN: "", // IssuerName
  MD: "", // MaturityDate
};
