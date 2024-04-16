import StyledTable from "@components/common/StyledTable";
import { IColumn } from "@interface/table";
import { PortItem } from "@interface/market";
import { formatNumber, genChgTextClass } from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ArrowForwardIos } from "@mui/icons-material";
import { MuiIcon } from "@src/styles/common";
import PortItemDetail from "../PortItemDetail";
import { useRouter } from "next/navigation";

interface Props {
  ports: PortItem[];
  port: PortItem | null;
  setPort: (port: PortItem | null) => void;
  isShowPrice: boolean;
}
const DataTable = ({ ports, port, setPort, isShowPrice }: Props) => {
  const t = useTranslations("portfolio");
  const router = useRouter();
  const handleClickItem = (item: PortItem, idx: number) => {
    setPort(item);
  };

  const handleClose = () => {
    setPort(null);
  };
  const goToSymbol = (symbol: string) => {
    router.push(`market?s=${symbol.toUpperCase()}`);
  };

  const renderPrice = (row: PortItem) => {
    const { closeprice, basicPrice, costPriceAmt } = row;
    let price = costPriceAmt;
    if (isShowPrice) {
      price = closeprice !== "0" ? Number(closeprice) : basicPrice;
    }
    return (
      <Typography variant="body2" fontWeight={600}>
        {formatNumber(price)}
      </Typography>
    );
  };
  const columns: IColumn[] = [
    {
      title: t("sb_info_symbol"),
      dataIndex: "symbol",
      render: (row: PortItem) => (
        <Typography
          fontWeight={600}
          onClick={() => {
            goToSymbol(row.symbol);
          }}
        >
          {row.symbol}
        </Typography>
      ),
      noClick: true,
      isSort: true,
    },
    {
      title: t("en_cu_stock_list_totalQty"),
      dataIndex: "total",
      render: (row: PortItem) => (
        <Typography variant="body2">{formatNumber(row.total)}</Typography>
      ),
      align: "right",
      isSort: true,
    },
    {
      title: t("en_cu_stock_list_valueKVND"),
      dataIndex: "costPriceAmt",
      render: renderPrice,
      align: "right",
      isSort: true,
    },
    {
      title: t("en_cu_stock_list_autoPL"),
      dataIndex: "pnlrate",
      render: (row: PortItem) => {
        return (
          <Typography
            variant="body2"
            color={genChgTextClass(Number(row.pnlrate))}
          >
            {row.pnlrate}%
          </Typography>
        );
      },
      align: "right",
      isSort: true,
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
export default DataTable;
