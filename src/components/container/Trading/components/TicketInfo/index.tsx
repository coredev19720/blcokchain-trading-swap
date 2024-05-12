import FieldLabel from "@components/common/FieldLabel";
import * as S from "./styles";
import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { orderKindOpts, orderTypeOpts } from "@src/constants/common";
import { TMarket, TOrderKind, TOrderType } from "@enum/common";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setTicket } from "@src/redux/features/marketSlice";
import { InsRTData } from "@/src/constraints/interface/market";
import { roundDownVol } from "@/src/utils/market";
import { formatNumber, uIdGen, unFormatNumber } from "@/src/utils/helpers";
import { useEffect } from "react";
import { usePreviousValue } from "@/src/hooks";

interface Props {
  inst: InsRTData | null;
  maxVol: number;
  refetchAvailTrade: () => void;
}
const TicketInfo = ({ inst, maxVol, refetchAvailTrade }: Props) => {
  const prevMaxVol = usePreviousValue(maxVol);
  const orderTypes = orderTypeOpts[(inst?.EX as TMarket) || "HOSE"];
  const t = useTranslations("trade");
  const dispatch = useAppDispatch();
  const { ticket } = useAppSelector((state) => state.market);
  useEffect(() => {
    if (prevMaxVol && maxVol < prevMaxVol) {
      handleReCalcTicket();
    }
  }, [maxVol]);

  const handleReCalcTicket = () => {
    dispatch(setTicket({ ...ticket, vol: "0", multiple: "1" }));
  };
  const handleChangeOrderType = (e: SelectChangeEvent<unknown>) => {
    dispatch(setTicket({ ...ticket, type: e.target.value as TOrderType }));
  };
  const handleChangeOrderKind = (e: SelectChangeEvent<unknown>) => {
    dispatch(setTicket({ ...ticket, kind: e.target.value as TOrderKind }));
  };
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inst && /^\d*\.?\d*$/.test(e.target.value)) {
      if (Number(e.target.value) * 1000 > inst.CL) {
        dispatch(setTicket({ ...ticket, price: (inst.CL / 1000).toFixed(2) }));
        return;
      }
      dispatch(setTicket({ ...ticket, price: e.target.value }));
    }
  };
  const handleBlurPrice = () => {
    if (!inst) return;
    if (Number(ticket.price) * 1000 < inst.FL) {
      dispatch(setTicket({ ...ticket, price: (inst.FL / 1000).toFixed(2) }));
    }
    refetchAvailTrade();
  };
  const handleChangeVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = unFormatNumber(e.target.value);
    const realMaxVol = Math.floor(maxVol / unFormatNumber(ticket.multiple));
    if (inst && value >= 0) {
      dispatch(
        setTicket({
          ...ticket,
          vol: formatNumber(value > realMaxVol ? realMaxVol : value, 0, "0"),
        })
      );
    }
  };
  const handleBlurVol = () => {
    dispatch(
      setTicket({
        ...ticket,
        vol: formatNumber(roundDownVol(unFormatNumber(ticket.vol)), 0, "0"),
      })
    );
  };
  const handleChangeMultipe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = unFormatNumber(e.target.value);
    const maxVal = Math.floor(maxVol / unFormatNumber(ticket.vol));
    if (maxVol && value >= 0) {
      dispatch(
        setTicket({
          ...ticket,
          multiple: formatNumber(value > maxVal ? maxVal : value, 0, ""),
        })
      );
    }
  };
  const handleBlurMultiple = () => {
    const value = unFormatNumber(ticket.multiple);
    if (!value || value < 1) {
      dispatch(
        setTicket({
          ...ticket,
          multiple: "1",
        })
      );
    }
  };
  return (
    <S.Wrapper>
      <Grid container spacing={2}>
        {/* Loại lệnh */}
        <S.FieldBlock item xs={12}>
          <FieldLabel>{t("fn_trade_inp_ordTypeGrp")}</FieldLabel>
          <Select
            onChange={handleChangeOrderKind}
            fullWidth
            value={ticket.kind}
          >
            {orderKindOpts.map((x) => (
              <MenuItem value={x.value} key={x.value}>
                {x.label}
              </MenuItem>
            ))}
          </Select>
        </S.FieldBlock>
        {/* Giá */}
        <S.FieldBlock item xs={6}>
          <FieldLabel>{t("fn_trade_inp_ordPrice")}</FieldLabel>
          <TextField
            fullWidth
            value={ticket.price}
            onChange={handleChangePrice}
            onBlur={handleBlurPrice}
            type="decimal"
          />
        </S.FieldBlock>
        {/* Lệnh */}
        <S.FieldBlock item xs={6}>
          <FieldLabel>{t("fn_trade_inp_ordType")}</FieldLabel>
          <Select
            onChange={handleChangeOrderType}
            fullWidth
            value={ticket.type}
          >
            {orderTypes.map((x) => (
              <MenuItem value={x.value} key={x.value}>
                {x.label}
              </MenuItem>
            ))}
          </Select>
        </S.FieldBlock>
        {/* Số lượng */}
        <S.FieldBlock item xs={6}>
          <FieldLabel>{t("fn_trade_inp_ordQty")}</FieldLabel>
          <TextField
            fullWidth
            value={ticket.vol ? ticket.vol : "0"}
            onChange={handleChangeVol}
            onBlur={handleBlurVol}
            type="decimal"
            id={uIdGen()}
          />
        </S.FieldBlock>
        {/* Nhân lệnh */}
        <S.FieldBlock item xs={6}>
          <FieldLabel>{t("fn_trade_inp_ordMulti")}</FieldLabel>
          <TextField
            fullWidth
            value={ticket.multiple}
            type="decimal"
            onChange={handleChangeMultipe}
            onBlur={handleBlurMultiple}
            id={uIdGen()}
          />
        </S.FieldBlock>
      </Grid>
    </S.Wrapper>
  );
};
export default TicketInfo;
