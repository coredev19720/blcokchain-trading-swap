import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

import { TextField } from "@mui/material";
import { OrderInfo } from "@interface/market";
import { formatNumber } from "@src/utils/helpers";
import {
  RowContent,
  FieldLabel,
  OTPConfirm,
  HelpText,
} from "@components/common";
import { FieldBlock } from "@src/styles/common";
import * as S from "./styles";
import { UpdateOrderReq } from "@/src/constraints/interface/services/request";
import { AccInfo, AccPermissions } from "@/src/constraints/interface/account";
import { TSide } from "@/src/constraints/enum/common";
import {
  useUpdateOrder,
  useGetInstrument,
  usePrecheckOrder,
  useGenTwoFactorAuth,
} from "@/src/services/hooks";

interface IProps {
  data: OrderInfo | null;
  handleClose: () => void;
  activeAccount: AccInfo | null;
  activePermission: AccPermissions | null;
}
const Update = ({
  data,
  handleClose,
  activeAccount,
  activePermission,
}: IProps) => {
  const t = useTranslations("order_book");
  const { onGenTwoFactor, isSuccess: genTwoFactorSuccess } =
    useGenTwoFactorAuth();
  const { onUpdateOrder } = useUpdateOrder();
  const { onPrecheckOrder, data: precheckData } = usePrecheckOrder();
  const { data: symbolData } = useGetInstrument(data?.symbol ?? "");
  const [otp, setOtp] = useState<string>("");
  const [updatePrice, setUpdatePrice] = useState<string>(
    data?.price ? (data.price / 1000).toFixed(2) : "0"
  );
  useEffect(() => {
    if (precheckData) {
      handleUpdateOrder();
    }
  }, [precheckData]);
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

  const handleSubmit = () => {
    if (data) {
      onPrecheckOrder({
        accountId: activeAccount?.id ?? "",
        instrument: data.symbol, // Mã chứng khoán
        qty: data.remainqtty,
        //fix me uncomment this code
        // side: data.en_side,
        side: data.en_side === TSide.buy ? "buy" : "sell",
        type: data.pricetype === "LO" ? "limit" : "market", // 'limit': Lệnh LO, 'market':Lệnh thị trường ATO, ATC,...
        limitPrice: data.price,
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
      code: otp,
    };
    onUpdateOrder(ord);
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
          />
        </FieldBlock>
        <OTPConfirm
          otp={otp}
          handleChangeOTP={handleChangeOTP}
          handleRequest={handleRequestOTP}
          activePermission={activePermission}
          genSuccess={genTwoFactorSuccess}
        />
        <HelpText txt={t("fn_obEdit_txt_notice")} stt="error" />
        <S.Action
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          {t("fn_ob_cta_confirm")}
        </S.Action>
      </S.Actions>
    </>
  );
};
export default Update;
