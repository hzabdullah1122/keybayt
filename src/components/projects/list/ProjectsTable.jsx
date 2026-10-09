"use client";

import { Plus } from "lucide-react";
import { DataState, EmptyState } from "@/components/common";
import { Button } from "@/components/ui";
import ProjectRow, { ROW_GRID } from "@/components/projects/list/ProjectRow";
import { Shimmer } from "@/components/common/Shimmer";
import { PROJECT_EMPTY_STATES } from "@/constants/projects";

const COLUMNS = ["Project", "Location", "Price range", "Units", "Match", "Status", ""];

function TableHeader() {
  return (
    <div
      className={`hidden rounded-xl border border-transparent bg-surface p-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted ${ROW_GRID}`}
    >
      {COLUMNS.map((name, i) => (
        <span key={i}>{name}</span>
      ))}
    </div>
  );
}

function RowsShimmer() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Shimmer key={i} className="h-[88px] rounded-2xl" />
      ))}
    </div>
  );
}

/** Project list for one tab: header + rows with loading / error / empty handled. */
export default function ProjectsTable({
  tabId,
  projects,
  loading,
  error,
  onRetry,
  onAdd,
  onOpen,
  renderActions,
}) {
  const emptyCopy = PROJECT_EMPTY_STATES[tabId];

  return (
    <DataState
      loading={loading}
      error={error}
      isEmpty={projects.length === 0}
      onRetry={onRetry}
      loader={<RowsShimmer />}
      empty={
        <EmptyState
          title={emptyCopy.title}
          description={emptyCopy.description}
          action={
            tabId === "all" || tabId === "drafts" ? (
              <Button size="sm" leftIcon={Plus} onClick={onAdd} className="mt-2">
                Add project
              </Button>
            ) : undefined
          }
        />
      }
    >
      <div className="flex flex-col gap-3">
        <TableHeader />
        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            actions={renderActions(project)}
            onOpen={() => onOpen(project)}
          />
        ))}
      </div>
    </DataState>
  );
}
