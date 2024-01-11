import FieldLabel from "@/src/components/common/FieldLabel";
import StyledTable from "@/src/components/common/StyledTable";
import { IMarketDepth } from "@/src/interface/common";
import { IColumn } from "@/src/interface/table";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
}));
const BestDeal = styled("div")(() => ({}));
const HistoryDeals = styled("div")(() => ({}));
interface IProps {
  data: IMarketDepth;
}
const MarketDepth = ({ data }: IProps) => {
  const t = useTranslations("dashboard");
  const bestDealCols: IColumn[] = [
    {
      title: t("en_sb_best_price"),
      dataIndex: "price",
      key: "price",
      align: "left",
      width: 100,
    },
    {
      title: t("en_sb_best_buyQty"),
      dataIndex: "buyAmount",
      key: "amount",
      align: "right",
    },
    {
      title: t("en_sb_best_sellQty"),
      dataIndex: "sellAmount",
      key: "amount",
      align: "right",
    },
  ];

  const historyDealsCols: IColumn[] = [
    {
      title: t("en_sb_match_time"),
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: t("en_sb_match_price"),
      dataIndex: "price",
      key: "price",
      align: "right",
    },
    {
      title: t("en_sb_match_qty"),
      dataIndex: "volumn",
      key: "amount",
      align: "right",
    },
    {
      title: "",
      dataIndex: "side",
      key: "side",
      align: "center",
    },
  ];
  return (
    <Wrapper>
      <BestDeal>
        <FieldLabel>{t("fn_symbol_txt_bestQuote")}</FieldLabel>
        <StyledTable columns={bestDealCols} dataSource={data.deals} />
      </BestDeal>
      <HistoryDeals>
        <FieldLabel>{t("fn_symbol_txt_ordHist")}</FieldLabel>
        <StyledTable
          columns={historyDealsCols}
          dataSource={data.historyDeals}
        />
      </HistoryDeals>
    </Wrapper>
  );
};
export default MarketDepth;
