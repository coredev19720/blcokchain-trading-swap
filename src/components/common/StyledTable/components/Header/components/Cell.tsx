import React from "react";
import { TableCell, Typography } from "@mui/material";
import { HeadCellWrapper } from "../../../styles";
import colors from "@/src/themes/colors";
interface IProps {
  col: any;
  handleClick: (e: string) => void;
  sortKey: string;
  sortWay: string;
}
const Cell = ({ col, sortKey, sortWay, handleClick }: IProps) => {
  return (
    <TableCell className={col.className} variant="head">
      {col.isCheck ? (
        <>{col.title}</>
      ) : (
        <HeadCellWrapper className={col.isSort ? "isSort" : ""}>
          <Typography
            align={col.align || "left"}
            variant="body2"
            fontWeight="400"
            color={colors.p300}
          >
            {col.title}
          </Typography>
        </HeadCellWrapper>
      )}
    </TableCell>
  );
};
export default Cell;
