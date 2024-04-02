import * as S from "./styles";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@src/redux/hooks";
import { TSide } from "@enum/common";
import FieldLabel from "@components/common/FieldLabel";
import StyledTable from "@components/common/StyledTable";
import { IColumn } from "@interface/table";
import { IBestDeal } from "@interface/common";
import {
  formatBigNumber,
  formatNumber,
  genPriceColor,
} from "@src/utils/helpers";
import { InsRTData } from "@/src/constraints/interface/market";
interface IProps {
  instrument: InsRTData;
}
const SymbolInfo = ({ instrument }: IProps) => {
  const ticket = useAppSelector((state) => state.market.ticket);
  const t = useTranslations("trade");
  const columns: IColumn[] = [
    {
      title: t("fn_trade_sb_best_buyQty"),
      render: (row: IBestDeal) => (
        <Typography variant="body2">{formatBigNumber(row.buyVol)}</Typography>
      ),
      align: "center",
    },
    {
      title: t("fn_trade_sb_best_buyPrice"),
      render: (row: IBestDeal) => (
        <Typography
          fontWeight={600}
          variant="body2"
          color={genPriceColor(
            instrument.RE,
            row.price,
            instrument.CL,
            instrument.FL
          )}
        >
          {row.price}
        </Typography>
      ),
      align: "center",
    },
    {
      title: t("fn_trade_sb_best_sellPrice"),
      render: (row: IBestDeal) => (
        <Typography
          variant="body2"
          fontWeight={600}
          color={genPriceColor(
            instrument.RE,
            row.price,
            instrument.CL,
            instrument.FL
          )}
        >
          {row.price}
        </Typography>
      ),
      align: "center",
    },
    {
      title: t("fn_trade_sb_best_sellQty"),
      render: (row: IBestDeal) => (
        <Typography variant="body2">{formatBigNumber(row.sellVol)}</Typography>
      ),
      align: "center",
    },
  ];
  return (
    <S.Wrapper>
      {/* buying */}
      {/* {ticket.side === TSide.SELL && (
        <S.PowerBuying>
          <Typography variant="body2">{t("fn_trade_txt_can_sell")}</Typography>
          <Typography fontWeight={700} variant="body2">
            0
          </Typography>
        </S.PowerBuying>
      )} */}
      {/* Price info */}
      <S.PriceInfo>
        <S.PriceBlock>
          <FieldLabel>{t("en_sb_price_floor")}</FieldLabel>
          <Typography color="text.floor" variant="body2" fontWeight={600}>
            {formatNumber(instrument.FL || 0)}
          </Typography>
        </S.PriceBlock>
        <S.PriceBlock>
          <FieldLabel>{t("en_sb_price_avg")}</FieldLabel>
          <Typography variant="body2" fontWeight={600}>
            {formatNumber(instrument?.AP || 0)}
          </Typography>
        </S.PriceBlock>
        <S.PriceBlock>
          <FieldLabel>{t("en_sb_price_celling")}</FieldLabel>
          <Typography color="text.ceil" variant="body2" fontWeight={600}>
            {formatNumber(instrument?.CL || 0)}
          </Typography>
        </S.PriceBlock>
      </S.PriceInfo>

      {/* Deals */}
      {/* {ticker && (
        <StyledTable columns={columns} dataSource={instrument.marketDepth.deals} />
      )} */}
    </S.Wrapper>
  );
};
export default SymbolInfo;
