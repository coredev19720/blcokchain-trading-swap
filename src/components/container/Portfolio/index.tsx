"use client";
import { PortItem } from "@interface/market";
import * as S from "./styles";
import { useAppSelector } from "@src/redux/hooks";
import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import PortInfo from "./components/PortInfo";
import { PageHeader, Loading } from "@components/common";
import { useTranslations } from "next-intl";
import { useGetPortfolio } from "@/src/services/hooks/useGetPortfolio";
import { useAppDispatch } from "@src/redux/hooks";
import { setPorts } from "@src/redux/features/marketSlice";

const Portfolio = () => {
  const dispatch = useAppDispatch();
  const { activeAccount } = useAppSelector((state) => state.user);
  const { ports } = useAppSelector((state) => state.market);
  const { isLoading, data } = useGetPortfolio(activeAccount?.id || "");
  const t = useTranslations("portfolio");
  const [port, setPort] = useState<PortItem | null>(null);
  useEffect(() => {
    data && dispatch(setPorts(data));
  }, [data]);

  return (
    <S.Wrapper>
      <PageHeader title={t("fn_port_txt_title")} portRefresh />
      <S.Content>
        <PortInfo />
        <DataTable ports={ports || []} port={port} setPort={setPort} />
      </S.Content>
      {isLoading && <Loading />}
    </S.Wrapper>
  );
};
export default Portfolio;
