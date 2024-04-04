import { useState } from "react";
import * as S from "./styles";
import { FlexContent } from "@src/styles/common";
import { Backdrop, Button, Slide, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { TSide } from "@enum/common";
import { useTranslations } from "next-intl";
import colors from "@src/themes/colors";
import { formatNumber } from "@src/utils/helpers";
import OTPConfirm from "@components/common/OTPConfirm";
import { useRouter } from "next/navigation";
interface IProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}
const TicketConfirm = ({ open, setOpen }: IProps) => {
  const t = useTranslations("trade");
  const { ticket } = useAppSelector((state) => state.market);
  const { activeAccount, permissions } = useAppSelector((state) => state.user);
  console.log(activeAccount);
  console.log("permissions", permissions);
  const activePermission =
    activeAccount && permissions ? permissions[activeAccount.custodycd] : null;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [otp, setOTP] = useState<string>("");
  const handleChangeOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 6) {
      setOTP(e.target.value);
    }
  };
  const handleRequestOTP = () => {
    console.log("handleRequestOTP");
  };
  const handleSubmit = () => {
    try {
      //unimplemented
      router.push("order-book");
    } catch (e) {
      console.log(e);
    } finally {
      setOpen(false);
    }
  };
  return (
    <Backdrop open={open} onClick={() => setOpen(false)}>
      <Slide
        direction="up"
        in={open}
        mountOnEnter
        unmountOnExit
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <S.Wrapper>
          <S.TicketInfo>
            <Typography variant="h5" fontWeight={600}>
              {ticket.side === TSide.buy
                ? t("fn_trade_txt_confirm_buy_title")
                : t("fn_trade_txt_confirm_sell_title")}
            </Typography>
            <S.Block>
              <FlexContent>
                <Typography variant="h4" fontWeight={600}>
                  {ticket.symbol}
                </Typography>
                <S.TicketSide side={ticket.side}>
                  <Typography
                    variant="body2"
                    color={
                      ticket.side === TSide.buy
                        ? colors.lightUpText
                        : colors.lightDownText
                    }
                    style={{ textTransform: "capitalize" }}
                  >
                    {t(
                      ticket.side === TSide.buy
                        ? "txt_trade_confirm_buy"
                        : "txt_trade_confirm_sell"
                    )}
                  </Typography>
                </S.TicketSide>
              </FlexContent>
            </S.Block>
            <S.Block>
              <FlexContent>
                <Typography variant="body2" color="text.secondary">
                  {t("fn_trade_txt_ord_type")}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {ticket.type}
                </Typography>
              </FlexContent>
              <FlexContent>
                <Typography variant="body2" color="text.secondary">
                  {t("fn_trade_txt_qty")}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {formatNumber(ticket.vol)}
                </Typography>
              </FlexContent>
              <FlexContent>
                <Typography variant="body2" color="text.secondary">
                  {t("fn_trade_txt_price")}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {formatNumber(Number(ticket.price) * 1000)}
                </Typography>
              </FlexContent>
              <FlexContent>
                <Typography variant="body2" color="text.secondary">
                  {t("fn_trade_txt_value")}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {formatNumber(Number(ticket.price) * 1000 * ticket.vol)}
                </Typography>
              </FlexContent>
            </S.Block>
            <FlexContent>
              <Typography variant="body2" color="text.secondary">
                {t("en_trade_custodyCd")}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {activeAccount?.custodycd}
              </Typography>
            </FlexContent>
            <FlexContent>
              <Typography variant="body2" color="text.secondary">
                {t("en_trade_accNo")}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {`${activeAccount?.custodycd} - ${activeAccount?.accounttype}`}
              </Typography>
            </FlexContent>
          </S.TicketInfo>
          <S.Actions>
            <OTPConfirm
              handleRequest={handleRequestOTP}
              handleChangeOTP={handleChangeOTP}
              otp={otp}
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              disabled={otp.length !== 6}
              onClick={handleSubmit}
              size="large"
            >
              {t("fn_trade_cta_confirm")}
            </Button>
          </S.Actions>
        </S.Wrapper>
      </Slide>
    </Backdrop>
  );
};

export default TicketConfirm;
