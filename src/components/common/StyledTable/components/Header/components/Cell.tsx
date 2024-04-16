import React from "react";
import { TableCell, Typography } from "@mui/material";
import { HeadCellWrapper, HeaderShorter } from "../../../styles";
import colors from "@src/themes/colors";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { TShortSide } from "@/src/constraints/enum/common";
import { IColumn } from "@/src/constraints/interface/table";
interface IProps {
  col: IColumn;
  handleClick: (e: string) => void;
  sortKey: string;
  sortWay: string;
}
const Cell = ({ col, sortKey, sortWay, handleClick }: IProps) => {
  const renderSorter = (col: IColumn) => {
    return (
      <HeaderShorter
        onClick={() => {
          col.dataIndex && handleClick(col.dataIndex);
        }}
      >
        <ArrowDropUp
          style={{
            color:
              sortKey === col.dataIndex && sortWay === "desc"
                ? colors.p100
                : colors.p300,
          }}
        />
        <ArrowDropDown
          style={{
            color:
              sortKey === col.dataIndex && sortWay === "asc"
                ? colors.p100
                : colors.p300,
          }}
        />
      </HeaderShorter>
    );
  };
  return (
    <TableCell className={col.className} variant="head">
      {col.isCheck ? (
        <>{col.title}</>
      ) : (
        <HeadCellWrapper isSort={col.isSort}>
          <Typography
            align={col.align || "left"}
            variant="subtitle2"
            fontWeight="400"
            color={colors.p300}
          >
            {col.title}
          </Typography>
          {col.isSort && renderSorter(col)}
        </HeadCellWrapper>
      )}
    </TableCell>
  );
};
export default Cell;
