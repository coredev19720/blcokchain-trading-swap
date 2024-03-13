import colors from "@src/themes/colors";
import { Button, Select } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 16,
  justifyContent: "space-between",
  alignItems: "center",
}));
export const SideBtn = styled(Button)(() => ({
  borderRadius: 24,
  width: 84,
}));

export const GroupButton = styled("div")(() => ({
  display: "flex",
  background: colors.mn20,
  borderRadius: 24,
}));
