import { styled } from "@mui/system";
import { Typography } from "@mui/material";
const Wrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const EmptyState = () => (
  <Wrapper>
    <Typography>EmptyState</Typography>
  </Wrapper>
);
export default EmptyState;
