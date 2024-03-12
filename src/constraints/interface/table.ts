import { ReactElement } from "react";

export interface IColumn {
  title: string | ReactElement;
  key?: string;
  dataIndex?: string;
  style?: React.CSSProperties;
  className?: string;
  noClick?: boolean;
  align?: "left" | "right" | "center";
  render?: (row: any, idx: number) => ReactElement | null;
  isSort?: boolean;
  width?: number;
  isCheck?: boolean;
}


