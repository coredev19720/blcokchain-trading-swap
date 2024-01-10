import React from "react";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  display: "flex",
  padding: 8,
  alignItems: "center",
  justifyContent: "center",
});

const Loading = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};

export default Loading;
