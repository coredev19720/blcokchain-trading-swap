import { Wrapper, BackButton } from "./styles";
import Image from "next/image";
import { logo } from "@/images";
import { ArrowBack } from "@mui/icons-material";
const Header = () => {
  return (
    <Wrapper>
      <BackButton variant="text" startIcon={<ArrowBack />}>
        Trở về
      </BackButton>
      <Image alt="logo" src={logo} />
    </Wrapper>
  );
};
export default Header;
