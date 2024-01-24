import { OutlinedInput } from "@mui/material";
import { styled } from "@mui/system";
import { Search } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import colors from "@/src/themes/colors";
interface IProps {
  setOpenPanel: (val: boolean) => void;
}

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 8,
  alignItems: "center",
  padding: theme.spacing(0, 4),
  paddingTop: theme.spacing(4),
}));
const Input = styled(OutlinedInput)(() => ({
  backgroundColor: colors.nb5,
  borderRadius: 12,
  "& input": {
    padding: 8,
  },
}));

const SearchInput = ({ setOpenPanel }: IProps) => {
  const t = useTranslations("market");
  return (
    <Wrapper>
      <Input
        placeholder={t("fn_symbol_cta_search")}
        onFocus={() => setOpenPanel(true)}
        fullWidth
        startAdornment={<Search fontSize="large" color="secondary" />}
      />
    </Wrapper>
  );
};
export default SearchInput;
