import colors from "@src/themes/colors";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const Language = styled("div")<{ active?: boolean }>((props) => ({
  borderRadius: 4,
  padding: 4,
  cursor: "pointer",
  ...(props.active ? { border: `1px solid ${colors.sb60}` } : {}),
}));

export const Languages = styled("div")<{ active?: boolean }>((props) => ({
  padding: 16,
  display: "flex",
  gap: 8,
  justifyContent: "center",
}));

export const ThemeWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 16,
  borderBottom: `1px solid ${colors.mn20}`,
  background: colors.neutral4,
}));
