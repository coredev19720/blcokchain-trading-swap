import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { accounts } from "@src/constants/dumpData/dashboard";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setAccount } from "@src/redux/features/userSlice";
import { Sync } from "@mui/icons-material";
const Header = () => {
  const t = useTranslations("portfolio");
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
  const handleRefresh = () => {
    console.log("refresh");
  };
  return (
    <S.Wrapper>
      <S.Title>
        <Typography fontWeight={700} color="text.primary">
          {t("fn_port_txt_title")}
        </Typography>
        <Sync fontSize="large" onClick={handleRefresh} />
      </S.Title>
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
