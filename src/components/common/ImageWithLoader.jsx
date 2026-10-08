"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import ImagePreviewModal from "@/components/common/ImagePreviewModal";
import { cn } from "@/lib/utils";

/**
 * Use this for EVERY image: shows a spinner while loading, a fallback icon on
 * error, and opens a full-size preview on click (disable with `preview={false}`).
 * Size/shape come from `className` (e.g. "h-16 w-16 rounded-xl").
 */
export default function ImageWithLoader({
  src,
  alt = "",
  className,
  imgClassName,
  preview = true,
  fallbackIcon: FallbackIcon = ImageOff,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const canPreview = preview && loaded && !error;

  return (
    <>
      <div
        className={cn("relative overflow-hidden bg-surface", canPreview && "cursor-zoom-in", className)}
        onClick={canPreview ? () => setPreviewOpen(true) : undefined}
      >
        {error || !src ? (
          <div className="flex h-full w-full items-center justify-center">
            <FallbackIcon size={20} className="text-placeholder" />
          </div>
        ) : (
          <>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner size={16} />
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              className={cn(
                "h-full w-full object-cover transition-opacity duration-200",
                loaded ? "opacity-100" : "opacity-0",
                imgClassName,
              )}
            />
          </>
        )}
      </div>

      {preview && (
        <ImagePreviewModal
          open={previewOpen}
          src={src}
          alt={alt}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </>
  );
}
