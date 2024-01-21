import * as S from "./styles";
import {
  Button,
  ButtonGroup,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SearchInput from "./components/SearchInput";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setSide } from "@/src/redux/features/marketSlice";
import { TSide } from "@/src/enum";
import SearchPanel from "@/src/components/common/SearchPanel";
const accounts = [
  { title: "Thường - 00011111111", value: "00011111111" },
  { title: "Phái sinh - 00022222222", value: "00022222222" },
];
const Search = () => {
  const t = useTranslations("trade");
  const dispatch = useAppDispatch();
  const side = useAppSelector((state) => state.market.side);
  const price = useAppSelector((state) => state.market.price);

  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const handleChangeSide = (side: TSide) => {
    dispatch(setSide(side));
  };
  return (
    <S.Wrapper>
      <S.GroupButton>
        <S.SideBtn
          variant="contained"
          onClick={() => handleChangeSide(TSide.BUY)}
          color={side === TSide.BUY ? "success" : "secondary"}
        >
          {t("fn_trade_cta_buyToggle")}
        </S.SideBtn>
        <S.SideBtn
          variant="contained"
          onClick={() => handleChangeSide(TSide.SELL)}
          color={side === TSide.SELL ? "error" : "secondary"}
        >
          {t("fn_trade_cta_sellToggle")}
        </S.SideBtn>
      </S.GroupButton>
      <SearchInput setOpenPanel={setOpenPanel} />
      <SearchPanel open={openPanel} setOpenPanel={setOpenPanel} />
    </S.Wrapper>
  );
};
export default Search;
