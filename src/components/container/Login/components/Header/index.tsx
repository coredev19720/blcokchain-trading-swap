import { Wrapper, BackButton } from "./styles";
import Image from "next/image";
import { logo } from "@/src/images";
import { ArrowBack } from "@mui/icons-material";
import { useAppSelector } from "@/src/redux/hooks";

const Header = () => {
  const userInfo = useAppSelector((state) => state.userReducer.userInfo);
  console.log("header", userInfo);
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
