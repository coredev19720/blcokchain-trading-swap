"use client";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import * as S from "./styles";
import { TOrderType, TSide } from "@enum/common";
import Search from "./components/Search";
import SymbolInfo from "./components/SymbolInfo";
import TicketInfo from "./components/TicketInfo";
import TicketConfirm from "./components/TicketConfirm";
import { lastSymLocalKey } from "@src/utils/helpers";
import { setSelectedStock, setTicket } from "@src/redux/features/marketSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import PageHeader from "../../common/PageHeader";
import { InsRTData, PortItem } from "@/src/constraints/interface/market";
import { socketCfg } from "@/src/constants/config";
import { usePrecheckOrder } from "@/src/services/hooks/order/usePrecheckOrder";
//@ts-ignore
import io from "socket.io-client";
import { usePreviousValue } from "@/src/hooks/usePrevious";
import { toast } from "react-toastify";
import { errHandling } from "@/src/utils/error";
import { useGetAvailTrade } from "@/src/services/hooks/useGetAvailTrade";
import { useGetInstrument } from "@/src/services/hooks/useGetInstrument";

const Trading = () => {
  const t = useTranslations("trade");
  const { ticket, selectedStock, stocks, ports } = useAppSelector(
    (state) => state.market
  );
  const { accountSummary, activeAccount, permissions } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const { onPrecheckOrder, isError, isSuccess, error, data } =
    usePrecheckOrder();
  const { data: stockData } = useGetInstrument(selectedStock?.symbol || "");
  const { data: availTrade, refetch: rfAvailTrade } = useGetAvailTrade(
    activeAccount?.id || "",
    selectedStock?.symbol || "",
    TSide.buy,
    ticket.price ? Number(ticket.price) * 1000 : 0
  );
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [socket, setSocket] = useState<io.Socket | null>(null);
  const [symbolPort, setSymbolPort] = useState<PortItem | null>(null);
  const [inst, setInst] = useState<InsRTData | null>(null);
  const prevSymbol = usePreviousValue(selectedStock?.symbol);
  const activePermission =
    activeAccount && permissions ? permissions[activeAccount.id] : null;
  const maxVol =
    ticket?.side === TSide.sell
      ? symbolPort?.trade || 0
      : availTrade?.maxqtty || 0;
  useEffect(() => {
    initTicker();
  }, [stocks]);
  useEffect(() => {
    if (ticket) {
      console.log("ports", ports);
      const port = ports.find((p) => p.symbol === ticket?.symbol);
      setSymbolPort(port || null);
    }
  }, [ticket]);
  useEffect(() => {
    ticket?.side === TSide.buy && rfAvailTrade();
  }, [ticket.price, ticket.symbol]);

  useEffect(() => {
    handleChangeStock();
  }, [selectedStock]);
  useEffect(() => {
    console.log("stockData", stockData);
  }, [stockData]);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL || "";
    const skt: io.Socket = io(url, {
      transports: socketCfg.transport,
      path: socketCfg.path,
      query: {
        __sails_io_sdk_version: socketCfg.version,
        __sails_io_sdk_platform: socketCfg.platform,
        __sails_io_sdk_language: socketCfg.lang,
      },
    });
    setSocket(skt);
    skt.on("connect", connect);
    skt.on("disconnect", () => console.log("Disconnected from the server"));
    // skt.on("connection", symbolSub(skt, "HCM"));
    skt.on("i", (data: any) => {
      if (data.d[0]) {
        handleIEvent(data.d[0]);
      }
    });
    return () => {
      if (skt) {
        skt.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isError && error) {
      const errMsg = errHandling(error);
      toast.error(errMsg);
    }
  }, [isError, error]);
  useEffect(() => {
    if (isSuccess) {
      setIsConfirm(true);
    }
  }, [isSuccess]);

  const connect = () => {
    console.log("Connected to the server");
  };

  const symbolSub = (socket: io.Socket, symbol: string) => {
    socket.emit("get", {
      data: {
        args: [`i:${symbol}`],
        op: "subscribe",
      },
      method: "get",
      url: socketCfg.subscribePath,
    });
  };

  const symbolUnsub = (socket: io.Socket, symbol: string) => {
    socket.emit("get", {
      data: {
        args: [`i:${symbol}`],
        op: "unsubscribe",
      },
      method: "get",
      url: socketCfg.subscribePath,
    });
  };

  const handleIEvent = (data: any) => {
    setInst((prev) => ({ ...prev, ...data }));
  };

  const initTicker = () => {
    if (selectedStock) return;
    const lastSymbol = localStorage.getItem(lastSymLocalKey);
    const stock = lastSymbol
      ? stocks.find((t) => t.symbol === lastSymbol.toUpperCase())
      : null;
    if (stock) {
      dispatch(setSelectedStock(stock));
      dispatch(
        setTicket({
          ...ticket,
          symbol: stock.symbol,
          price: "0",
          side: TSide.buy,
        })
      );
    }
  };
  const handleClickTrade = () => {
    if (
      !selectedStock ||
      !ticket.price ||
      !ticket.vol ||
      !activeAccount ||
      !activePermission
    )
      return;
    onPrecheckOrder({
      accountId: activeAccount.id || "",
      instrument: ticket.symbol,
      qty: ticket.vol,
      side: ticket.side,
      type: ticket.type === TOrderType.LO ? "limit" : "market",
      limitPrice: Number(ticket.price) * 1000,
      authtype: activePermission.ORDINPUT[0],
    });
  };

  const handleChangeStock = () => {
    if (selectedStock && socket) {
      symbolSub(socket, selectedStock.symbol);
    }
    if (prevSymbol && prevSymbol !== selectedStock?.symbol && socket) {
      symbolUnsub(socket, prevSymbol);
      setInst(null);
    }
  };
  const btnDisabled =
    !stockData ||
    !ticket.price ||
    !ticket.vol ||
    !activeAccount ||
    !activePermission;
  return (
    <S.Wrapper>
      <PageHeader title={t("fn_trade_txt_title")} />
      <S.Content>
        <S.MainContent>
          <Search />
          <SymbolInfo inst={inst} maxVol={maxVol} />
          <TicketInfo inst={inst} maxVol={maxVol} />
          {/* Trạng thái tiểu khoản */}
          <S.AccStatus>
            <Typography variant="body2">
              {t("fn_trade_txt_accStatus")}
            </Typography>
            <Typography color="text.success" variant="body2">
              {accountSummary && activeAccount
                ? accountSummary[activeAccount.id]?.afstatus_en
                : ""}
            </Typography>
          </S.AccStatus>
        </S.MainContent>
        <S.ButtonWrapper>
          <Button
            disabled={btnDisabled}
            fullWidth
            variant="contained"
            color={ticket.side === TSide.buy ? "success" : "error"}
            onClick={handleClickTrade}
            size="large"
          >
            {t(
              ticket.side === TSide.buy
                ? "fn_trade_cta_buy"
                : "fn_trade_cta_sell"
            )}
          </Button>
        </S.ButtonWrapper>
      </S.Content>
      <TicketConfirm
        open={isConfirm}
        setOpen={setIsConfirm}
        precheckData={data ? data : null}
      />
    </S.Wrapper>
  );
};
export default Trading;
