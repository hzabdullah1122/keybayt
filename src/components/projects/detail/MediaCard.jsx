import { ExternalLink, FileText, Images, Orbit, Video } from "lucide-react";
import ImageWithLoader from "@/components/common/ImageWithLoader";
import DetailCard from "@/components/projects/detail/DetailCard";
import { safeUrl } from "@/lib/projectFormat";

function LinkRow({ icon: Icon, label, url }) {
  const href = url ? safeUrl(url) : null;
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3">
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
          <Icon size={16} />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="truncate text-xs text-muted">{url || "Not provided"}</span>
        </span>
      </span>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${label}`}
          className="shrink-0 rounded-lg p-2 text-primary transition-colors hover:bg-primary-light"
        >
          <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
}

function FileRow({ label, file }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
        <FileText size={16} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="truncate text-xs text-muted">{file?.name ?? "Not uploaded"}</span>
      </span>
    </div>
  );
}

/** Gallery, video / tour links and the floor plan + brochure files. */
export default function MediaCard({ values }) {
  return (
    <DetailCard icon={Images} title="Media and documents">
      {values.photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 2xl:grid-cols-4">
          {values.photos.map((photo) => (
            <ImageWithLoader
              key={photo.id}
              src={photo.url}
              alt={photo.name}
              className="h-32 w-full rounded-xl border border-border"
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No photos uploaded.</p>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <LinkRow icon={Video} label="Project video" url={values.video} />
        <LinkRow icon={Orbit} label="360° virtual tour" url={values.tour} />
        <FileRow label="Floor plans" file={values.floorPlans} />
        <FileRow label="Brochure" file={values.brochure} />
      </div>
    </DetailCard>
  );
}
