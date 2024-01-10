import { IMenuItem } from "../interface/common";
import {
  menuIconAccount,
  menuIconTrading,
  menuIconMarket,
  menuIconOrderBook,
  menuIconPort,
  activeMenuIconMarket,
  activeMenuIconOrderBook,
  activeMenuIconPort,
  activeMenuIconTrading,
} from "../images";

export const menus: IMenuItem[] = [
  {
    label: "mn_market",
    icon: menuIconMarket,
    activeIcon: activeMenuIconMarket,
    url: "/market",
  },
  {
    label: "mn_watchlist",
    icon: menuIconPort,
    activeIcon: activeMenuIconPort,
    url: "/portfolio",
  },
  {
    label: "mn_trade",
    icon: menuIconTrading,
    activeIcon: activeMenuIconTrading,
    url: "/trading",
  },
  {
    label: "mn_ordBook",
    icon: menuIconOrderBook,
    activeIcon: activeMenuIconOrderBook,
    url: "/order-book",
  },
  {
    label: "mn_account",
    icon: menuIconAccount,
    activeIcon: menuIconAccount,
    url: "/account",
  },
];
