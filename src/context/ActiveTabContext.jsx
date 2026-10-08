"use client";

import { createContext, useContext, useState } from "react";
import { DEFAULT_TAB } from "@/constants/navigation";

const ActiveTabContext = createContext(null);

/** Holds the active sidebar tab so the URL stays /dashboard while content switches. */
export function ActiveTabProvider({ children }) {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
}

export function useActiveTab() {
  const ctx = useContext(ActiveTabContext);
  if (!ctx) throw new Error("useActiveTab must be used inside ActiveTabProvider");
  return ctx;
}
