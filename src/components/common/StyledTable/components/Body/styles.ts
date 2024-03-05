import { TableRow } from "@mui/material";
import colors from "@src/themes/colors";
import { styled } from "@mui/system";
interface IRowProps {
  hoverable: boolean;
}
export const StyledRow = styled(TableRow)<IRowProps>(
  ({ theme, hoverable }) => ({
    cursor: hoverable ? "pointer" : "normal",
    "&:hover": {
      ...(hoverable
        ? {
            backgroundColor:
              theme.palette.mode === "light" ? colors.ln10 : colors.dn20,
          }
        : {}),
    },
  })
);
