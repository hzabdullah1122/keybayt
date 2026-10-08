"use client";

import { useRef } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import ImageWithLoader from "@/components/common/ImageWithLoader";
import Button from "@/components/ui/Button";
import { toFileItem } from "@/lib/files";

/**
 * Single image picker. Empty -> dashed upload box; filled -> previewable image + Remove.
 * value: { id, name, url } | null.  onChange(item | null)
 */
export default function ImageUploadBox({ value, onChange, title, hint }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onChange(toFileItem(file));
    e.target.value = "";
  };

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
      {value ? (
        <div className="relative h-[240px] overflow-hidden rounded-xl border border-border">
          <ImageWithLoader src={value.url} alt={value.name} className="h-full w-full" />
          <Button
            variant="outline"
            size="sm"
            leftIcon={Trash2}
            onClick={() => onChange(null)}
            className="absolute bottom-3 right-3"
          >
            Remove
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-[240px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface text-sm text-foreground transition-colors hover:border-primary hover:bg-primary-light"
        >
          <ImagePlus size={28} className="text-primary" />
          {title}
          {hint && <span className="text-xs text-muted">{hint}</span>}
        </button>
      )}
    </>
  );
}
