import {
  HiOutlineViewGrid,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineLogout,
} from "react-icons/hi";
import { GrUserPolice } from "react-icons/gr";
import { RiBusFill } from "react-icons/ri";
import { TbRouteAltLeft } from "react-icons/tb";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "users",
    label: "users",
    path: "/users",
    icon: <HiOutlineUsers />,
  },
  {
    key: "drivers",
    label: "drivers",
    path: "/drivers",
    icon: <GrUserPolice />,
  },
  {
    key: "busses",
    label: "busses",
    path: "/busses",
    icon: <RiBusFill />,
  },
  {
    key: "routes",
    label: "routes",
    path: "/routes",
    icon: <TbRouteAltLeft />,
  },
  {
    key: "complaints",
    label: "complaints",
    path: "/complaints",
    icon: <HiOutlineAnnotation />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  // {
  //   key: "support",
  //   label: "Help & Support",
  //   path: "/support",
  //   icon: <HiOutlineQuestionMarkCircle />,
  // },
];
