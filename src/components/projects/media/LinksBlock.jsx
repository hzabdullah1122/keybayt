"use client";

import { Orbit, Video } from "lucide-react";
import { Input } from "@/components/ui";
import FieldHint from "@/components/projects/shared/FieldHint";
import SubHeading from "@/components/projects/shared/SubHeading";

/** Video and 360° virtual tour links. */
export default function LinksBlock({ values, set }) {
  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <SubHeading title="Video and virtual tour" hint="Optional links customers can open from the app." />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Input
            label="Project video"
            type="url"
            leftIcon={Video}
            value={values.video}
            onChange={(e) => set("video", e.target.value)}
            placeholder="YouTube or Vimeo link"
          />
          <FieldHint>Paste a link to the project video.</FieldHint>
        </div>
        <div className="flex flex-col gap-1.5">
          <Input
            label="360° virtual tour"
            type="url"
            leftIcon={Orbit}
            value={values.tour}
            onChange={(e) => set("tour", e.target.value)}
            placeholder="Virtual tour link"
          />
          <FieldHint>Shown as a full-screen tour in the app.</FieldHint>
        </div>
      </div>
    </div>
  );
}
