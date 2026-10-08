"use client";

import { useRef } from "react";
import { FileCheck2, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Click-to-upload box for one document. Shows the chosen file name with a remove button. */
export default function UploadDropzone({ title, hint, accept, fileName, onSelect, onRemove }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onSelect(file);
    e.target.value = "";
  };

  return (
    <>
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
      {fileName ? (
        <div className="flex h-full min-h-[84px] items-center gap-3 rounded-xl border border-primary bg-primary-light px-4 py-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
            <FileCheck2 size={19} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-semibold text-primary">{fileName}</span>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-fit cursor-pointer text-xs text-muted underline-offset-2 hover:text-primary hover:underline"
            >
              Replace file
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove file"
            className="cursor-pointer rounded-lg p-1.5 text-muted transition-colors hover:bg-background hover:text-danger"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex h-full min-h-[84px] w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-4 py-3 text-left transition-colors",
            "hover:border-primary hover:bg-primary-light",
          )}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary">
            <UploadCloud size={20} />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{title}</span>
            {hint && <span className="text-xs text-muted">{hint}</span>}
          </span>
        </button>
      )}
    </>
  );
}
