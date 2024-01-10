import React, { useState } from "react";
import { TableHead, TableRow } from "@mui/material";
import Cell from "./components/Cell";

interface IProps {
  columns: any[];
  dataSource: any[];
  setData: (val: any) => void;
}
const Header = ({ columns, dataSource, setData }: IProps) => {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortWay, setSortWay] = useState<"desc" | "asc" | "">("");

  const sortData = (field: string, way: "desc" | "asc" | "") => {
    const tempData = [...dataSource];
    if (field && way) {
      tempData.sort((a, b) =>
        way === "desc" ? a[field] - b[field] : b[field] - a[field]
      );
    }
    setData(tempData);
  };

  const handleClickToSort = (field: string) => {
    let way: "desc" | "asc" | "" = "";
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
      {columns.map((col: any, index: number) => (
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

Header.defaultProps = {
  columns: [],
};

export default Header;
