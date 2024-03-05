import * as S from "./styles";
import { FlexContent, SlideLine } from "@src/styles/common";
import { Backdrop, Slide, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { IOrder } from "@interface/common";
import { TOrderActionType, TSide } from "@enum/common";
import colors from "@src/themes/colors";
import Detail from "./Detail";
import Cancel from "./Cancel";
import Update from "./Update";
import { useEffect, useState } from "react";

interface IProps {
  data: IOrder | null;
  type: TOrderActionType;
  handleClose: () => void;
}
const OrderDetail = ({ data, type, handleClose }: IProps) => {
  const t = useTranslations("order_book");
  const tTrade = useTranslations("trade");
  const title = {
    cancel: "Lệnh hủy",
    detail: "Chi tiết lệnh",
    update: "Sửa lệnh",
  };
  const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const [isSliding, setIsSliding] = useState(false);
  useEffect(() => {
    const handleTouchStart = (e: any) => {
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
      setIsSliding(true);
    };

    const handleTouchMove = (e: any) => {
      if (!isSliding) return;
      setCurrentY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (!isSliding) return;

      setIsSliding(false);

      // Check if the slide-down gesture is significant
      if (currentY && startY) {
        const deltaY = currentY - startY;
        if (deltaY > 50) {
          handleClose();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isSliding, currentY, startY]);
  return (
    <Backdrop open={!!data} onClick={handleClose}>
      <Slide
        direction="up"
        in={!!data}
        mountOnEnter
        unmountOnExit
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <S.Wrapper>
          <SlideLine />
          <Typography fontWeight={600} variant="h5" color="text.primary">
            {title[type]}
          </Typography>
          <S.Content>
            <FlexContent>
              <Typography variant="h5" fontWeight={600} color="text.primary">
                {data?.symbol}
              </Typography>
              <S.TicketSide side={data?.side}>
                <Typography
                  variant="body2"
                  color={
                    data?.side === TSide.BUY
                      ? colors.lightUpText
                      : colors.lightDownText
                  }
                  style={{ textTransform: "capitalize" }}
                >
                  {tTrade(
                    data?.side === TSide.BUY
                      ? "txt_trade_confirm_buy"
                      : "txt_trade_confirm_sell"
                  )}
                </Typography>
              </S.TicketSide>
            </FlexContent>
          </S.Content>
          {type === "detail" && <Detail data={data} />}
          {type === "cancel" && (
            <Cancel data={data} handleClose={handleClose} />
          )}
          {type === "update" && (
            <Update data={data} handleClose={handleClose} />
          )}
        </S.Wrapper>
      </Slide>
    </Backdrop>
  );
};
export default OrderDetail;
