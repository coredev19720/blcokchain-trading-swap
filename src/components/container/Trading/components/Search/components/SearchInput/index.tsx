import { OutlinedInput } from "@mui/material";
import { styled } from "@mui/system";
import { Search } from "@mui/icons-material";
import { useAppSelector } from "@src/redux/hooks";
import colors from "@src/themes/colors";

interface IProps {
  setOpenPanel: (val: boolean) => void;
}

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));
const Input = styled(OutlinedInput)(() => ({
  backgroundColor: colors.nb5,
  borderRadius: 12,
  "& input": {
    padding: "7px 8px",
  },
}));

const SearchInput = ({ setOpenPanel }: IProps) => {
  const { selectedStock } = useAppSelector((state) => state.market);
  return (
    <Wrapper>
      <Input
        placeholder={selectedStock?.symbol || ""}
        onFocus={() => setOpenPanel(true)}
        fullWidth
        startAdornment={<Search fontSize="large" color="secondary" />}
      />
    </Wrapper>
  );
};
export default SearchInput;
