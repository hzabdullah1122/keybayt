import ProjectPreviewCard from "@/components/projects/sidebar/ProjectPreviewCard";
import MatchReadinessCard from "@/components/projects/sidebar/MatchReadinessCard";

/** Right column: live preview and match readiness. */
export default function ProjectSidePanel({ values, readiness }) {
  return (
    <aside className="flex flex-col gap-4 xl:sticky xl:top-0 xl:self-start">
      <ProjectPreviewCard values={values} />
      <MatchReadinessCard checks={readiness.checks} percent={readiness.percent} />
    </aside>
  );
}
