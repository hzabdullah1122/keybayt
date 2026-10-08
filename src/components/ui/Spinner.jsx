import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Spinner({ size = 18, className }) {
  return (
    <Loader2 size={size} className={cn("animate-spin text-primary", className)} />
  );
}
