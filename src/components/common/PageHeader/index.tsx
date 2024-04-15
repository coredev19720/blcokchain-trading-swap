import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setActiveAccount } from "@src/redux/features/userSlice";
import { Sync } from "@mui/icons-material";
import { AccInfo } from "@/src/constraints/interface/account";
import { useGetAccountSummary } from "@src/services/hooks/useGetAccountSummary";
import { useGetPortfolio } from "@/src/services/hooks/useGetPortfolio";

interface Props {
  title: string;
  accSumRefresh?: boolean;
  portRefresh?: boolean;
}
const PageHeader = ({ title, accSumRefresh, portRefresh }: Props) => {
  const dispatch = useAppDispatch();
  const { activeAccount, accounts } = useAppSelector((state) => state.user);
  const { refetch: AccSumRefetch } = useGetAccountSummary(
    activeAccount?.id || ""
  );
  const { refetch: portRefetch } = useGetPortfolio(activeAccount?.id || "");
  const handleChangeAccount = (e: SelectChangeEvent<unknown>) => {
    if (typeof e.target.value === "string") {
      const availAcc = accounts.find((acc) => acc.id === e.target.value);
      availAcc && dispatch(setActiveAccount(availAcc));
    }
  };
  const handleRefetchData = () => {
    accSumRefresh && AccSumRefetch();
    portRefresh && portRefetch();
  };
  return (
    <S.Wrapper>
      <S.Title>
        <Typography fontWeight={700} variant="h5">
          {title}
        </Typography>
        {(accSumRefresh || portRefresh) && (
          <Sync fontSize="large" onClick={handleRefetchData} />
        )}
      </S.Title>
      {activeAccount && (
        <S.AccountSelect
          value={activeAccount.id}
          onChange={handleChangeAccount}
          variant="standard"
          size="small"
          disabled={accounts.length === 1}
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
