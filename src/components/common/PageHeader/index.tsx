import * as S from "./styles";
import { MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setActiveAccount } from "@src/redux/features/userSlice";
import { Sync } from "@mui/icons-material";
import { AccountInfo } from "@/src/constraints/interface/services/response";
interface Props {
  title: string;
  refresh?: boolean;
}
const PageHeader = ({ title, refresh }: Props) => {
  const t = useTranslations("portfolio");
  const dispatch = useAppDispatch();
  const { activeAccount, accounts } = useAppSelector((state) => state.user);
  const handleChangeAccount = (e: SelectChangeEvent<unknown>) => {
    if (typeof e.target.value === "string" && accounts?.length) {
      const availAcc = accounts.find((acc) => acc.id === e.target.value);
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
          {title}
        </Typography>
        {refresh && <Sync fontSize="large" onClick={handleRefresh} />}
      </S.Title>
      <S.AccountSelect
        value={activeAccount?.id}
        onChange={handleChangeAccount}
        variant="standard"
      >
        {accounts &&
          accounts.map((acc: AccountInfo) => (
            <MenuItem value={acc.id} key={`account_${acc.id}`}>
              {`${acc.accounttype} - ${acc.id}`}
            </MenuItem>
          ))}
      </S.AccountSelect>
    </S.Wrapper>
  );
};
export default PageHeader;
