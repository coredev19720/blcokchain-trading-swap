import * as S from "./styles";
import { FlexContent } from "@src/styles/common";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { OrderInfo } from "@interface/market";
import { TOrderActionType, TSide } from "@enum/common";
import colors from "@src/themes/colors";
import { formatNumber } from "@src/utils/helpers";
interface IProps {
  data: OrderInfo;
  handleClick: (order: OrderInfo, type: TOrderActionType) => void;
}
const Order = ({ data, handleClick }: IProps) => {
  const t = useTranslations("order_book");
  const tTrade = useTranslations("trade");
  return (
    <S.Wrapper>
      <S.Content>
        <FlexContent>
          <Typography variant="h5" fontWeight={600}>
            {data.symbol}
          </Typography>
          <S.TicketSide side={data.en_side}>
            <Typography
              variant="body2"
              color={
                data.en_side === TSide.buy
                  ? colors.lightUpText
                  : colors.lightDownText
              }
              style={{ textTransform: "capitalize" }}
            >
              {tTrade(
                data.en_side === TSide.buy
                  ? "txt_trade_confirm_buy"
                  : "txt_trade_confirm_sell"
              )}
            </Typography>
          </S.TicketSide>
        </FlexContent>
        <S.StatusBar fillPct={(data.remainqtty / data.qtty) * 100} />
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("fn_ob_txt_qtyProgress")}
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {`${formatNumber(data.qtty)} / ${formatNumber(data.remainqtty)}`}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_status")}
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {data.en_status}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_price")}
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {(data.price / 1000).toFixed(2)}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_value")}
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {formatNumber(data ? data.qtty * data.price : 0)}
          </Typography>
        </FlexContent>
      </S.Content>
      <S.Actions>
        <S.Action
          disabled={data.allowcancel !== "Y"}
          color="error"
          variant="contained"
          fullWidth
          onClick={() => handleClick(data, TOrderActionType.cancel)}
        >
          {t("fn_ob_cta_cancel")}
        </S.Action>
        <S.Action
          disabled={data.allowamend !== "Y"}
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => handleClick(data, TOrderActionType.update)}
        >
          {t("fn_ob_cta_edit")}
        </S.Action>
        <S.Action
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => handleClick(data, TOrderActionType.detail)}
        >
          {t("fn_ob_cta_detail")}
        </S.Action>
      </S.Actions>
    </S.Wrapper>
  );
};
export default Order;
