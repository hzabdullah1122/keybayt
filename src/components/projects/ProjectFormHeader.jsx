import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import CompanyTypeTabs from "@/components/projects/CompanyTypeTabs";

/** Add/Edit project title card with the Developer / Brokerage Company tabs. */
export default function ProjectFormHeader({ editing = false, companyType, onCompanyTypeChange }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-background p-5 sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
          <HiOutlineBuildingLibrary size={26} />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {editing ? "Edit project" : "Add project"}
            </h1>
            <span className="rounded-full bg-warning-light px-2.5 py-0.5 text-xs font-semibold text-warning">
              {editing ? "Editing draft" : "New"}
            </span>
          </div>
          <p className="max-w-xl text-sm text-muted">
            Fill the steps below. Every unit type gets its own price, so customers see an accurate
            match percentage.
          </p>
        </div>
      </div>
      <CompanyTypeTabs value={companyType} onChange={onCompanyTypeChange} />
    </header>
  );
}
