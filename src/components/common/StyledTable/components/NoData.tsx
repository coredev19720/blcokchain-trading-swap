import React from "react";
import { TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  width: "100%",
  padding: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
interface IProps {
  colSpan: number;
}
const NoData = ({ colSpan }: IProps) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Wrapper>
            <Typography variant="body2" fontWeight="500" color="text.secondary">
              Chưa có dữ liệu
            </Typography>
          </Wrapper>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
export default NoData;
