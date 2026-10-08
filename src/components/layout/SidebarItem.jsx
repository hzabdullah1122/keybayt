"use client";

import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

/** One sidebar tab. Icon stays fixed in place; only the label animates in/out. */
export default function SidebarItem({ item, active, collapsed, onSelect }) {
  const Icon = item.icon;

  return (
    <li>
      <Tooltip label={item.label} disabled={!collapsed}>
        <button
          type="button"
          onClick={onSelect}
          aria-current={active ? "page" : undefined}
          className={cn(
            "group/item relative flex h-11 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 text-sm font-semibold outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/60",
            collapsed && "lg:ml-0.5 lg:h-10 lg:w-10 lg:rounded-lg lg:pl-[11px]",
            active
              ? "bg-white text-primary"
              : "text-white/80 hover:bg-white/15 hover:text-white",
          )}
        >
          <Icon
            size={20}
            strokeWidth={active ? 2.25 : 1.75}
            className={cn("shrink-0 transition-all duration-300", collapsed && "lg:size-[18px]")}
          />
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-300",
              collapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-[160px] opacity-100",
            )}
          >
            {item.label}
          </span>
        </button>
      </Tooltip>
    </li>
  );
}
