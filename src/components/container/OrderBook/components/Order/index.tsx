import * as S from "./styles";
import { FlexContent } from "@src/styles/common";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { IOrder } from "@interface/common";
import { TOrderActionType, TSide } from "@enum/common";
import colors from "@src/themes/colors";
import { formatNumber } from "@src/utils/helpers";
interface IProps {
  data: IOrder;
  handleClick: (order: IOrder, type: TOrderActionType) => void;
}
const Order = ({ data, handleClick }: IProps) => {
  const t = useTranslations("order_book");
  const tTrade = useTranslations("trade");
  return (
    <S.Wrapper>
      <S.Content>
        <FlexContent>
          <Typography variant="h5" fontWeight={600} color="text.primary">
            {data.symbol}
          </Typography>
          <S.TicketSide side={data.side}>
            <Typography
              variant="body2"
              color={
                data.side === TSide.BUY
                  ? colors.lightUpText
                  : colors.lightDownText
              }
              style={{ textTransform: "capitalize" }}
            >
              {tTrade(
                data.side === TSide.BUY
                  ? "txt_trade_confirm_buy"
                  : "txt_trade_confirm_sell"
              )}
            </Typography>
          </S.TicketSide>
        </FlexContent>
        <S.StatusBar fillPct={(data.execQty / data.vol) * 100} />
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("fn_ob_txt_qtyProgress")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {`${data.execQty} / ${data.vol}`}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_status")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {data.status}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_price")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {data.price}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_value")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {formatNumber(data ? data.vol * data.price : 0)}
          </Typography>
        </FlexContent>
      </S.Content>
      <S.Actions>
        <S.Action
          color="error"
          variant="contained"
          fullWidth
          onClick={() => handleClick(data, TOrderActionType.cancel)}
        >
          {t("fn_ob_cta_cancel")}
        </S.Action>
        <S.Action
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
