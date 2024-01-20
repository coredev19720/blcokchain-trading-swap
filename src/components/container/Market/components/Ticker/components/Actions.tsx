import { ITickerData } from "@/src/interface/common";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/src/redux/hooks";
import { setSide } from "@/src/redux/features/marketSlice";
import { TSide } from "@/src/enum";
const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 8,
  padding: theme.spacing(2, 4),
  borderTop: `1px solid ${theme.palette.divider}`,
}));
const ActionBtn = styled(Button)(({ theme }) => ({
  flex: 1,
}));
const Actions = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("market");
  const handleClick = (side: TSide) => {
    dispatch(setSide(side));
    if (params?.locale) {
      router.push(`/${params?.locale}/trading`);
    }
  };
  return (
    <Wrapper>
      <ActionBtn
        variant="contained"
        color="error"
        onClick={() => handleClick(TSide.SELL)}
      >
        {t("fn_symbol_cta_sell")}
      </ActionBtn>
      <ActionBtn
        variant="contained"
        color="success"
        onClick={() => handleClick(TSide.BUY)}
      >
        {t("fn_symbol_cta_buy")}
      </ActionBtn>
    </Wrapper>
  );
};
export default Actions;
