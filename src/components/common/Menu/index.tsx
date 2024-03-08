import React, { useEffect, useState } from "react";
import { Wrapper, MenuItem, MenuImage, MenuText } from "./styles";
import { menus } from "@constants/common";
import { useTranslations } from "next-intl";
import colors from "@src/themes/colors";
import { useLogout } from "@/src/services/hooks/useLogout";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useIdleTimer } from "react-idle-timer";

const Menu = () => {
  const { onLogout, isError, isSuccess } = useLogout();
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

  const onIdle = () => {
    console.log("idle timeout");
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
