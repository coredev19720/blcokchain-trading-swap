"use client";
import { PortItem } from "@interface/market";
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
import { useAppDispatch } from "@src/redux/hooks";
import { setPorts } from "@src/redux/features/marketSlice";
type Port = {
  id: string;
  name: string;
  price: number;
  amount: number;
  total: number;
};
const Portfolio = () => {
  const dispatch = useAppDispatch();
  const { activeAccount } = useAppSelector((state) => state.user);
  const { ports } = useAppSelector((state) => state.market);
  const { isLoading, data, isSuccess, isError } = useGetPortfolio(
    activeAccount?.id || ""
  );
  const t = useTranslations("portfolio");
  const [port, setPort] = useState<PortItem | null>(null);
  useEffect(() => {
    data && dispatch(setPorts(data));
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
