import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { accounts } from "@/src/constants/dumpData/dashboard";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import { setAccount } from "@/src/redux/features/userSlice";
const Header = () => {
  const t = useTranslations("account");
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.user.account);
  const handleChangeAccount = (e: SelectChangeEvent<unknown>) => {
    if (typeof e.target.value === "string") {
      const availAcc = accounts.find((acc) => acc.accountNo === e.target.value);
      if (availAcc) {
        dispatch(setAccount(availAcc));
      }
    }
  };
  return (
    <S.Wrapper>
      <Typography fontWeight={700} color="text.primary">
        {t("fn_acc_txt_title")}
      </Typography>
      <S.AccountSelect
        value={account?.accountNo}
        onChange={handleChangeAccount}
        variant="standard"
      >
        {accounts.map((acc) => (
          <MenuItem value={acc.accountNo} key={`account_${acc.accountNo}`}>
            {`${acc.type} - ${acc.accountNo}`}
          </MenuItem>
        ))}
      </S.AccountSelect>
    </S.Wrapper>
  );
};
export default Header;
