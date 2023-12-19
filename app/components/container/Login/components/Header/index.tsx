import { Button } from "@mui/material";
import { Wrapper } from "./styles";
import Image from "next/image";
import { logo } from "@/app/images";

const Header = () => {
  return (
    <Wrapper>
      <Button>Trở về</Button>
      <Image alt="logo" src={logo} />
    </Wrapper>
  );
};
export default Header;
