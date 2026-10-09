import { BadgeCheck, FileCheck2, ShieldCheck } from "lucide-react";
import DetailCard from "@/components/projects/detail/DetailCard";
import DetailItem, { DetailGrid } from "@/components/projects/detail/DetailItem";
import { dateText } from "@/lib/projectFormat";

function LicenseBlock({ icon: Icon, title, number, expiry, file, numberLabel = "License number" }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
          <Icon size={16} />
        </span>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      <DetailGrid columns="sm:grid-cols-2">
        <DetailItem label={numberLabel} value={number} />
        <DetailItem label="Expiry date" value={dateText(expiry)} />
      </DetailGrid>
      <div className="flex items-center gap-2 text-xs text-muted">
        <FileCheck2 size={14} className={file ? "text-primary" : "text-placeholder"} />
        {file ? <span className="truncate text-foreground">{file.name}</span> : "No document uploaded"}
      </div>
    </div>
  );
}

/** Project licenses (internal, not shown to customers) and the developer authorization. */
export default function LicensesCard({ values }) {
  const isBroker = values.companyType === "broker";

  return (
    <DetailCard icon={ShieldCheck} title="Licenses and authorization">
      <div className="grid gap-4 xl:grid-cols-2">
        {values.status !== "ready" && (
          <LicenseBlock
            icon={BadgeCheck}
            title="Off-plan sales license (Wafi)"
            number={values.wafiNumber}
            expiry={values.wafiExpiry}
            file={values.wafiFile}
          />
        )}
        <LicenseBlock
          icon={ShieldCheck}
          title="Advertising license (REGA)"
          numberLabel="Advertising license number"
          number={values.adNumber}
          expiry={values.adExpiry}
          file={values.adFile}
        />
        {isBroker && (
          <LicenseBlock
            icon={FileCheck2}
            title="Developer authorization"
            numberLabel="Document name"
            number={values.authName}
            expiry={values.authExpiry}
            file={values.authFile}
          />
        )}
      </div>
      <p className="text-xs text-muted">
        Licenses are checked by the Keybayt team and are not shown to customers.
      </p>
    </DetailCard>
  );
}
