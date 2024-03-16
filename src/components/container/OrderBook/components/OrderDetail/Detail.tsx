import * as S from "./styles";
import { OrderInfo } from "@interface/market";
import { formatNumber } from "@src/utils/helpers";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import RowContent from "@components/common/RowContent";
import Line from "@components/common/Line";

interface IProps {
  data: OrderInfo | null;
}

const Detail = ({ data }: IProps) => {
  const t = useTranslations("order_book");
  return (
    <>
      <S.Content>
        <RowContent
          leftTxt={t("en_ord_order_type")}
          rightTxt={data?.pricetype}
        />
        <RowContent
          leftTxt={t("en_ord_order_status")}
          rightTxt={data?.en_status}
        />
        <Line />
        <RowContent
          leftTxt={t("en_ord_order_qty")}
          rightTxt={formatNumber(data?.qtty || 0)}
        />
        <RowContent
          leftTxt={t("en_ord_order_value")}
          rightTxt={formatNumber(data ? data.qtty * data.price : 0)}
        />
        <RowContent
          leftTxt={t("en_ord_match_qty")}
          rightTxt={formatNumber(data?.execqtty || 0)}
        />
        <Line />
        <RowContent
          leftTxt={t("en_ord_match_remainQty")}
          rightTxt={formatNumber(data?.remainqtty || 0)}
        />
        <RowContent
          leftTxt={t("en_ord_match_value")}
          rightTxt={formatNumber(data ? data.execprice : 0)}
        />
      </S.Content>
      <RowContent
        leftTxt={t("en_ord_order_custodyCd")}
        rightTxt={data?.custodycd}
        isChild
      />
      <RowContent
        leftTxt={t("en_ord_order_accNo")}
        rightTxt={data?.afacctno}
        isChild
      />
      <RowContent
        leftTxt={t("en_ord_order_timestamp")}
        rightTxt={
          data?.odtimestamp
            ? dayjs(data.odtimestamp).format("YYYY-MM-DD HH:mm:ss")
            : "-"
        }
        isChild
      />
    </>
  );
};
export default Detail;
