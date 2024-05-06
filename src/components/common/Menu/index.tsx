import React, { useEffect, useState } from "react";
import { Wrapper, MenuItem, MenuImage, MenuText } from "./styles";
import { menus } from "@constants/common";
import { useTranslations } from "next-intl";
import colors from "@src/themes/colors";
import { useRouter, usePathname } from "next/navigation";
import { useIdleTimer } from "react-idle-timer";
import {
  useLogout,
  useGetAccountSummary,
  useFetchInitData,
  useSetCurrentAcc,
} from "@/src/services/hooks";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import Cookies from "js-cookie";
import { setActiveAccount } from "@src/redux/features/userSlice";
import { TAccountType } from "@/src/constraints/enum/common";
const Menu = () => {
  const { onSetCurrentAcc } = useSetCurrentAcc();
  const { activeAccount, accounts } = useAppSelector((state) => state.user);
  const { refetch: fetchData } = useFetchInitData();
  const { onLogout } = useLogout();
  const dispatch = useAppDispatch();
  useGetAccountSummary(activeAccount?.id ?? "");
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("menu");
  const [idleTime, setIdleTime] = useState<number>(1800);
  useEffect(() => {
    if (accounts.length) {
      const defaultAcc =
        accounts.find((acc) => acc.accounttype === TAccountType.THUONG) ??
        accounts[0];
      dispatch(setActiveAccount(defaultAcc));
    }
  }, [accounts]);
  useEffect(() => {
    if (activeAccount) {
      console.log("onSetCurrentAcc", activeAccount.id);
      onSetCurrentAcc({ afacctno: activeAccount.id });
    }
  }, [activeAccount?.id]);
  useEffect(() => {
    const idle = window.localStorage.getItem(
      process.env.NEXT_PUBLIC_IDLE_STO_NAME ?? "idle_time"
    );
    if (idle) {
      setIdleTime(parseInt(idle));
    }
    const accessToken = Cookies.get(
      process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string
    );
    if (accessToken) {
      !activeAccount && fetchData();
    }
  }, []);

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
    if (!url) {
      return;
    }
    router.push(url);
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
