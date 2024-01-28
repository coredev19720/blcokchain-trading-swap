import { FlexContent } from "@/src/styles/common";
import * as S from "./styles";
import { Typography } from "@mui/material";
import { IOrder } from "@/src/interface/common";
import { formatNumber } from "@/src/utils/helpers";
import Line from "@/src/components/common/Line";
import { useTranslations } from "next-intl";
interface IProps {
  data: IOrder | null;
  handleClose: () => void;
}
const Detail = ({ data, handleClose }: IProps) => {
  const t = useTranslations("order_book");
  return (
    <>
      <S.Content>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_type")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {data?.type}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_status")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {data?.status}
          </Typography>
        </FlexContent>
        <Line />
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_qty")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {data?.vol}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_order_value")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {formatNumber(data?.totalValue || 0)}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_match_qty")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {formatNumber(data?.execQty || 0)}
          </Typography>
        </FlexContent>
        <Line />
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_match_remainQty")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {formatNumber(data?.pendingQty || 0)}
          </Typography>
        </FlexContent>
        <FlexContent>
          <Typography variant="body2" color="text.secondary">
            {t("en_ord_match_value")}
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {formatNumber(data?.execValue || 0)}
          </Typography>
        </FlexContent>
      </S.Content>
    </>
  );
};
export default Detail;
