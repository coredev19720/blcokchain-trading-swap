import * as S from "./styles";
import { languages } from "@src/constants/common";
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

const LanguageToggle = () => {
  const router = useRouter();
  const params = useParams();

  const handleChangeLanguage = (val: string) => {
    Cookies.set("NEXT_LOCALE", val);
    router.push(`/${val}/account`);
  };
  return (
    <S.Wrapper>
      <S.Languages>
        {languages.map((item) => (
          <S.Language
            key={`lang_${item.label}`}
            onClick={() => {
              handleChangeLanguage(item.value);
            }}
            active={item.value === params?.locale}
          >
            <Image src={item.icon} alt={item.label} width={24} height={18} />
          </S.Language>
        ))}
      </S.Languages>
    </S.Wrapper>
  );
};
export default LanguageToggle;
