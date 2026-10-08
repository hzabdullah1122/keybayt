"use client";

import { FieldLabel } from "@/components/ui";
import ImageUploadBox from "@/components/projects/shared/ImageUploadBox";
import PhotosUploadBox from "@/components/projects/shared/PhotosUploadBox";
import SubHeading from "@/components/projects/shared/SubHeading";

/** Cover image (required) + gallery photos. */
export default function ImagesBlock({ values, set }) {
  const photoCount = values.photos.length;

  return (
    <div className="flex flex-col gap-4">
      <SubHeading
        title="Images"
        hint="A strong cover and clear photos help customers decide faster."
        badge={
          photoCount > 0 && (
            <span className="shrink-0 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
              {photoCount} {photoCount === 1 ? "photo" : "photos"}
            </span>
          )
        }
      />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <FieldLabel required>Cover image</FieldLabel>
          <ImageUploadBox
            value={values.cover}
            onChange={(item) => set("cover", item)}
            title="Upload cover image"
            hint="Landscape, at least 1600 px wide"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <FieldLabel>Project photos</FieldLabel>
          <PhotosUploadBox value={values.photos} onChange={(items) => set("photos", items)} />
        </div>
      </div>
    </div>
  );
}
