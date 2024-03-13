import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setActiveAccount } from "@src/redux/features/userSlice";
import { Sync } from "@mui/icons-material";
import { AccInfo } from "@/src/constraints/interface/account";
import { useGetAccountSummary } from "@src/services/hooks/useGetAccountSummary";
import { useEffect } from "react";
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
  const handleRefresh = () => {
    // refetch();
  };
  useEffect(() => {
    console.log("mount");
  }, []);
  return (
    <S.Wrapper>
      <S.Title>
        <Typography fontWeight={700} color="text.primary" variant="h5">
          {title}
        </Typography>
        {refresh && <Sync fontSize="large" onClick={handleRefresh} />}
      </S.Title>
      <S.AccountSelect
        value={activeAccount?.id}
        onChange={handleChangeAccount}
        variant="standard"
      >
        {accounts.map((acc: AccInfo) => (
          <MenuItem value={acc.id} key={`account_${acc.id}`}>
            {`${acc.accounttype} - ${acc.id}`}
          </MenuItem>
        ))}
      </S.AccountSelect>
    </S.Wrapper>
  );
};
export default PageHeader;
