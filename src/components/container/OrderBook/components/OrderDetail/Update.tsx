import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

import { TextField } from "@mui/material";
import { OrderInfo } from "@interface/market";
import { formatNumber, genOTPLenth } from "@src/utils/helpers";
import {
  RowContent,
  FieldLabel,
  OTPConfirm,
  HelpText,
} from "@components/common";
import { FieldBlock } from "@src/styles/common";
import * as S from "./styles";
import { UpdateOrderReq } from "@/src/constraints/interface/services/request";
import {
  AccInfo,
  AccPermissions,
  AccVerifyInfo,
} from "@/src/constraints/interface/account";
import { TOrderEnSide, TSide } from "@/src/constraints/enum/common";
import {
  useUpdateOrder,
  useGetInstrument,
  usePrecheckOrder,
  useGenTwoFactorAuth,
} from "@/src/services/hooks";
import { toast } from "react-toastify";

interface IProps {
  data: OrderInfo | null;
  handleClose: () => void;
  activeAccount: AccInfo | null;
  activePermission: AccPermissions | null;
  verifyInfo: AccVerifyInfo | null;
}
const Update = ({
  data,
  handleClose,
  activeAccount,
  activePermission,
  verifyInfo,
}: IProps) => {
  const t = useTranslations("order_book");

  const { onGenTwoFactor, isSuccess: genTwoFactorSuccess } =
    useGenTwoFactorAuth();
  const {
    onUpdateOrder,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateOrder();
  const {
    onPrecheckOrder,
    data: precheckData,
    isSuccess: orderValid,
    isError: orderInvalid,
    error: orderError,
  } = usePrecheckOrder();
  const { data: symbolData } = useGetInstrument(data?.symbol ?? "");
  const [otp, setOtp] = useState<string>("");
  const [updatePrice, setUpdatePrice] = useState<string>(
    data?.price ? (data.price / 1000).toFixed(2) : "0"
  );
  const [isSaveVerify, setIsSaveVerify] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isSubmitWithoutOTP, setIsSubmitWithoutOTP] = useState<boolean>(false);
  useEffect(() => {
    if (orderValid) {
      setIsConfirm(true);
    }
  }, [orderValid]);
  useEffect(() => {
    onErr(orderError || updateError);
  }, [orderInvalid, isUpdateError]);

  useEffect(() => {
    if (verifyInfo) {
      setIsSaveVerify(!!verifyInfo.isVerified);
    }
  }, [verifyInfo]);
  useEffect(() => {
    if (isSubmitWithoutOTP) {
      setIsSubmitWithoutOTP(false);
      handleUpdateOrder();
    }
  }, [precheckData]);

  const onErr = (error: unknown) => {
    let msg = "";
    if (error instanceof Error) {
      msg = error.message;
    }
    toast.error(msg);
    handleClose();
  };
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!symbolData) {
      return;
    }
    if (symbolData && Number(e.target.value) * 1000 > symbolData.ceiling) {
      setUpdatePrice((symbolData.ceiling / 1000).toFixed(2));
      return;
    }
    setUpdatePrice(e.target.value);
  };

  const handleBlurPriceInput = () => {
    if (!symbolData) return;
    if (symbolData && Number(updatePrice) * 1000 < symbolData.floor) {
      setUpdatePrice((symbolData.floor / 1000).toFixed(2));
    }
  };

  const handleRequestOTP = () => {
    onGenTwoFactor({ transactionId: precheckData?.transactionId ?? "" });
  };

  const handlePreCheckOrder = () => {
    if (data) {
      onPrecheckOrder({
        accountId: activeAccount?.id ?? "",
        instrument: data.symbol, // Mã chứng khoán
        qty: data.remainqtty,
        side: data.en_side === TOrderEnSide.Buy ? TSide.buy : TSide.sell,
        type: data.pricetype === "LO" ? "limit" : "market", // 'limit': Lệnh LO, 'market':Lệnh thị trường ATO, ATC,...
        limitPrice: updatePrice ? Number(updatePrice) * 1000 : 0,
      });
    }
  };
  const handleUpdateOrder = () => {
    const ord: UpdateOrderReq = {
      accountId: activeAccount?.id ?? "",
      orderId: data?.rootorderid ?? "",
      limitPrice: Number(updatePrice) * 1000,
      tokenid: precheckData?.tokenid ?? "",
      transactionId: precheckData?.transactionId ?? "",
      qty: data?.qtty ?? 0,
      ...(!verifyInfo?.isVerified && {
        code: otp,
      }),
      isSaveVerify,
    };
    onUpdateOrder(ord);
  };
  const handleChangeOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= genOTPLenth(activePermission?.ORDINPUT[0])) {
      setOtp(e.target.value);
    }
  };
  const handleCheckBox = (val: boolean) => {
    setIsSaveVerify(val);
  };
  const handleSubmitOrder = () => {
    if (!isConfirm && isSaveVerify) {
      handleSubmitWithoutOTP();
    }
    if (!isConfirm) {
      handlePreCheckOrder();
    }
    if (isConfirm) {
      handleUpdateOrder();
    }
  };
  const handleSubmitWithoutOTP = () => {
    handlePreCheckOrder();
    setIsSubmitWithoutOTP(true);
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
          rightTxt={`${formatNumber(data?.execqtty ?? 0)} / ${formatNumber(
            data?.qtty ?? 0
          )}`}
        />
        <RowContent
          leftTxt={t("en_ord_order_price")}
          rightTxt={formatNumber(data?.price ?? 0)}
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
        <FieldBlock>
          <FieldLabel>{t("fn_obEdit_inp_price")}</FieldLabel>
          <TextField
            fullWidth
            value={updatePrice || null}
            onChange={handleChangePrice}
            onBlur={handleBlurPriceInput}
            type="decimal"
            disabled={isConfirm}
          />
        </FieldBlock>
        {isConfirm && !verifyInfo?.isVerified && (
          <OTPConfirm
            otp={otp}
            handleChangeOTP={handleChangeOTP}
            handleRequest={handleRequestOTP}
            type={activePermission?.ORDINPUT[0]}
            genSuccess={genTwoFactorSuccess}
            handleCheckBox={handleCheckBox}
          />
        )}
        <HelpText txt={t("fn_obEdit_txt_notice")} stt="error" />
        <S.Action
          size="large"
          color="primary"
          variant="contained"
          fullWidth
          disabled={!otp.length && !verifyInfo?.isVerified}
          onClick={handleSubmitOrder}
        >
          {t("fn_ob_cta_confirm")}
        </S.Action>
      </S.Actions>
    </>
  );
};
export default Update;
