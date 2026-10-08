"use client";

import { AnimatePresence } from "framer-motion";
import { ClipboardCheck } from "lucide-react";
import { ShakeModal } from "@/components/common";
import { Button } from "@/components/ui";
import ChecklistItem from "@/components/projects/shared/ChecklistItem";

/** Shown when "Submit for review" is clicked but required items are still missing. */
export default function SubmitRequirementsModal({ open, items, onClose }) {
  const remaining = items.filter((item) => !item.done).length;

  return (
    <AnimatePresence>
      {open && (
        <ShakeModal maxWidth={420} onClose={onClose} className="flex flex-col px-6 py-7">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
            <ClipboardCheck size={22} className="text-primary" />
          </div>
          <h3 className="mb-1 text-base font-bold text-foreground">Needed before review</h3>
          <p className="mb-5 text-sm leading-relaxed text-muted">
            {remaining} item{remaining === 1 ? "" : "s"} still missing. Complete them and submit
            again.
          </p>
          <ul className="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            {items.map((item) => (
              <ChecklistItem key={item.label} label={item.label} done={item.done} />
            ))}
          </ul>
          <Button onClick={onClose} className="w-full">
            Got it
          </Button>
        </ShakeModal>
      )}
    </AnimatePresence>
  );
}
