import * as S from "./styles";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
const accounts = [
  { title: "Thường - 00011111111", value: "00011111111" },
  { title: "Phái sinh - 00022222222", value: "00022222222" },
];
const Header = () => {
  const t = useTranslations("account");
  const [account, setAccount] = useState<string>("00011111111");
  const handleChangeAccount = (e: SelectChangeEvent<string>) => {
    setAccount(e.target.value);
  };
  return (
    <S.Wrapper>
      <Typography>{t("fn_acc_txt_title")}</Typography>
      <Select value={account} onChange={handleChangeAccount}>
        {accounts.map((item) => (
          <MenuItem value={item.value} key={`account_${item.value}`}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </S.Wrapper>
  );
};
export default Header;
