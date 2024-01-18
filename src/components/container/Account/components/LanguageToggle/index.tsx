import * as S from "./styles";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Language, Wrapper } from "./styles";
import { languages } from "@/src/constants/common";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
const LanguageToggle = () => {
  const t = useTranslations("account");
  const pathname = usePathname();
  const router = useRouter();
  const handleChangeLanguage = (val: string) => {
    console.log(val);
    console.log(pathname);
    if (pathname) {
      router.push(pathname, pathname, { locale: val });
    }
  };
  return (
    <Wrapper>
      {languages.map((item) => (
        <Language
          key={`lang_${item.label}`}
          onClick={() => {
            handleChangeLanguage(item.value);
          }}
        >
          <Image src={item.icon} alt={item.label} width={24} height={24} />
        </Language>
      ))}
    </Wrapper>
  );
};
export default LanguageToggle;
