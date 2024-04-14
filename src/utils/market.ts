import { InsRTData, Instrument } from "../constraints/interface/market";

export const stockMappingRTData = (stock: Instrument): InsRTData => {
  return {
    Id: "", // identify
    SB: stock.symbol, // Symbol: Mã chứng khoán
    SI: "", // StockId
    FN: stock.FullName, // FullName: Tên mã
    TD: "", // Tradingdate: ngày giao dịch
    ST: "", // StockType
    CL: stock.ceiling, // Ceiling: giá trần
    FL: stock.floor, // Floor: giá sàn
    RE: stock.reference, // Reference: giá tham chiếu
    B3: stock.bidPrice3, // bidPrice3: top 3 giá mua tốt nhất
    V3: stock.bidVol3, // volPrice3: top 3 khối lượng mua tốt nhất
    B2: stock.bidPrice2, // bidPrice2: top 3 giá mua tốt nhất
    V2: stock.bidVol2, // volPrice2: top 3 khối lượng mua tốt nhất
    B1: stock.bidPrice1, // bidPrice1: top 3 giá mua tốt nhất
    V1: stock.bidVol1, // volPrice1: top 3 khối lượng mua tốt nhất
    CP: stock.closePrice, // closePrice: giá khớp cuối
    CV: stock.closeVol, // closeVol: khối lượng khớp cuối
    CH: stock.change, // Change: thay đổi so với giá tham chiếu
    CHP: stock.changePercent, // changePercent: phần trăm thay đổi so với giá tham chiếu
    S1: stock.offerPrice1, // offerPrice1: top 3 giá bán tốt nhất
    U1: stock.offerVol1, // offerVol1 top 3 khối lượng bán tốt nhất
    S2: stock.offerPrice2, // offerPrice2: top 3 giá bán tốt nhất
    U2: stock.offerVol2, // offerVol2 top 3 khối lượng bán tốt nhất
    S3: stock.offerPrice3, // offerPrice3: top 3 giá bán tốt nhất
    U3: stock.offerVol3, // offerVol3 top 3 khối lượng bán tốt nhất
    TT: stock.totalTrading, // totalTrading: tổng khổi lượng giao dịch
    TV: stock.totalTradingValue, // totalTradingValue: tổng giá trị giao dịch
    AP: stock.averagePrice, // averagePrice: giá trung binh
    OP: stock.open, // Open: giá mở cửa
    HI: stock.high, // High: giá cao nhất
    LO: stock.low, // Low: giá thấp nhất
    FB: stock.foreignBuy, // foreignBuy: nước ngoài mua
    FS: stock.foreignSell, // foreignSell: nước ngoài bán
    FR: stock.foreignRemain, // foreignRemain
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
    EX: stock.exchange, // Exchange: sàn giao dịch
    EP: "", // ExercisePrice
    ER: "", // ExerciseRatio
    IN: "", // IssuerName
    MD: "", // MaturityDate
  };
};
