import React from "react";
import { Wrapper } from "./styles";
import { menus } from "@/src/constants/common";
import { useTranslations } from "next-intl";
const Menu = ({ children, required, variant }: any) => {
  const t = useTranslations("dashboard");
  const Menu = menus.map((menu, index) => {
    return (
      <div key={`menu_${index}_${menu.label}`}>
        <img src={menu.icon} alt="" />
        <span>{t(menu.label)}</span>
      </div>
    );
  });
  return <Wrapper>Hello pikachu</Wrapper>;
};
export default Menu;
