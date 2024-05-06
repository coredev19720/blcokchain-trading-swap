"use client";
import React, { useEffect, useState } from "react";
import { Table } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { TableWrapper } from "./styles";
import Loading from "./components/Loading";
import NoData from "./components/NoData";
import Body from "./components/Body";
import { IColumn } from "@interface/table";

export interface IProps {
  dataSource: any[];
  onScroll?: (e: any) => void;
  offHeader?: boolean;
  loading?: boolean;
  columns: IColumn[];
  stickyHeader?: boolean;
  height?: number;
  rowClick?: (e: any, key: number) => void;
  columnsFooter?: IColumn[];
  layout?: "auto" | "fixed";
  width?: number;
  selected?: number | null;
  styles?: React.CSSProperties;
}

const StyledTable = ({
  dataSource,
  loading,
  onScroll,
  offHeader,
  columns,
  stickyHeader,
  height,
  rowClick,
  columnsFooter,
  layout,
  width,
  selected,
  styles,
}: IProps) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([...dataSource]);
  }, [dataSource]);

  const renderColGroup = (
    <colgroup>
      {columns.map((col, index) => (
        <col
          style={{ ...(col.width ? { width: col.width } : {}) }}
          key={`col_${index}`}
        ></col>
      ))}
    </colgroup>
  );

  return (
    <TableWrapper
      onScroll={onScroll}
      style={{
        ...(styles || {}),
        height: height ?? "auto",
        tableLayout: layout,
      }}
    >
      <Table
        stickyHeader={stickyHeader}
        style={{
          minWidth: width,
          width: "100%",
          overflow: "auto",
        }}
      >
        {renderColGroup}
        {!offHeader && (
          <Header columns={columns} dataSource={dataSource} setData={setData} />
        )}
        {dataSource.length ? (
          <>
            <Body
              data={data}
              columns={columns}
              rowClick={rowClick}
              selected={selected}
            />
            {columnsFooter && <Footer columns={columnsFooter} />}
          </>
        ) : (
          <NoData colSpan={columns.length} />
        )}
        {loading && <Loading />}
      </Table>
    </TableWrapper>
  );
};

export default StyledTable;
