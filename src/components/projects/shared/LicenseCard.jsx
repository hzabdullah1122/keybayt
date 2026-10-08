"use client";

import { CircleCheck } from "lucide-react";
import { DatePicker, Input } from "@/components/ui";
import UploadDropzone from "@/components/projects/shared/UploadDropzone";

/**
 * One license: header, number + expiry date, and the document upload.
 * errors: { number?, expiry? } messages shown after the user tried to continue.
 */
export default function LicenseCard({
  icon: Icon,
  title,
  description,
  numberLabel = "License number",
  numberPlaceholder = "Enter license number",
  number,
  expiry,
  fileName,
  errors = {},
  onNumberChange,
  onExpiryChange,
  onFileSelect,
  onFileRemove,
}) {
  const complete = Boolean(number.trim() && expiry);

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Icon size={22} />
          </span>
          <div className="flex min-w-0 flex-col">
            <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted">{description}</p>
          </div>
        </div>
        {complete && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-success-light px-2.5 py-1 text-xs font-semibold text-success">
            <CircleCheck size={13} />
            Complete
          </span>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label={`${numberLabel} *`}
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          placeholder={numberPlaceholder}
          error={errors.number}
        />
        <DatePicker
          label="Expiry date *"
          value={expiry}
          onChange={onExpiryChange}
          error={errors.expiry}
        />
      </div>

      <UploadDropzone
        title="Upload license document"
        hint="PDF or image, up to 10 MB"
        accept=".pdf,image/*"
        fileName={fileName}
        onSelect={onFileSelect}
        onRemove={onFileRemove}
      />
    </div>
  );
}
