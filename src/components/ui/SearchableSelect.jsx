"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SEARCH_DEBOUNCE_MS = 450;

/**
 * Dropdown with a search box.
 * options: [{ value, label }]   onChange receives the selected value.
 * Optional remote search: `onSearch(query) => Promise<[{ value, label }]>` is called (debounced)
 * once the query has `minSearchLength` characters; its results are shown after the local options.
 */
export default function SearchableSelect({
  options = [],
  value,
  onChange,
  label,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  onSearch,
  minSearchLength = 2,
  error,
  disabled = false,
  className,
  triggerClassName,
  menuClassName,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [remote, setRemote] = useState([]);
  const [searching, setSearching] = useState(false);
  const rootRef = useRef(null);
  const timerRef = useRef(null);
  const requestRef = useRef(0);

  const selected = options.find((o) => o.value === value) ?? remote.find((o) => o.value === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const local = q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
    const extra = remote.filter((r) => !local.some((o) => o.value === r.value));
    return [...local, ...extra];
  }, [options, remote, query]);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleQuery = (text) => {
    setQuery(text);
    if (!onSearch) return;

    clearTimeout(timerRef.current);
    const q = text.trim();
    if (q.length < minSearchLength) {
      requestRef.current += 1;
      setRemote([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const id = ++requestRef.current;
    timerRef.current = setTimeout(async () => {
      try {
        const results = await onSearch(q);
        if (id === requestRef.current) setRemote(results);
      } catch {
        if (id === requestRef.current) setRemote([]);
      } finally {
        if (id === requestRef.current) setSearching(false);
      }
    }, SEARCH_DEBOUNCE_MS);
  };

  const toggle = () => {
    if (disabled) return;
    setOpen((o) => !o);
    setQuery("");
    setRemote([]);
    setSearching(false);
  };

  const select = (option) => {
    onChange?.(option.value);
    setOpen(false);
  };

  const emptyMessage = searching
    ? "Searching..."
    : onSearch && query.trim().length < minSearchLength
      ? "Type to search"
      : emptyText;

  return (
    <div ref={rootRef} className={cn("relative flex w-full flex-col gap-1.5", className)}>
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}

      <button
        type="button"
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:bg-surface",
          error ? "border-danger" : "border-border",
          triggerClassName,
        )}
      >
        <span className={cn("truncate", !selected && "text-placeholder")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn("text-muted transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-1 w-full min-w-[180px] overflow-hidden rounded-lg border border-border bg-background shadow-lg",
            menuClassName,
          )}
        >
          <div className="relative border-b border-border p-2">
            <Search
              size={14}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-placeholder"
            />
            <input
              autoFocus
              value={query}
              onChange={(e) => handleQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-8 w-full rounded-md bg-surface pl-8 pr-2 text-sm outline-none placeholder:text-placeholder"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-4 text-center text-sm text-muted">{emptyMessage}</li>
            ) : (
              filtered.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => select(option)}
                    className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-sm hover:bg-primary-light"
                  >
                    <span className="truncate">{option.label}</span>
                    {option.value === value && <Check size={14} className="text-primary" />}
                  </button>
                </li>
              ))
            )}
            {searching && filtered.length > 0 && (
              <li className="px-3 py-2 text-center text-xs text-muted">Searching...</li>
            )}
          </ul>
        </div>
      )}

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
