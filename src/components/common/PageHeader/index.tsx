import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setActiveAccount } from "@src/redux/features/userSlice";
import { Sync } from "@mui/icons-material";
import { AccInfo } from "@/src/constraints/interface/account";
import { useGetAccountSummary } from "@src/services/hooks/useGetAccountSummary";

interface Props {
  title: string;
  refresh?: boolean;
}
const PageHeader = ({ title, refresh }: Props) => {
  const t = useTranslations("portfolio");
  const dispatch = useAppDispatch();
  const { activeAccount, accounts } = useAppSelector((state) => state.user);
  const { refetch } = useGetAccountSummary(activeAccount?.id || "");
  const handleChangeAccount = (e: SelectChangeEvent<unknown>) => {
    if (typeof e.target.value === "string") {
      const availAcc = accounts.find((acc) => acc.id === e.target.value);
      availAcc && dispatch(setActiveAccount(availAcc));
    }
  };
  return (
    <S.Wrapper>
      <S.Title>
        <Typography fontWeight={700} color="text.primary" variant="h5">
          {title}
        </Typography>
        {refresh && <Sync fontSize="large" onClick={refetch} />}
      </S.Title>
      {activeAccount && (
        <S.AccountSelect
          value={activeAccount.id}
          onChange={handleChangeAccount}
          variant="standard"
          size="small"
        >
          {accounts.map((acc: AccInfo) => (
            <MenuItem value={acc.id} key={`account_${acc.id}`}>
              {`${acc.accounttype} - ${acc.id}`}
            </MenuItem>
          ))}
        </S.AccountSelect>
      )}
    </S.Wrapper>
  );
};
export default PageHeader;
