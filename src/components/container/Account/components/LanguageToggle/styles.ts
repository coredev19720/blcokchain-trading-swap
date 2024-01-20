import colors from "@/src/themes/colors";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  padding: 16,
  display: "flex",
  gap: 8,
  justifyContent: "center",
}));

export const Language = styled("div")<{ active?: boolean }>((props) => ({
  borderRadius: 4,
  padding: 4,
  cursor: "pointer",
  ...(props.active ? { border: `1px solid ${colors.sb60}` } : {}),
}));
