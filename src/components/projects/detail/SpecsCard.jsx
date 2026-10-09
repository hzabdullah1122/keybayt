import { Ruler } from "lucide-react";
import DetailCard from "@/components/projects/detail/DetailCard";
import DetailItem, { DetailGrid } from "@/components/projects/detail/DetailItem";
import Pill from "@/components/projects/detail/Pill";
import {
  FACADES,
  FURNISHED_ITEMS,
  PROPERTY_AGES,
  WARRANTY_UNITS,
} from "@/constants/projects";
import { optionLabel, optionLabels, rangeText } from "@/lib/projectFormat";

/** Building, land, parking, furnishing and warranty details. */
export default function SpecsCard({ values }) {
  const onlyLand = values.types.length === 1 && values.types[0] === "land";
  const facades = optionLabels(FACADES, values.facades);
  const furnished = values.furnishing === "furnished";
  const furnishedItems = optionLabels(FURNISHED_ITEMS, values.furnishedItems);
  const warranty = values.warrantyStructure
    ? `${values.warrantyStructure} ${optionLabel(WARRANTY_UNITS, values.warrantyStructureUnit) ?? ""}`.trim()
    : null;

  return (
    <DetailCard icon={Ruler} title="Specifications">
      <DetailGrid>
        {!onlyLand && (
          <>
            <DetailItem label="Living rooms / majlis" value={rangeText(values.livingFrom, values.livingTo)} />
            <DetailItem label="Floors" value={rangeText(values.floorsFrom, values.floorsTo)} />
            <DetailItem
              label="Building area"
              value={rangeText(values.buildingAreaFrom, values.buildingAreaTo, "m²")}
            />
          </>
        )}
        <DetailItem label="Land area" value={rangeText(values.landAreaFrom, values.landAreaTo, "m²")} />
        <DetailItem
          label="Street width"
          value={rangeText(values.streetWidthFrom, values.streetWidthTo, "m")}
        />
        <DetailItem label="Property age" value={optionLabel(PROPERTY_AGES, values.age)} />
        {!onlyLand && (
          <>
            <DetailItem
              label="Parking"
              value={
                values.parking === "yes"
                  ? (rangeText(values.parkingSpacesFrom, values.parkingSpacesTo, "spaces") ?? "Available")
                  : "Not available"
              }
            />
            <DetailItem label="Furnishing" value={furnished ? "Furnished" : "Unfurnished"} />
          </>
        )}
        <DetailItem label="Structural warranty" value={warranty} />
      </DetailGrid>

      {facades.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-placeholder">Facade direction</span>
          <div className="flex flex-wrap gap-2">
            {facades.map((f) => (
              <Pill key={f}>{f}</Pill>
            ))}
          </div>
        </div>
      )}

      {!onlyLand && furnished && furnishedItems.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-placeholder">Furnishing includes</span>
          <div className="flex flex-wrap gap-2">
            {furnishedItems.map((f) => (
              <Pill key={f}>{f}</Pill>
            ))}
          </div>
        </div>
      )}

      {values.warrantyOther && (
        <DetailGrid columns="grid-cols-1">
          <DetailItem label="Other warranties" value={values.warrantyOther} />
        </DetailGrid>
      )}
    </DetailCard>
  );
}
