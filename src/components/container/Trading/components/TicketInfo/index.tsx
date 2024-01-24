import FieldLabel from "@/src/components/common/FieldLabel";
import * as S from "./styles";
import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { orderKindOpts, orderTypeOpts } from "@/src/constants/common";
import { TOrderKind, TOrderType } from "@/src/enum";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setTicket } from "@/src/redux/features/marketSlice";
const TicketInfo = () => {
  const t = useTranslations("trade");
  const dispatch = useAppDispatch();
  const ticket = useAppSelector((state) => state.market.ticket);
  const ticker = useAppSelector((state) => state.market.ticker);
  const handleChangeOrderType = (e: SelectChangeEvent<unknown>) => {
    dispatch(setTicket({ ...ticket, type: e.target.value as TOrderType }));
  };
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof e.target.value);
    if (ticker && Number(e.target.value) > ticker.ceil) {
      dispatch(setTicket({ ...ticket, price: ticker.ceil }));
      return;
    }
    dispatch(setTicket({ ...ticket, price: Number(e.target.value) }));
  };
  const handleChangeOrderKind = (e: SelectChangeEvent<unknown>) => {
    dispatch(setTicket({ ...ticket, kind: e.target.value as TOrderKind }));
  };
  const handleChangeVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTicket({ ...ticket, vol: Number(e.target.value) }));
  };
  const handleValidPrice = () => {
    if (ticker && ticker.floor < ticket.price) {
      dispatch(setTicket({ ...ticket, price: ticker.floor }));
    }
  };
  return (
    <S.Wrapper>
      <Grid container spacing={2}>
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
        <S.FieldBlock item xs={6}>
          <FieldLabel>{t("fn_trade_inp_ordPrice")}</FieldLabel>
          <TextField
            fullWidth
            value={ticket.price}
            onChange={handleChangePrice}
            type="decimal"
            onBlur={handleValidPrice}
          />
        </S.FieldBlock>
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
        <S.FieldBlock item xs={6}>
          <FieldLabel>{t("fn_trade_inp_ordQty")}</FieldLabel>
          <TextField
            fullWidth
            value={ticket.vol}
            onChange={handleChangeVol}
            type="decimal"
          />
        </S.FieldBlock>
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
