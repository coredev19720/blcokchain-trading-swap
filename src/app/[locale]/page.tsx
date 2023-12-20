import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("dashboard");

  return <h1>{t("txt_welcome")}</h1>;
}
