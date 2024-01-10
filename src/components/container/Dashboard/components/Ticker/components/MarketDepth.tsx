import FieldLabel from "@/src/components/common/FieldLabel";
import StyledTable from "@/src/components/common/StyledTable";
import { IMarketDepth } from "@/src/interface/common";
import { IColumn } from "@/src/interface/table";
import { styled } from "@mui/system";
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
  console.log(data);
  const bestDealCols: IColumn[] = [
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "left",
      width: 100,
    },
    {
      title: "KL.M",
      dataIndex: "buyAmount",
      key: "amount",
      align: "right",
    },
    {
      title: "KL.B",
      dataIndex: "sellAmount",
      key: "amount",
      align: "right",
    },
  ];

  const historyDealsCols: IColumn[] = [
    {
      title: "TG",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
    },
    {
      title: "KL",
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
        <FieldLabel></FieldLabel>
        <StyledTable columns={bestDealCols} dataSource={data.deals} />
      </BestDeal>
      <HistoryDeals>
        <FieldLabel></FieldLabel>
        <StyledTable
          columns={historyDealsCols}
          dataSource={data.historyDeals}
        />
      </HistoryDeals>
    </Wrapper>
  );
};
export default MarketDepth;
