import * as S from "./styles";
import { FlexContent } from "@/src/styles/common";
import {
  Backdrop,
  Button,
  SelectChangeEvent,
  Slide,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import dayjs from "dayjs";
import { IOrder } from "@/src/interface/common";
import { TOrderActionType, TSide } from "@/src/enum";
import colors from "@/src/themes/colors";
import { formatNumber } from "@/src/utils/helpers";
interface IProps {
  data: IOrder | null;
  type: TOrderActionType;
  handleClose: () => void;
}
const OrderDetail = ({ data, type, handleClose }: IProps) => {
  const t = useTranslations("order_book");
  const tTrade = useTranslations("trade");
  console.log(data);
  return (
    <Backdrop open={!!data}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        {data ? (
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
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {`${data.execQty} / ${data.vol}`}
                </Typography>
              </FlexContent>
              <FlexContent>
                <Typography variant="body2" color="text.secondary">
                  {t("en_ord_order_status")}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {data.status}
                </Typography>
              </FlexContent>
              <FlexContent>
                <Typography variant="body2" color="text.secondary">
                  {t("en_ord_order_price")}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {data.price}
                </Typography>
              </FlexContent>
              <FlexContent>
                <Typography variant="body2" color="text.secondary">
                  {t("en_ord_order_value")}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {formatNumber(data.totalValue)}
                </Typography>
              </FlexContent>
            </S.Content>
            <S.Actions>
              <S.Action
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleClose}
              >
                Đóng
              </S.Action>
            </S.Actions>
          </S.Wrapper>
        ) : (
          <></>
        )}
      </Slide>
    </Backdrop>
  );
};
export default OrderDetail;
