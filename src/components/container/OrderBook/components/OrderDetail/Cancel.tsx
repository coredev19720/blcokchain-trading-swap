import * as S from "./styles";
import { OrderInfo } from "@interface/market";
import { useTranslations } from "next-intl";
import { formatNumber } from "@src/utils/helpers";
import { TSide } from "@enum/common";
import { useEffect, useState } from "react";
import RowContent from "@components/common/RowContent";
import OTPConfirm from "@components/common/OTPConfirm";
import dayjs from "dayjs";
import { usePrecheckOrder } from "@/src/services/hooks/order/usePrecheckOrder";
import { CancelOrderReq } from "@/src/constraints/interface/services/request";
import { AccInfo } from "@/src/constraints/interface/account";
import { toast } from "react-toastify";
import { errHandling } from "@/src/utils/error";
import { useCancelOrder } from "@/src/services/hooks/order/useCancelOrder";
import { useQueryClient } from "@tanstack/react-query";
interface IProps {
  data: OrderInfo;
  handleClose: () => void;
  activeAccount: AccInfo | null;
}
const Cancel = ({ data, handleClose, activeAccount }: IProps) => {
  const t = useTranslations("order_book");
  const {
    onPrecheckOrder,
    isError: precheckIsError,
    isSuccess: precheckIsSuccess,
    data: precheckData,
    error: precheckError,
  } = usePrecheckOrder();
  const {
    onCancelOrder,
    isError,
    isSuccess: cancelSuccess,
    error,
  } = useCancelOrder();
  const queryClient = useQueryClient();
  const [otp, setOtp] = useState<string>("");
  useEffect(() => {
    onPrecheckOrder({
      accountId: activeAccount?.id || "",
      instrument: data.symbol, // Mã chứng khoán
      qty: data.remainqtty,
      //fix me uncomment this code
      // side: data.en_side,
      side: data.en_side === TSide.buy ? "buy" : "sell",
      type: data.pricetype === "LO" ? "limit" : "market", // 'limit': Lệnh LO, 'market':Lệnh thị trường ATO, ATC,...
      limitPrice: data.price,
    });
  }, []);
  useEffect(() => {
    if (cancelSuccess) {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      handleClose();
    }
  }, [cancelSuccess]);
  useEffect(() => {
    if (precheckIsError) {
      const errMsg = errHandling(precheckError);
      toast.error(errMsg);
      handleClose();
    }
  }, [precheckIsError, precheckError]);

  useEffect(() => {
    if (isError) {
      const errMsg = errHandling(error);
      toast.error(errMsg);
    }
  }, [isError, error]);
  const handleRequestOTP = () => {
    console.log("handleRequestOTP");
  };
  const handleSubmit = () => {
    if (precheckData) {
      try {
        const ord: CancelOrderReq = {
          accountId: activeAccount?.id || "",
          orderId: data?.rootorderid || "",
          tokenid: precheckData?.tokenid,
          transactionId: precheckData.transactionId,
          code: otp,
        };
        onCancelOrder(ord);
      } catch (e) {
        console.log(e);
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
        <RowContent
          leftTxt={t("en_ord_order_type")}
          rightTxt={data?.pricetype}
        />
        <RowContent
          leftTxt={t("fn_ob_txt_qtyProgress")}
          rightTxt={`${data?.execqtty} / ${data?.qtty}`}
        />
        <RowContent
          leftTxt={t("en_ord_order_price")}
          rightTxt={formatNumber(data?.price || 0)}
        />
      </S.Content>
      <RowContent
        leftTxt={t("en_ord_order_custodyCd")}
        rightTxt={data?.custodycd}
        isChild
      />
      <RowContent
        leftTxt={t("en_ord_order_accNo")}
        rightTxt={data?.afacctno}
        isChild
      />
      <RowContent
        leftTxt={t("en_ord_order_timestamp")}
        rightTxt={
          data?.odtimestamp
            ? dayjs(data.odtimestamp).format("YYYY-MM-DD HH:mm:ss")
            : "-"
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
          disabled={otp.length !== 6}
          onClick={handleSubmit}
        >
          {t("fn_ob_cta_confirm")}
        </S.Action>
      </S.Actions>
    </>
  );
};
export default Cancel;
