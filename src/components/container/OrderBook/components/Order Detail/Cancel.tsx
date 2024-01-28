import { FlexContent } from "@/src/styles/common";
import * as S from "./styles";
import { Typography } from "@mui/material";
import { IOrder } from "@/src/interface/common";
import { useTranslations } from "next-intl";
import { formatNumber } from "@/src/utils/helpers";
import OTPConfirm from "@/src/components/common/OTPConfirm";
import { TTransactionStatus } from "@/src/enum";
import { updateOrders } from "@/src/redux/features/marketSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useState } from "react";

interface IProps {
  data: IOrder | null;
  handleClose: () => void;
}
const Cancel = ({ data, handleClose }: IProps) => {
  const t = useTranslations("order_book");
  const order = useAppSelector((state) => state.market.order);
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string>("");
  const handleRequestOTP = () => {
    console.log("handleRequestOTP");
  };
  const handleSubmit = () => {
    if (order) {
      try {
        const ord: IOrder = {
          ...order,
          status: TTransactionStatus.canceled,
        };
        dispatch(updateOrders(ord));
      } catch (e) {
        console.log(e);
      } finally {
        handleClose();
      }
    }
  };
  const handleChangeOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
  };
  return (
    <>
      <S.Content>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_type")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {data?.type}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("fn_ob_txt_qtyProgress")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {`${data?.execQty} / ${data?.vol}`}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_price")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {formatNumber(data?.price || 0)}
          </Typography>
        </FlexContent>
        <OTPConfirm
          handleRequest={handleRequestOTP}
          handleChangeOTP={handleChangeOTP}
          otp={otp}
        />
      </S.Content>
      <S.Actions>
        <S.Action
          color="primary"
          variant="contained"
          fullWidth
          disabled={!order || otp.length !== 6}
          onClick={handleSubmit}
        >
          Xác nhận
        </S.Action>
      </S.Actions>
    </>
  );
};
export default Cancel;
