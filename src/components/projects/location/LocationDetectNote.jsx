import { LocateFixed } from "lucide-react";
import { Spinner } from "@/components/ui";
import FieldHint from "@/components/projects/shared/FieldHint";

/** One-line status under the region/city/district selects about the auto-detected location. */
export default function LocationDetectNote({ status, detected }) {
  if (status === "locating") {
    return (
      <span className="flex items-center gap-2">
        <Spinner size={14} />
        <FieldHint>Detecting your location to suggest region, city and district...</FieldHint>
      </span>
    );
  }

  if (status === "detected") {
    const place = [detected.district, detected.city, detected.region].filter(Boolean).join(", ");
    return (
      <span className="flex items-center gap-2 text-primary">
        <LocateFixed size={14} className="shrink-0" />
        <FieldHint>
          {`Your location: ${place}. The fields below are filled for you. You can also type to search any place.`}
        </FieldHint>
      </span>
    );
  }

  const messages = {
    denied: "Location access is blocked. Allow it in the browser address bar to get suggestions.",
    unavailable: "This browser cannot share a location. Choose the region manually.",
    failed: "We could not read your location. Choose the region manually.",
  };
  return <FieldHint>{messages[status]}</FieldHint>;
}
