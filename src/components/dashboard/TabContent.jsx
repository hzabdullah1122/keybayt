"use client";

import DashboardView from "@/components/dashboard/DashboardView";
import ProjectsView from "@/components/dashboard/ProjectsView";
import { useActiveTab } from "@/context/ActiveTabContext";

const VIEWS = {
  dashboard: DashboardView,
  projects: ProjectsView,
};

/**
 * Renders every tab view but only shows the active one. Views stay mounted so
 * form data typed in one tab is never lost when switching tabs.
 */
export default function TabContent() {
  const { activeTab } = useActiveTab();

  return Object.entries(VIEWS).map(([id, View]) => (
    <div key={id} hidden={id !== activeTab} className="flex flex-1 flex-col">
      <View />
    </div>
  ));
}
