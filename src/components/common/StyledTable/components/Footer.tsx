import React from "react";
import { TableFooter, TableRow, TableCell, Typography } from "@mui/material";
import { IColumn } from "@interface/table";

interface IProps {
  columns: IColumn[];
}
const Footer = ({ columns }: IProps) => {
  return (
    <TableFooter>
      <TableRow>
        {columns.map((col: IColumn, index: number) => (
          <TableCell
            key={`${col.key}-${index}`}
            style={col.style ? { ...col.style } : {}}
          >
            {typeof col.title === "string" ? (
              <Typography align={col.align ?? "left"} fontWeight={500}>
                {col.title}
              </Typography>
            ) : (
              col.title
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableFooter>
  );
};

export default Footer;
