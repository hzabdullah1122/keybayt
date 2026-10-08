import { LayoutDashboard } from "lucide-react";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { PiBuildingsLight, PiBuildingsThin } from "react-icons/pi";

/** Sidebar menu. Add a new tab by adding an item here. */
export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "projects",
    label: "Projects",
    icon: PiBuildingsLight  ,
  },
];

export const DEFAULT_TAB = "dashboard";

export const LOGOS = {
  complete: "/dashboard_images/keybayt_completeLogo.png",
  completeWhite: "/dashboard_images/keybayt_completeLogoWhite.png",
  short: "/dashboard_images/keybayt_shortLogo.png",
};
