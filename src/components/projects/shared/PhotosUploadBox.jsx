"use client";

import { useRef } from "react";
import { Images, Plus, X } from "lucide-react";
import ImageWithLoader from "@/components/common/ImageWithLoader";
import { releaseFileItem, toFileItem } from "@/lib/files";

/** Multi-photo picker with previewable thumbnails. value: [{ id, name, url }] */
export default function PhotosUploadBox({ value, onChange }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const added = Array.from(e.target.files ?? []).map(toFileItem);
    if (added.length) onChange([...value, ...added]);
    e.target.value = "";
  };

  const remove = (item) => {
    releaseFileItem(item);
    onChange(value.filter((p) => p.id !== item.id));
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      {value.length === 0 ? (
        <button
          type="button"
          onClick={openPicker}
          className="flex h-[240px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface text-sm text-foreground transition-colors hover:border-primary hover:bg-primary-light"
        >
          <Images size={28} className="text-primary" />
          Add photos
          <span className="text-xs text-muted">Select several at once</span>
        </button>
      ) : (
        <div className="grid h-[240px] auto-rows-[88px] grid-cols-3 gap-2 overflow-y-auto rounded-xl border border-border p-2 sm:grid-cols-4">
          {value.map((item) => (
            <div key={item.id} className="group/photo relative">
              <ImageWithLoader src={item.url} alt={item.name} className="h-full w-full rounded-lg" />
              <button
                type="button"
                onClick={() => remove(item)}
                aria-label={`Remove ${item.name}`}
                className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-foreground text-white opacity-0 transition-opacity group-hover/photo:opacity-100"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={openPicker}
            aria-label="Add more photos"
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border text-primary transition-colors hover:border-primary hover:bg-primary-light"
          >
            <Plus size={22} />
          </button>
        </div>
      )}
    </>
  );
}
