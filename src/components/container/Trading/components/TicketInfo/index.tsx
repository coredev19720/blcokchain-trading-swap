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
import { TOrderKind, TOrderType } from "@enum/common";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setTicket } from "@src/redux/features/marketSlice";

interface Props {
  maxVol: number;
}
const TicketInfo = ({ maxVol }: Props) => {
  const t = useTranslations("trade");
  const dispatch = useAppDispatch();
  const ticket = useAppSelector((state) => state.market.ticket);
  const ticker = useAppSelector((state) => state.market.ticker);
  const handleChangeOrderType = (e: SelectChangeEvent<unknown>) => {
    dispatch(setTicket({ ...ticket, type: e.target.value as TOrderType }));
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!ticker) return;
    if (Number(e.target.value) * 1000 > ticker.ceiling) {
      dispatch(
        setTicket({ ...ticket, price: (ticker.ceiling / 1000).toFixed(2) })
      );
      return;
    }
    dispatch(setTicket({ ...ticket, price: e.target.value }));
  };
  const handleBlurPriceInput = () => {
    if (!ticker) return;
    if (Number(ticket.price) * 1000 < ticker.floor) {
      dispatch(
        setTicket({ ...ticket, price: (ticker.floor / 1000).toFixed(2) })
      );
      return;
    }
  };
  const handleChangeOrderKind = (e: SelectChangeEvent<unknown>) => {
    dispatch(setTicket({ ...ticket, kind: e.target.value as TOrderKind }));
  };
  const handleChangeVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setTicket({
        ...ticket,
        vol: Number(e.target.value) > maxVol ? maxVol : Number(e.target.value),
      })
    );
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
            onBlur={handleBlurPriceInput}
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
            {orderTypeOpts.map((x) => (
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
            value={ticket.vol}
            onChange={handleChangeVol}
            type="decimal"
          />
        </S.FieldBlock>
        {/* Nhân lệnh */}
        <S.FieldBlock item xs={6}>
          <FieldLabel>{t("fn_trade_inp_ordMulti")}</FieldLabel>
          {/* fix me */}
          <TextField fullWidth value={1} type="number" />
        </S.FieldBlock>
      </Grid>
    </S.Wrapper>
  );
};
export default TicketInfo;
