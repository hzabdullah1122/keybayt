"use client";

import { useMemo } from "react";
import MatchReadinessCard from "@/components/projects/sidebar/MatchReadinessCard";
import AmenitiesCard from "@/components/projects/detail/AmenitiesCard";
import DetailHeader from "@/components/projects/detail/DetailHeader";
import DetailHero from "@/components/projects/detail/DetailHero";
import LicensesCard from "@/components/projects/detail/LicensesCard";
import LocationCard from "@/components/projects/detail/LocationCard";
import MediaCard from "@/components/projects/detail/MediaCard";
import OverviewCard from "@/components/projects/detail/OverviewCard";
import PaymentCard from "@/components/projects/detail/PaymentCard";
import SpecsCard from "@/components/projects/detail/SpecsCard";
import TimelineCard from "@/components/projects/detail/TimelineCard";
import UnitsCard from "@/components/projects/detail/UnitsCard";
import { INITIAL_PROJECT_FORM } from "@/constants/projects";
import { getReadiness, summarizeUnits } from "@/lib/projectMetrics";

/**
 * Full read-only view of one project: hero with key figures, then every section of the
 * add-project form, plus readiness and activity in a sticky side column.
 */
export default function ProjectDetailView({ project, onBack, actions }) {
  // Older drafts may miss newer fields, so fill them from the defaults.
  const values = useMemo(() => ({ ...INITIAL_PROJECT_FORM, ...project.values }), [project.values]);
  const summary = useMemo(
    () => summarizeUnits(values.types, values.units),
    [values.types, values.units],
  );
  const readiness = useMemo(() => getReadiness(values), [values]);

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader project={project} onBack={onBack} actions={actions} />
      <DetailHero values={values} summary={summary} percent={readiness.percent} />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-6">
          <OverviewCard values={values} />
          <LocationCard values={values} />
          <UnitsCard values={values} />
          <PaymentCard values={values} />
          <SpecsCard values={values} />
          <AmenitiesCard values={values} />
          <LicensesCard values={values} />
          <MediaCard values={values} />
        </div>

        <aside className="flex flex-col gap-4 xl:sticky xl:top-0">
          <MatchReadinessCard checks={readiness.checks} percent={readiness.percent} />
          <TimelineCard project={project} />
        </aside>
      </div>
    </div>
  );
}
