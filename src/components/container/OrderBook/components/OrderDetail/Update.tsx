import { FieldBlock } from "@src/styles/common";
import * as S from "./styles";
import { TextField } from "@mui/material";
import { OrderInfo } from "@interface/market";
import { formatNumber, genValidPrice } from "@src/utils/helpers";
import { useTranslations } from "next-intl";
import RowContent from "@components/common/RowContent";
import FieldLabel from "@components/common/FieldLabel";
import OTPConfirm from "@components/common/OTPConfirm";
import HelpText from "@components/common/HelpText";

import dayjs from "dayjs";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
interface IProps {
  data: OrderInfo | null;
  handleClose: () => void;
}
const Update = ({ data, handleClose }: IProps) => {
  const t = useTranslations("order_book");
  const { order, stocks } = useAppSelector((state) => state.market);
  const availTicker = stocks.find((x) => x.symbol === data?.symbol);
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string>("");
  const [updatePrice, setUpdatePrice] = useState<number>(data?.price || 0);

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (availTicker) {
      if (Number(e.target.value) > availTicker.ceiling) {
        setUpdatePrice(availTicker.ceiling);
        return;
      }
      const validPrice = genValidPrice(
        e.target.value,
        updatePrice.toString(),
        availTicker.floor
      );
      setUpdatePrice(Number(validPrice));
    }
  };
  const handleValidPrice = () => {
    if (availTicker && updatePrice < availTicker.floor) {
      setUpdatePrice(availTicker.floor);
      return;
    }
  };
  const handleRequestOTP = () => {
    console.log("handleRequestOTP");
  };
  const handleSubmit = () => {
    // if (order) {
    //   try {
    //     const ord: IOrder = {
    //       ...order,
    //       price: updatePrice,
    //     };
    //     dispatch(updateOrders(ord));
    //   } catch (e) {
    //     console.log(e);
    //   } finally {
    //     handleClose();
    //   }
    // }
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
        <FieldBlock>
          <FieldLabel>{t("fn_obEdit_inp_price")}</FieldLabel>
          <TextField
            fullWidth
            value={updatePrice || null}
            onChange={handleChangePrice}
            onBlur={handleValidPrice}
            type="number"
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
