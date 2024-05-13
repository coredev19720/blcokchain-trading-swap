import * as S from "./styles";
import { FlexContent, SlideLine } from "@src/styles/common";
import { Backdrop, Slide, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { OrderInfo } from "@interface/market";
import { TOrderActionType, TOrderEnSide } from "@enum/common";
import colors from "@src/themes/colors";
import Detail from "./Detail";
import Cancel from "./Cancel";
import Update from "./Update";
import { useEffect, useState } from "react";
import { handleSlideDown } from "@src/utils/behaviors";
import {
  AccInfo,
  AccPermissions,
  AccVerifyInfo,
} from "@/src/constraints/interface/account";
interface IProps {
  data: OrderInfo;
  type: TOrderActionType;
  handleClose: () => void;
  activeAccount: AccInfo | null;
  activePermission: AccPermissions | null;
  verifyInfo: AccVerifyInfo | null;
}
const OrderDetail = ({
  data,
  type,
  handleClose,
  activeAccount,
  activePermission,
  verifyInfo,
}: IProps) => {
  const tTrade = useTranslations("trade");
  //unimplemented
  const title = {
    cancel: "Lệnh hủy",
    detail: "Chi tiết lệnh",
    update: "Sửa lệnh",
  };
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    handleSlideDown({
      setStartY,
      setCurrentY,
      setIsSliding,
      handleClose,
      isSliding,
      currentY,
      startY,
    });
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
          <Typography fontWeight={600} variant="h5">
            {title[type]}
          </Typography>
          <S.Content>
            <FlexContent>
              <Typography variant="h5" fontWeight={600}>
                {data?.symbol}
              </Typography>
              <S.TicketSide side={data?.en_side}>
                <Typography
                  variant="body2"
                  color={
                    data?.en_side === TOrderEnSide.Buy
                      ? colors.lightUpText
                      : colors.lightDownText
                  }
                  style={{ textTransform: "capitalize" }}
                >
                  {tTrade(
                    data?.en_side === TOrderEnSide.Buy
                      ? "txt_trade_confirm_buy"
                      : "txt_trade_confirm_sell"
                  )}
                </Typography>
              </S.TicketSide>
            </FlexContent>
          </S.Content>
          {type === TOrderActionType.detail && <Detail data={data} />}
          {type === TOrderActionType.cancel && (
            <Cancel
              data={data}
              handleClose={handleClose}
              activeAccount={activeAccount}
              activePermission={activePermission}
              verifyInfo={verifyInfo}
            />
          )}
          {type === TOrderActionType.update && (
            <Update
              data={data}
              handleClose={handleClose}
              activeAccount={activeAccount}
              activePermission={activePermission}
              verifyInfo={verifyInfo}
            />
          )}
        </S.Wrapper>
      </Slide>
    </Backdrop>
  );
};
export default OrderDetail;
