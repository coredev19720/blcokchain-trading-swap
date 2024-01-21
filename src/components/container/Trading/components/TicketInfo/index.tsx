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
import { useState } from "react";
import { orderKindOpts, orderTypeOpts } from "@/src/constants/common";
import { TOrderKind } from "@/src/enum";

const TicketInfo = () => {
  const t = useTranslations("trade");
  const [orderType, setOrderType] = useState<string>("normal");
  const [orderKind, setOrderKind] = useState<TOrderKind>(TOrderKind.LO);
  const [price, setPrice] = useState<number>(0);
  const handleChangeOrderType = (e: SelectChangeEvent<unknown>) => {
    setOrderType(e.target.value as string);
  };
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const handleChangeOrderKind = (e: SelectChangeEvent<unknown>) => {
    setOrderKind(e.target.value as TOrderKind);
  };
  return (
    <S.Wrapper>
      <Grid container spacing={2}>
        <S.FieldBlock item xs={12}>
          <FieldLabel>{t("fn_trade_inp_ordTypeGrp")}</FieldLabel>
          <Select onChange={handleChangeOrderType} fullWidth value={orderType}>
            {orderTypeOpts.map((x) => (
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
            value={price}
            onChange={handleChangePrice}
            type="number"
          />
        </S.FieldBlock>
        <S.FieldBlock item xs={6}>
          <FieldLabel>{t("fn_trade_inp_ordType")}</FieldLabel>
          <Select onChange={handleChangeOrderKind} fullWidth value={orderKind}>
            {orderKindOpts.map((x) => (
              <MenuItem value={x.value} key={x.value}>
                {x.label}
              </MenuItem>
            ))}
          </Select>
        </S.FieldBlock>
      </Grid>
    </S.Wrapper>
  );
};
export default TicketInfo;
