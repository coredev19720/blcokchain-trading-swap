import { Wrapper, BackButton } from "./styles";
import Image from "next/image";
import { logo } from "@/src/images";
import { ArrowBack } from "@mui/icons-material";
import colors from "@/src/themes/colors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Header = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Wrapper>
      <BackButton
        color={colors.sb60}
        fontWeight={600}
        onClick={handleBack}
        variant="subtitle1"
      >
        <ArrowBack />
        Trở về
      </BackButton>
      <Image alt="logo" src={logo} height={40} />
    </Wrapper>
  );
};
export default Header;
