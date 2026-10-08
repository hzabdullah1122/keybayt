"use client";

import { AnimatePresence } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import ShakeModal from "@/components/common/ShakeModal";
import Button from "@/components/ui/Button";

/**
 * "Discard changes?" confirmation. Use when closing a create/edit panel that has
 * unsaved data. Keep the panel mounted so "Keep" really preserves the form state.
 *
 * onDiscard: reset the form and close.  onKeep: close but keep the filled data.
 */
export default function DiscardChangesModal({
  open,
  onDiscard,
  onKeep,
  title = "Discard changes?",
  message = "You have unsaved changes.\nAre you sure you want to discard them?",
  discardLabel = "Discard",
  keepLabel = "Keep Editing",
}) {
  return (
    <AnimatePresence>
      {open && (
        <ShakeModal
          maxWidth={380}
          className="flex flex-col items-center px-6 py-7 text-center"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warning-light">
            <TriangleAlert size={22} className="text-warning" />
          </div>
          <h3 className="mb-1.5 text-base font-bold">{title}</h3>
          <p className="mb-6 whitespace-pre-line text-sm leading-relaxed text-muted">
            {message}
          </p>
          <div className="flex w-full gap-3">
            <Button variant="outline" className="flex-1" onClick={onDiscard}>
              {discardLabel}
            </Button>
            <Button className="flex-1" onClick={onKeep}>
              {keepLabel}
            </Button>
          </div>
        </ShakeModal>
      )}
    </AnimatePresence>
  );
}
