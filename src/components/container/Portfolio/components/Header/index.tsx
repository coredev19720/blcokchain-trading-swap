import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { accounts } from "@src/constants/dumpData/dashboard";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setActiveAccount } from "@src/redux/features/userSlice";
import { Sync } from "@mui/icons-material";
import { AccountInfo } from "@/src/constraints/interface/services/response";

const Header = () => {
  const t = useTranslations("portfolio");
  const dispatch = useAppDispatch();
  const { activeAccount, accounts } = useAppSelector((state) => state.user);
  const handleChangeAccount = (e: SelectChangeEvent<unknown>) => {
    if (typeof e.target.value === "string" && accounts?.d?.length) {
      const availAcc = accounts.d.find(
        (acc) => acc.custodycd === e.target.value
      );
      if (availAcc) {
        dispatch(setActiveAccount(availAcc));
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
        value={activeAccount?.custodycd}
        onChange={handleChangeAccount}
        variant="standard"
      >
        {accounts &&
          accounts.d.map((acc: AccountInfo) => (
            <MenuItem value={acc.custodycd} key={`account_${acc.custodycd}`}>
              {`${acc.accounttype} - ${acc.custodycd}`}
            </MenuItem>
          ))}
      </S.AccountSelect>
    </S.Wrapper>
  );
};
export default Header;
