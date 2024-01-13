import React, { useEffect } from "react";
import { Wrapper, MenuItem, MenuImage } from "./styles";
import { menus } from "@/src/constants/common";
import { useTranslations } from "next-intl";
import { Typography } from "@mui/material";
import colors from "@/src/themes/colors";
import { useRouter, usePathname, useParams } from "next/navigation";
const Menu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const t = useTranslations("menu");
  const goToDestination = (url: string) => () => {
    router.push(`/${params?.locale}${url}`);
  };
  const Menu = menus.map((menu, index) => {
    return (
      <MenuItem
        key={`menu_${index}_${menu.label}`}
        onClick={() => {
          if (!pathname?.includes(menu.url)) {
            goToDestination(menu.url)();
          }
        }}
      >
        <MenuImage
          src={pathname?.includes(menu.url) ? menu.activeIcon : menu.icon}
          alt=""
          width={pathname?.includes(menu.url) ? 40 : 24}
          height={pathname?.includes(menu.url) ? 40 : 24}
        />
        {!pathname?.includes(menu.url) && (
          <Typography variant="subtitle2" noWrap color={colors.threeRest}>
            {t(menu.label)}
          </Typography>
        )}
      </MenuItem>
    );
  });
  return <Wrapper>{Menu}</Wrapper>;
};
export default Menu;
