import * as S from "./styles";
import { IOrder } from "@interface/common";
import { useTranslations } from "next-intl";
import { formatNumber } from "@src/utils/helpers";
import OTPConfirm from "@components/common/OTPConfirm";
import RowContent from "@components/common/RowContent";
import { TTransactionStatus } from "@enum/common";
import { updateOrders } from "@src/redux/features/marketSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { useState } from "react";
import dayjs from "dayjs";
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
        // const ord: IOrder = {
        //   ...order,
        //   status: TTransactionStatus.canceled,
        // };
        // dispatch(updateOrders(ord));
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
        <RowContent leftTxt={t("en_ord_order_type")} rightTxt={data?.type} />
        <RowContent
          leftTxt={t("fn_ob_txt_qtyProgress")}
          rightTxt={`${data?.execQty} / ${data?.vol}`}
        />
        <RowContent
          leftTxt={t("en_ord_order_price")}
          rightTxt={formatNumber(data?.price || 0)}
        />
      </S.Content>
      <RowContent
        leftTxt={t("en_ord_order_custodyCd")}
        rightTxt={data?.code}
        isChild
      />
      <RowContent
        leftTxt={t("en_ord_order_accNo")}
        rightTxt={data?.accountNo}
        isChild
      />
      <RowContent
        leftTxt={t("en_ord_order_timestamp")}
        rightTxt={
          data?.time ? dayjs(data.time).format("YYYY-MM-DD HH:mm:ss") : "-"
        }
        isChild
      />
      <S.Actions>
        <OTPConfirm
          handleRequest={handleRequestOTP}
          handleChangeOTP={handleChangeOTP}
          otp={otp}
        />
        <S.Action
          color="primary"
          variant="contained"
          fullWidth
          disabled={!order || otp.length !== 6}
          onClick={handleSubmit}
        >
          {t("fn_ob_cta_confirm")}
        </S.Action>
      </S.Actions>
    </>
  );
};
export default Cancel;
