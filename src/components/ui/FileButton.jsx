"use client";

import { useRef } from "react";
import { FileCheck2, Upload, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Upload button that picks one file. Shows the chosen file name with a remove button.
 * onSelect(file) gets the raw File; onRemove clears it. `fileName` is the current value.
 */
export default function FileButton({
  label = "Upload file",
  accept,
  fileName,
  onSelect,
  onRemove,
  className,
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onSelect(file);
    e.target.value = "";
  };

  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
      <Button
        variant="outline"
        leftIcon={fileName ? FileCheck2 : Upload}
        onClick={() => inputRef.current?.click()}
        className="shrink-0 border-primary text-primary hover:bg-primary-light"
      >
        {fileName ? "Replace file" : label}
      </Button>
      {fileName && (
        <span className="flex min-w-0 items-center gap-1.5 rounded-lg bg-primary-light px-2.5 py-2 text-xs text-primary">
          <span className="truncate">{fileName}</span>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove file"
            className="cursor-pointer rounded p-0.5 hover:bg-background"
          >
            <X size={12} />
          </button>
        </span>
      )}
    </div>
  );
}
