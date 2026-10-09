"use client";

import { AnimatePresence } from "framer-motion";
import ShakeModal from "@/components/common/ShakeModal";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Generic confirmation dialog. Backdrop click shakes it (see ShakeModal); it closes only via
 * the X, Cancel or Confirm. `tone="danger"` makes the confirm button red.
 *
 * <ConfirmModal open icon={LogOut} title="Log out?" message="..." confirmLabel="Log out"
 *   loading={busy} onConfirm={...} onCancel={...} />
 */
export default function ConfirmModal({
  open,
  icon: Icon,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "primary",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <ShakeModal
          maxWidth={380}
          onClose={onCancel}
          className="flex flex-col items-center px-5 pb-5 pt-6 text-center"
        >
          {Icon && (
            <div
              className={cn(
                "mb-3 flex h-11 w-11 items-center justify-center rounded-full",
                tone === "danger" ? "bg-danger-light text-danger" : "bg-primary-light text-primary",
              )}
            >
              <Icon size={20} />
            </div>
          )}
          <h3 className="mb-1 text-base font-bold text-foreground">{title}</h3>
          <p className="mb-5 whitespace-pre-line text-[13px] leading-snug text-muted">{message}</p>
          <div className="flex w-full gap-2.5">
            <Button variant="outline" className="flex-1" onClick={onCancel} disabled={loading}>
              {cancelLabel}
            </Button>
            <Button
              variant={tone === "danger" ? "danger" : "primary"}
              className="flex-1"
              loading={loading}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </ShakeModal>
      )}
    </AnimatePresence>
  );
}
