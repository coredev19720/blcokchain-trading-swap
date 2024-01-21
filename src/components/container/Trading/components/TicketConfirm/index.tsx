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

const TicketConfirm = () => {
  const t = useTranslations("trade");

  return (
    <S.Wrapper>
      <FieldLabel>Duyet lenh mua</FieldLabel>
    </S.Wrapper>
  );
};
export default TicketConfirm;
