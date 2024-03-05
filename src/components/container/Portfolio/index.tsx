"use client";
import { IOrder } from "@interface/common";
import Header from "./components/Header";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { useState } from "react";
import { TOrderActionType } from "@enum/common";
import { setOrder } from "@src/redux/features/marketSlice";
import DataTable from "./components/DataTable";
import PortInfo from "./components/PortInfo";
const Portfolio = () => {
  const order = useAppSelector((state) => state.market.order);
  const dispatch = useAppDispatch();
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  const handleClickOrder = (order: IOrder, type: TOrderActionType) => {
    dispatch(setOrder(order));
    setType(type);
  };
  return (
    <S.Wrapper>
      <Header />
      <S.Content>
        <PortInfo />
        <DataTable />
      </S.Content>
    </S.Wrapper>
  );
};
export default Portfolio;
