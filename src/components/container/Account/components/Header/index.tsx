import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
const accounts = [
  { title: "Thường - 00011111111", value: "00011111111" },
  { title: "Phái sinh - 00022222222", value: "00022222222" },
];
const Header = () => {
  const t = useTranslations("account");
  const [account, setAccount] = useState<string>("00011111111");
  const handleChangeAccount = (e: SelectChangeEvent<unknown>) => {
    if (typeof e.target.value === "string") {
      setAccount(e.target.value);
    }
  };
  return (
    <S.Wrapper>
      <Typography fontWeight={700}>{t("fn_acc_txt_title")}</Typography>
      <S.AccountSelect
        value={account}
        onChange={handleChangeAccount}
        variant="standard"
      >
        {accounts.map((item) => (
          <MenuItem value={item.value} key={`account_${item.value}`}>
            {item.title}
          </MenuItem>
        ))}
      </S.AccountSelect>
    </S.Wrapper>
  );
};
export default Header;
