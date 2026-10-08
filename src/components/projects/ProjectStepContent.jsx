"use client";

import { AnimatePresence, motion } from "framer-motion";
import BasicInfoSection from "@/components/projects/basic/BasicInfoSection";
import LocationSection from "@/components/projects/location/LocationSection";
import UnitsSection from "@/components/projects/units/UnitsSection";
import SpecsSection from "@/components/projects/specs/SpecsSection";
import AmenitiesSection from "@/components/projects/amenities/AmenitiesSection";
import LicensesSection from "@/components/projects/licenses/LicensesSection";
import MediaSection from "@/components/projects/media/MediaSection";

const STEP_SECTIONS = {
  basic: BasicInfoSection,
  location: LocationSection,
  units: UnitsSection,
  specs: SpecsSection,
  amenities: AmenitiesSection,
  licenses: LicensesSection,
  media: MediaSection,
};

/** Shows only the active step's form card with a soft slide-in. */
export default function ProjectStepContent({ stepId, form, errors }) {
  const Section = STEP_SECTIONS[stepId];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={stepId}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
      >
        <Section form={form} errors={errors} />
      </motion.div>
    </AnimatePresence>
  );
}
