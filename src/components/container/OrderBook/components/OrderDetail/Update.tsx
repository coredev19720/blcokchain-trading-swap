import { FieldBlock } from "@src/styles/common";
import * as S from "./styles";
import { TextField } from "@mui/material";
import { OrderInfo } from "@interface/market";
import { formatNumber } from "@src/utils/helpers";
import { useTranslations } from "next-intl";
import RowContent from "@components/common/RowContent";
import FieldLabel from "@components/common/FieldLabel";
import OTPConfirm from "@components/common/OTPConfirm";
import HelpText from "@components/common/HelpText";

import dayjs from "dayjs";
import { useState } from "react";
import { useAppSelector } from "@src/redux/hooks";
import { UpdateOrderReq } from "@/src/constraints/interface/services/request";
import { useUpdateOrder } from "@/src/services/hooks/order/useUpdateOrder";
import { AccInfo } from "@/src/constraints/interface/account";
import { useGetInstrument } from "@/src/services/hooks/useGetInstrument";
interface IProps {
  data: OrderInfo | null;
  handleClose: () => void;
  activeAccount: AccInfo | null;
}
const Update = ({ data, handleClose, activeAccount }: IProps) => {
  const t = useTranslations("order_book");
  const { order } = useAppSelector((state) => state.market);
  const {
    onUpdateOrder,
    isError,
    isSuccess,
    data: uData,
    error,
  } = useUpdateOrder();
  const { data: symbolData } = useGetInstrument(data?.symbol || "");
  const [otp, setOtp] = useState<string>("");
  const [updatePrice, setUpdatePrice] = useState<string>(
    data?.price ? (data.price / 1000).toFixed(2) : "0"
  );
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
      return;
    }
  };

  const handleRequestOTP = () => {
    console.log("handleRequestOTP");
  };

  const handleSubmit = () => {
    if (order) {
      try {
        const ord: UpdateOrderReq = {
          accountId: activeAccount?.id || "",
          orderId: data?.rootorderid || "",
          limitPrice: Number(updatePrice) * 1000,
          tokenid: "", // Tokeninfo lấy từ hàm 3.9 // unimplemented
          transactionId: "", // Mã giao dịch lấy từ hàm 3.9// unimplemented
          qty: 0, // Khối lượng// unimplemented
          code: "string", // mã xác thực 2 lớp.// unimplemented
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
          rightTxt={`${formatNumber(data?.execqtty || 0)} / ${formatNumber(
            data?.qtty || 0
          )}`}
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
