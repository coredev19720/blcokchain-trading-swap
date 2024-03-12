"use client";
import { IOrder } from "@interface/common";
import * as S from "./styles";
import { useAppSelector } from "@src/redux/hooks";
import { useEffect, useState } from "react";
import { TOrderActionType } from "@enum/common";
import DataTable from "./components/DataTable";
import PortInfo from "./components/PortInfo";
import PageHeader from "../../common/PageHeader";
import { useTranslations } from "next-intl";
import { useGetPortfolio } from "@/src/services/hooks/useGetPortfolio";
type Port = {
  id: string;
  name: string;
  price: number;
  amount: number;
  total: number;
};
const Portfolio = () => {
  const { onGetPortfolio } = useGetPortfolio();
  const t = useTranslations("portfolio");
  const { activeAccount } = useAppSelector((state) => state.user);
  const { ports } = useAppSelector((state) => state.market);
  const [port, setPort] = useState<Port | null>(null);
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  const handleClickOrder = (order: IOrder, type: TOrderActionType) => {
    // dispatch(setOrder(order));
    setType(type);
  };
  useEffect(() => {
    activeAccount && onGetPortfolio(activeAccount?.id);
  }, [activeAccount]);
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
