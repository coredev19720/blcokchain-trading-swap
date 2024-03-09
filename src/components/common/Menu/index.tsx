import React, { useEffect, useState } from "react";
import { Wrapper, MenuItem, MenuImage, MenuText } from "./styles";
import { menus } from "@constants/common";
import { useTranslations } from "next-intl";
import colors from "@src/themes/colors";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useIdleTimer } from "react-idle-timer";
import { useLogout } from "@/src/services/hooks/useLogout";
import { useGetAccounts } from "@/src/services/hooks/useGetAccounts";
import { useGetPermissionInfo } from "@/src/services/hooks/useGetPermissionInfo";
import { useGetAuthorityInfo } from "@/src/services/hooks/useGetAuthorityInfo";
import { useGetAccountSummary } from "@/src/services/hooks/useGetAccountSummary";
import { useGetInstruments } from "@/src/services/hooks/useGetInstruments";
import { useAppSelector } from "@/src/redux/hooks";
import Cookies from "js-cookie";
const Menu = () => {
  const { accounts, permissions, customerInfo, activeAccount } = useAppSelector(
    (state) => state.user
  );
  const { stocks } = useAppSelector((state) => state.market);
  const { onLogout, isError, isSuccess } = useLogout();
  const { onGetAccounts } = useGetAccounts();
  const { onGetPermission } = useGetPermissionInfo();
  const { onGetAuthorityInfo } = useGetAuthorityInfo();
  const { onGetAccountSummary } = useGetAccountSummary();
  const { onGetInstruments } = useGetInstruments();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("menu");
  const [idleTime, setIdleTime] = useState<number>(1800);

  useEffect(() => {
    const idle = window.localStorage.getItem(
      process.env.NEXT_PUBLIC_IDLE_STO_NAME || "idle_time"
    );
    if (idle) {
      setIdleTime(parseInt(idle));
    }
    const accessToken = Cookies.get(
      process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string
    );
    if (accessToken) {
      !accounts.length && onGetAccounts();
      !permissions?.length && onGetPermission();
      !customerInfo && onGetAuthorityInfo();
      !stocks.length && onGetInstruments();
    }
  }, []);
  useEffect(() => {
    if (isSuccess || isError) {
      const locale = params?.locale;
      if (locale) {
        router.push(`/${locale}/login`);
      }
      router.push("/");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (activeAccount) {
      const { id } = activeAccount;
      onGetAccountSummary(id);
    }
  }, [activeAccount]);

  const onIdle = () => {
    onLogout();
  };
  useIdleTimer({
    onIdle,
    timeout: idleTime * 1000,
    promptTimeout: 0,
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
      "visibilitychange",
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    syncTimers: 0,
  });
  const goToDestination = (url: string) => () => {
    router.push(`/${params?.locale}${url}`);
  };
  const Menu = menus.map((menu, index) => {
    return (
      <MenuItem
        key={`menu_${index}_${menu.label}`}
        onClick={() => {
          if (!pathname?.includes(menu.url)) {
            goToDestination(menu.url)();
          }
        }}
      >
        <MenuImage
          src={pathname?.includes(menu.url) ? menu.activeIcon : menu.icon}
          alt=""
          width={pathname?.includes(menu.url) ? 40 : 24}
          height={pathname?.includes(menu.url) ? 40 : 24}
        />
        <MenuText
          variant="subtitle2"
          noWrap
          color={colors.threeRest}
          style={{
            fontSize: pathname?.includes(menu.url) ? 0 : 13,
            lineHeight: pathname?.includes(menu.url) ? 0 : 1,
          }}
        >
          {t(menu.label)}
        </MenuText>
      </MenuItem>
    );
  });
  return <Wrapper>{Menu}</Wrapper>;
};
export default Menu;
