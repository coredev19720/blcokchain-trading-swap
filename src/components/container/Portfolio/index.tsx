"use client";
import { IOrder } from "@interface/common";
import * as S from "./styles";
import { useAppSelector } from "@src/redux/hooks";
import { use, useEffect, useState } from "react";
import { TOrderActionType } from "@enum/common";
import DataTable from "./components/DataTable";
import PortInfo from "./components/PortInfo";
import PageHeader from "../../common/PageHeader";
import { useTranslations } from "next-intl";
import { useGetPortfolio } from "@/src/services/hooks/useGetPortfolio";
import { setPorts } from "@/src/redux/features/marketSlice";
import { useAppDispatch } from "@src/redux/hooks";
import Loading from "../../common/Loading";
type Port = {
  id: string;
  name: string;
  price: number;
  amount: number;
  total: number;
};
const Portfolio = () => {
  const { activeAccount } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { isLoading, data, isSuccess, isError } = useGetPortfolio(
    activeAccount?.id || ""
  );
  const t = useTranslations("portfolio");
  const [port, setPort] = useState<Port | null>(null);
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  useEffect(() => {
    data && dispatch(setPorts(data));
  }, [data]);
  const handleClickOrder = (order: IOrder, type: TOrderActionType) => {
    // dispatch(setOrder(order));
    setType(type);
  };
  return (
    <S.Wrapper>
      <PageHeader title={t("fn_port_txt_title")} />
      <S.Content>
        <PortInfo />
        <DataTable />
      </S.Content>
      {isLoading && <Loading />}
    </S.Wrapper>
  );
};
export default Portfolio;
