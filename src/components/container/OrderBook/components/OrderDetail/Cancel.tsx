import * as S from "./styles";
import { OrderInfo } from "@interface/market";
import { useTranslations } from "next-intl";
import { formatNumber, genOTPLenth } from "@src/utils/helpers";
import { TOrderEnSide, TSide } from "@enum/common";
import { use, useEffect, useState } from "react";
import RowContent from "@components/common/RowContent";
import OTPConfirm from "@components/common/OTPConfirm";
import dayjs from "dayjs";
import { usePrecheckOrder, useCancelOrder } from "@/src/services/hooks";
import { CancelOrderReq } from "@/src/constraints/interface/services/request";
import {
  AccInfo,
  AccPermissions,
  AccVerifyInfo,
} from "@/src/constraints/interface/account";
import { toast } from "react-toastify";
import { errHandling } from "@/src/utils/error";
import { useQueryClient } from "@tanstack/react-query";
interface IProps {
  data: OrderInfo;
  handleClose: () => void;
  activeAccount: AccInfo | null;
  activePermission: AccPermissions | null;
  verifyInfo: AccVerifyInfo | null;
}
const Cancel = ({
  data,
  handleClose,
  activeAccount,
  activePermission,
  verifyInfo,
}: IProps) => {
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
  const [isSaveVerify, setIsSaveVerify] = useState<boolean>(false);
  useEffect(() => {
    onPrecheckOrder({
      accountId: activeAccount?.id ?? "",
      instrument: data.symbol, // Mã chứng khoán
      qty: data.remainqtty,
      side: data.en_side === TOrderEnSide.Buy ? TSide.buy : TSide.sell,
      type: data.pricetype === "LO" ? "limit" : "market", // 'limit': Lệnh LO, 'market':Lệnh thị trường ATO, ATC,...
      limitPrice: data.price,
    });
  }, []);
  useEffect(() => {
    if (verifyInfo) {
      setIsSaveVerify(!!verifyInfo.isVerified);
    }
  }, [verifyInfo]);
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
          accountId: activeAccount?.id ?? "",
          orderId: data?.rootorderid ?? "",
          tokenid: precheckData?.tokenid,
          transactionId: precheckData.transactionId,
          ...(!verifyInfo?.isVerified && { code: otp }),
          isSaveVerify,
        };
        onCancelOrder(ord);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleChangeOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= genOTPLenth(activePermission?.ORDINPUT[0])) {
      setOtp(e.target.value);
    }
  };
  const handleCheckBox = (val: boolean) => {
    setIsSaveVerify(val);
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
        {!verifyInfo?.isVerified && (
          <OTPConfirm
            handleRequest={handleRequestOTP}
            handleChangeOTP={handleChangeOTP}
            otp={otp}
            type={activePermission?.ORDINPUT[0]}
            genSuccess={precheckIsSuccess}
            handleCheckBox={handleCheckBox}
          />
        )}
        <S.Action
          size="large"
          color="primary"
          variant="contained"
          fullWidth
          disabled={!otp.length && !verifyInfo?.isVerified}
          onClick={handleSubmit}
        >
          {t("fn_ob_cta_confirm")}
        </S.Action>
      </S.Actions>
    </>
  );
};
export default Cancel;
