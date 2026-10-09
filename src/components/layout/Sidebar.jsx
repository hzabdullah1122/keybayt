"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { ConfirmModal } from "@/components/common";
import Tooltip from "@/components/ui/Tooltip";
import SidebarItem from "@/components/layout/SidebarItem";
import { DEFAULT_TAB, LOGOS, NAV_ITEMS } from "@/constants/navigation";
import { useActiveTab } from "@/context/ActiveTabContext";
import { useToast } from "@/context/ToastContext";
import { authService } from "@/services/authService";
import { cn } from "@/lib/utils";

const LOGOUT_ITEM = { id: "logout", label: "Log out", icon: LogOut };

/**
 * Desktop: collapsible (264px <-> 80px) with smooth width/label/logo transitions.
 * Mobile: off-canvas drawer with a backdrop.
 */
export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}) {
  const { activeTab, setActiveTab } = useActiveTab();
  const toast = useToast();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const confirmLogout = () => {
    setLogoutOpen(false);
    onMobileClose();
    authService.logout();
    toast.success("You have been logged out.", { title: "See you soon" });
  };

  // Clicking empty sidebar space (not a tab/button/link) toggles collapse on desktop.
  const handleAsideClick = (e) => {
    if (e.target.closest("button, a")) return;
    if (window.matchMedia("(min-width: 1024px)").matches) onToggleCollapse();
  };

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-30 bg-overlay backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        onClick={handleAsideClick}
        className={cn(
          "group/side fixed inset-y-0 left-0 z-40 flex h-dvh w-[232px] flex-col bg-primary",
          "transition-[width,translate] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "lg:sticky lg:top-0 lg:translate-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-[68px] lg:cursor-e-resize" : "lg:w-[232px] lg:cursor-w-resize",
        )}
      >
        {/* Header: logo + collapse toggle */}
        <div
          className={cn(
            "flex h-[72px] shrink-0 items-center px-5 transition-all duration-300",
            collapsed ? "lg:justify-center lg:px-0" : "justify-between",
          )}
        >
          <Link
            href="/dashboard"
            onClick={() => {
              setActiveTab(DEFAULT_TAB);
              onMobileClose();
            }}
            aria-label="Keybayt home"
            className={cn("shrink-0 outline-none", collapsed && "lg:group-hover/side:hidden")}
          >
            <Image
              src={LOGOS.completeWhite}
              alt="Keybayt"
              width={297}
              height={108}
              priority
              className={cn("h-12 w-auto", collapsed && "lg:hidden")}
            />
            <Image
              src={LOGOS.short}
              alt=""
              width={79}
              height={73}
              priority
              className={cn("hidden h-8 w-auto", collapsed && "lg:block")}
            />
          </Link>

          <Tooltip label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                "hidden h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/80 transition-colors duration-200 hover:bg-white/15 hover:text-white",
                collapsed ? "lg:group-hover/side:flex" : "lg:flex",
              )}
            >
              {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
          </Tooltip>

          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close menu"
            className="cursor-pointer rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                collapsed={collapsed}
                active={activeTab === item.id}
                onSelect={() => {
                  setActiveTab(item.id);
                  onMobileClose();
                }}
              />
            ))}
          </ul>
        </nav>

        <div className="shrink-0 px-3 pb-4">
          <ul>
            <SidebarItem
              item={LOGOUT_ITEM}
              collapsed={collapsed}
              active={false}
              onSelect={() => setLogoutOpen(true)}
            />
          </ul>
        </div>
      </aside>

      {/* Outside the <aside> so its transform never affects the modal's fixed position. */}
      <ConfirmModal
        open={logoutOpen}
        icon={LogOut}
        title="Log out?"
        message={"You will need to log in again to access your projects."}
        confirmLabel="Log out"
        onConfirm={confirmLogout}
        onCancel={() => setLogoutOpen(false)}
      />
    </>
  );
}
