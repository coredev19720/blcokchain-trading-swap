import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setActiveAccount } from "@src/redux/features/userSlice";
import { Sync } from "@mui/icons-material";
import { AccInfo } from "@/src/constraints/interface/account";
import {
  useGetPortfolio,
  useGetAccountSummary,
  useSetCurrentAcc,
} from "@/src/services/hooks";
import { useEffect } from "react";
import { TAccountType } from "@/src/constraints/enum/common";

interface Props {
  title: string;
  accSumRefresh?: boolean;
  portRefresh?: boolean;
}
const PageHeader = ({ title, accSumRefresh, portRefresh }: Props) => {
  const dispatch = useAppDispatch();
  const { activeAccount, accounts } = useAppSelector((state) => state.user);
  const { refetch: AccSumRefetch } = useGetAccountSummary(
    activeAccount?.id ?? ""
  );
  const { onSetCurrentAcc, isError, isSuccess } = useSetCurrentAcc();
  const { refetch: portRefetch } = useGetPortfolio(activeAccount?.id ?? "");
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
  useEffect(() => {
    if (accounts.length) {
      const defaultAcc =
        accounts.find((acc) => acc.accounttype === TAccountType.THUONG) ??
        accounts[0];
      dispatch(setActiveAccount(defaultAcc));
    }
  }, [accounts]);

  useEffect(() => {
    if (activeAccount) {
      onSetCurrentAcc({ afacctno: activeAccount.id });
    }
  }, [activeAccount]);
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
