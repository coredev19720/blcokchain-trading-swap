import React, { useState } from "react";
import { TableHead, TableRow } from "@mui/material";
import Cell from "./components/Cell";
import { IColumn } from "@/src/constraints/interface/table";
import { TShortWay } from "@/src/constraints/enum/common";

interface IProps {
  columns: IColumn[];
  dataSource: any[];
  setData: (val: any) => void;
}
const Header = ({ columns, dataSource, setData }: IProps) => {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortWay, setSortWay] = useState<TShortWay>("");

  const sortData = (field: string, way: TShortWay) => {
    const tempData = [...dataSource];
    if (field && way) {
      const dataType = typeof tempData[0][field];
      dataType === "number" &&
        tempData.sort((a, b) =>
          way === "desc" ? a[field] - b[field] : b[field] - a[field]
        );
      dataType === "string" &&
        tempData.sort((a, b) =>
          way === "desc"
            ? a[field].localeCompare(b[field])
            : b[field].localeCompare(a[field])
        );
    }
    setData(tempData);
  };

  const handleClickToSort = (field: string) => {
    let way: TShortWay;
    if (field === sortKey) {
      switch (sortWay) {
        case "desc":
          way = "";
          break;
        case "asc":
          way = "desc";
          break;
        default:
          way = "asc";
          break;
      }
    } else {
      setSortKey(field);
      way = "asc";
    }
    setSortWay(way);
    sortData(field, way);
  };
  const renderRow = (
    <TableRow>
      {columns.map((col: IColumn, index: number) => (
        <Cell
          col={col}
          key={`${col.key}_${index}`}
          handleClick={handleClickToSort}
          sortKey={sortKey}
          sortWay={sortWay}
        />
      ))}
    </TableRow>
  );
  return <TableHead>{renderRow}</TableHead>;
};

export default Header;
