"use client";
import { IOrder, PortItem } from "@interface/common";
import * as S from "./styles";
import { useAppSelector } from "@src/redux/hooks";
import { use, useEffect, useState } from "react";
import { TOrderActionType } from "@enum/common";
import DataTable from "./components/DataTable";
import PortInfo from "./components/PortInfo";
import PageHeader from "../../common/PageHeader";
import { useTranslations } from "next-intl";
import { useGetPortfolio } from "@/src/services/hooks/useGetPortfolio";
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
  const { isLoading, data, isSuccess, isError } = useGetPortfolio(
    activeAccount?.id || ""
  );
  const t = useTranslations("portfolio");
  const [port, setPort] = useState<PortItem | null>(null);
  const [ports, setPorts] = useState<PortItem[] | []>([]);
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  useEffect(() => {
    data && setPorts(data);
  }, [data]);

  return (
    <S.Wrapper>
      <PageHeader title={t("fn_port_txt_title")} />
      <S.Content>
        <PortInfo />
        <DataTable ports={ports} port={port} setPort={setPort} />
      </S.Content>
      {isLoading && <Loading />}
    </S.Wrapper>
  );
};
export default Portfolio;
