import { styled } from "@mui/system";
import { ArrowBack } from "@mui/icons-material";
import { Typography } from "@mui/material";
const Wrapper = styled("div")({
  padding: 16,
  background: "transparent",
});
interface IProps {
  title: string;
  handleBack: () => void;
}
const Header = ({ title, handleBack }: IProps) => {
  return (
    <Wrapper>
      <ArrowBack onClick={handleBack} />
      <Typography>{title}</Typography>
    </Wrapper>
  );
};
export default Header;
