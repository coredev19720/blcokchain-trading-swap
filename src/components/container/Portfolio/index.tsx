"use client";
import { IOrder } from "@interface/common";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { useState } from "react";
import { TOrderActionType } from "@enum/common";
import { setOrder } from "@src/redux/features/marketSlice";
import DataTable from "./components/DataTable";
import PortInfo from "./components/PortInfo";
import PageHeader from "../../common/PageHeader";
import { useTranslations } from "next-intl";
const Portfolio = () => {
  const t = useTranslations("portfolio");
  const order = useAppSelector((state) => state.market.order);
  const dispatch = useAppDispatch();
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  const handleClickOrder = (order: IOrder, type: TOrderActionType) => {
    dispatch(setOrder(order));
    setType(type);
  };
  return (
    <S.Wrapper>
      <PageHeader title={t("fn_port_txt_title")} />
      <S.Content>
        <PortInfo />
        <DataTable />
      </S.Content>
    </S.Wrapper>
  );
};
export default Portfolio;
