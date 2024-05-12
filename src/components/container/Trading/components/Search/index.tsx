import * as S from "./styles";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SearchInput from "./components/SearchInput";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setTicket } from "@src/redux/features/marketSlice";
import { TSide } from "@enum/common";
import SearchPanel from "@components/common/SearchPanel";
const Search = () => {
  const t = useTranslations("trade");
  const dispatch = useAppDispatch();
  const { ticket } = useAppSelector((state) => state.market);
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const handleChangeSide = (side: TSide) => {
    dispatch(
      setTicket({
        ...ticket,
        side,
        price: "0",
        vol: "0",
      })
    );
  };
  return (
    <S.Wrapper>
      <S.GroupButton>
        <S.SideBtn
          size="small"
          variant="contained"
          onClick={() => handleChangeSide(TSide.buy)}
          color={ticket.side === TSide.buy ? "success" : "secondary"}
        >
          {t("fn_trade_cta_buyToggle")}
        </S.SideBtn>
        <S.SideBtn
          size="small"
          variant="contained"
          onClick={() => handleChangeSide(TSide.sell)}
          color={ticket.side === TSide.sell ? "error" : "secondary"}
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
