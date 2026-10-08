"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useLocalStorageBoolean } from "@/hooks/useLocalStorage";
import Sidebar from "@/components/layout/Sidebar";
import { LOGOS } from "@/constants/navigation";

const STORAGE_KEY = "sidebar-collapsed";

/** Dashboard frame: sidebar + (mobile top bar) + page content. */
export default function DashboardShell({ children }) {
  const [collapsed, setCollapsed] = useLocalStorageBoolean(STORAGE_KEY, false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div className="flex min-h-dvh bg-primary">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col bg-surface lg:h-dvh lg:overflow-y-auto lg:rounded-l-3xl">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="cursor-pointer rounded-lg p-1.5 text-foreground transition-colors hover:bg-surface"
          >
            <Menu size={22} />
          </button>
          <Image src={LOGOS.complete} alt="Keybayt" width={99} height={36} className="h-8 w-auto" />
        </header>

        <main className="flex flex-1 flex-col p-4 sm:p-6 2xl:p-8">{children}</main>
      </div>
    </div>
  );
}
