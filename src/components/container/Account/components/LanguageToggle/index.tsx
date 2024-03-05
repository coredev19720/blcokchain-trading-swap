import * as S from "./styles";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { languages } from "@src/constants/common";
import Cookies from "js-cookie";
import { DarkMode, LightMode } from "@mui/icons-material";
import { usePathname, useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { setTheme } from "@src/redux/features/layoutSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";

const LanguageToggle = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.layout);
  const t = useTranslations("account");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    const theme = Cookies.get("theme");
    if (theme === "dark") {
      dispatch(setTheme(theme));
    }
  }, []);

  const handleChangeLanguage = (val: string) => {
    Cookies.set("NEXT_LOCALE", val);
    pathname && router.push(`/${val}/account`);
  };
  const handleToggleTheme = () => {
    Cookies.set("theme", theme == "light" ? "dark" : "light");
    dispatch(setTheme(theme == "light" ? "dark" : "light"));
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
      <S.ThemeWrapper onClick={handleToggleTheme}>
        {theme === "light" ? <LightMode /> : <DarkMode />}
      </S.ThemeWrapper>
    </S.Wrapper>
  );
};
export default LanguageToggle;
