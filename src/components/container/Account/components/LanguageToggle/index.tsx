import * as S from "./styles";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Language, Wrapper } from "./styles";
import { languages } from "@/src/constants/common";
import Cookies from "js-cookie";
import {
  usePathname,
  useRouter,
  useParams,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";
const LanguageToggle = () => {
  const t = useTranslations("account");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const handleChangeLanguage = (val: string) => {
    Cookies.set("NEXT_LOCALE", val);
    pathname && router.push(`/${val}/account`);
  };
  return (
    <Wrapper>
      {languages.map((item) => (
        <Language
          key={`lang_${item.label}`}
          onClick={() => {
            handleChangeLanguage(item.value);
          }}
          active={item.value === params?.locale}
        >
          <Image src={item.icon} alt={item.label} width={24} height={18} />
        </Language>
      ))}
    </Wrapper>
  );
};
export default LanguageToggle;
