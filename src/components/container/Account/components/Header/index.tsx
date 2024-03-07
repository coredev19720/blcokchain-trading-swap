import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setActiveAccount } from "@src/redux/features/userSlice";
import { AccountInfo } from "@/src/constraints/interface/services/response";
const Header = () => {
  const t = useTranslations("account");
  const dispatch = useAppDispatch();
  const { accounts, activeAccount } = useAppSelector((state) => state.user);
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
  return (
    <S.Wrapper>
      <Typography fontWeight={700} color="text.primary">
        {t("fn_acc_txt_title")}
      </Typography>
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
