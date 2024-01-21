import { OutlinedInput } from "@mui/material";
import { styled } from "@mui/system";
import { Search } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/src/redux/hooks";
interface IProps {
  setOpenPanel: (val: boolean) => void;
}

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));
const Input = styled(OutlinedInput)(() => ({
  backgroundColor: "#f0f0f0",
  borderRadius: 12,
  "& input": {
    padding: 8,
  },
}));

const SearchInput = ({ setOpenPanel }: IProps) => {
  const t = useTranslations("market");
  const ticker = useAppSelector((state) => state.market.ticker);

  return (
    <Wrapper>
      <Input
        // value={ticker?.ticker}
        placeholder={ticker?.ticker}
        onFocus={() => setOpenPanel(true)}
        fullWidth
        startAdornment={<Search fontSize="large" color="secondary" />}
      />
    </Wrapper>
  );
};
export default SearchInput;
