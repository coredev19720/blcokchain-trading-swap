import * as S from "./styles";
import { Backdrop, Slide, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { TSide } from "@/src/enum";
import { useTranslations } from "next-intl";
import colors from "@/src/themes/colors";
import { formatNumber } from "@/src/utils/helpers";
import OtpConfirm from "./components/OtpConfirm";
interface IProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}
const TicketConfirm = ({ open, setOpen }: IProps) => {
  const t = useTranslations("trade");
  const ticket = useAppSelector((state) => state.market.ticket);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    console.log("ticket", ticket);
    setOpen(false);
  };
  return (
    <Backdrop open={open}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <S.Wrapper>
          <S.TicketInfo>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {`Duyệt lệnh ${ticket.side === TSide.BUY ? "mua" : "bán"}`}
            </Typography>
            <S.Block>
              <S.FlexContent>
                <Typography variant="h4" fontWeight={600}>
                  {ticket.ticker}
                </Typography>
                <S.TicketSide side={ticket.side}>
                  <Typography
                    variant="body2"
                    color={
                      ticket.side === TSide.BUY ? colors.sg40 : colors.sr40
                    }
                    style={{ textTransform: "capitalize" }}
                  >
                    {t(
                      ticket.side === TSide.BUY
                        ? "txt_trade_confirm_buy"
                        : "txt_trade_confirm_sell"
                    )}
                  </Typography>
                </S.TicketSide>
              </S.FlexContent>
            </S.Block>
            <S.Block>
              <S.FlexContent>
                {/* not trans */}
                <Typography variant="body2" color="text.secondary">
                  Loại lệnh
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {ticket.type}
                </Typography>
              </S.FlexContent>
              <S.FlexContent>
                {/* not trans */}
                <Typography variant="body2" color="text.secondary">
                  Khối lượng đặt
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {ticket.vol}
                </Typography>
              </S.FlexContent>
              <S.FlexContent>
                {/* not trans */}
                <Typography variant="body2" color="text.secondary">
                  Giá đặt
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {ticket.price}
                </Typography>
              </S.FlexContent>
              <S.FlexContent>
                {/* not trans */}
                <Typography variant="body2" color="text.secondary">
                  Giá trị dự kiến
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                >
                  {formatNumber(ticket.price * ticket.vol)}
                </Typography>
              </S.FlexContent>
            </S.Block>
            <S.FlexContent>
              {/* not trans */}
              <Typography variant="body2" color="text.secondary">
                {t("en_trade_custodyCd")}
              </Typography>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                mapping
              </Typography>
            </S.FlexContent>
            <S.FlexContent>
              {/* not trans */}
              <Typography variant="body2" color="text.secondary">
                {t("en_trade_accNo")}
              </Typography>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                mapping
              </Typography>
            </S.FlexContent>
          </S.TicketInfo>
          <OtpConfirm />
        </S.Wrapper>
      </Slide>
    </Backdrop>
  );
};

export default TicketConfirm;
