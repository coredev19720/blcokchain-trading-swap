import StyledTable from "@/src/components/common/StyledTable";
import { IColumn, IPortItem } from "@/src/interface/table";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { formatNumber, genChgTextClass } from "@/src/utils/helpers";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ArrowForwardIos } from "@mui/icons-material";
import { MuiIcon } from "@/src/styles/common";
import PortItemDetail from "../PortItemDetail";
import { setPort } from "@/src/redux/features/marketSlice";
import { useRouter } from "next/navigation";
const MarketDepth = () => {
  const t = useTranslations("portfolio");
  const router = useRouter();
  const ports = useAppSelector((state) => state.market.ports);
  const port = useAppSelector((state) => state.market.port);
  const dispatch = useAppDispatch();
  const genChgPct = (currentPrice: number, prevPrice: number) => {
    return (((currentPrice - prevPrice) / prevPrice) * 100).toFixed(2);
  };

  const handleClickItem = (item: IPortItem, idx: number) => {
    dispatch(setPort(item));
  };

  const handleClose = () => {
    dispatch(setPort(null));
  };
  const goToSymbol = (symbol: string) => {
    router.push(`/market?s=${symbol.toUpperCase()}`);
  };
  const columns: IColumn[] = [
    {
      title: t("sb_info_symbol"),
      render: (row: IPortItem) => (
        <Typography
          fontWeight={600}
          color="text.primary"
          onClick={() => {
            goToSymbol(row.symbol);
          }}
        >
          {row.symbol}
        </Typography>
      ),
      noClick: true,
    },
    {
      title: t("en_cu_stock_list_totalQty"),
      render: (row: IPortItem) => (
        <Typography variant="body2" color="text.primary">
          {formatNumber(row.qty)}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_cu_stock_list_valueKVND"),
      render: (row: IPortItem) => (
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {formatNumber(row.price * row.qty * 1000)}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_cu_stock_list_autoPL"),
      render: (row: IPortItem) => {
        const chgPct = genChgPct(row.marketPrice, row.price);
        return (
          <Typography variant="body2" color={genChgTextClass(Number(chgPct))}>
            {chgPct}%
          </Typography>
        );
      },
      align: "right",
    },
    {
      title: "",
      render: () => (
        <MuiIcon>
          <ArrowForwardIos />
        </MuiIcon>
      ),
      width: 24,
    },
  ];
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={ports}
        stickyHeader
        rowClick={handleClickItem}
      />
      <PortItemDetail data={port} handleClose={handleClose} />
    </>
  );
};
export default MarketDepth;