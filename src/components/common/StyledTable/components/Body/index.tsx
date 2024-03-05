import React, { ReactElement } from "react";
import { TableBody, TableCell, Typography } from "@mui/material";
import { IColumn } from "@interface/table";
import { StyledRow } from "./styles";
interface IProps {
  data: any[];
  columns: IColumn[];
  selected?: number | null;
  rowClick?: (e: any, key: number) => void;
}

const Body = ({ data, columns, rowClick, selected }: IProps) => {
  const rowContent = (row: any, col: IColumn, idx: number) => {
    if (col.render) {
      return col.render(row, idx);
    }
    if (col.dataIndex) {
      return <Typography fontWeight={500}>{row[col.dataIndex]}</Typography>;
    }
    return null;
  };
  return (
    <TableBody>
      {data.map((row: any, idx: any) => (
        <StyledRow
          key={`${idx}_row`}
          hoverable={!!rowClick}
          selected={selected === idx}
        >
          {columns.map((col, index) => (
            <TableCell
              key={`${col.key}-${index}`}
              style={{
                textAlign: col.align || "left",
                ...(col.style ? col.style : {}),
              }}
              onClick={
                rowClick && !col.noClick ? () => rowClick(row, idx) : undefined
              }
              className={`${col.className}`}
            >
              {rowContent(row, col, idx)}
            </TableCell>
          ))}
        </StyledRow>
      ))}
    </TableBody>
  );
};
export default Body;
