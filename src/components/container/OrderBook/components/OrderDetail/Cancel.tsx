import * as S from "./styles";
import { OrderInfo, PreCheckData } from "@interface/market";
import { useTranslations } from "next-intl";
import { formatNumber } from "@src/utils/helpers";
import { TSide, TTransactionStatus } from "@enum/common";
import { updateOrders } from "@src/redux/features/marketSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { use, useEffect, useState } from "react";
import RowContent from "@components/common/RowContent";
import OTPConfirm from "@components/common/OTPConfirm";
import dayjs from "dayjs";
import { usePrecheckOrder } from "@/src/services/hooks/order/usePrecheckOrder";
import { useUpdateOrder } from "@/src/services/hooks/order/useUpdateOrder";
import { UpdateOrderReq } from "@/src/constraints/interface/services/request";
import { AccInfo } from "@/src/constraints/interface/account";
import { toast } from "react-toastify";
import { errHandling } from "@/src/utils/error";
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
    onUpdateOrder,
    isError,
    isSuccess,
    data: uData,
    error,
  } = useUpdateOrder();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string>("");
  console.log(activeAccount);
  useEffect(() => {
    console.log("data", data);
    onPrecheckOrder({
      accountId: activeAccount?.id || "",
      instrument: data.symbol, // Mã chứng khoán
      qty: data.remainqtty,
      side: data.en_side,
      type: data.pricetype === "LO" ? "limit" : "market", // 'limit': Lệnh LO, 'market':Lệnh thị trường ATO, ATC,...
    });
  }, []);

  useEffect(() => {
    if (precheckIsError) {
      const errMsg = errHandling(precheckError);
      toast.error(errMsg);
      handleClose();
    }
  }, [precheckIsError, precheckError]);
  const handleRequestOTP = () => {
    console.log("handleRequestOTP");
  };
  console.log("precheckData", precheckData);
  const handleSubmit = () => {
    if (precheckData) {
      try {
        const ord: UpdateOrderReq = {
          accountId: activeAccount?.id || "",
          orderId: data?.rootorderid || "",
          tokenid: precheckData?.tokenid,
          transactionId: precheckData.transactionId,
          qty: data.remainqtty,
          code: otp,
        };
        onUpdateOrder(ord);
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
