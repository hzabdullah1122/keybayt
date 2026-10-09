import { Banknote, Landmark, Wallet } from "lucide-react";
import DetailCard from "@/components/projects/detail/DetailCard";
import DetailItem, { DetailGrid } from "@/components/projects/detail/DetailItem";
import Pill from "@/components/projects/detail/Pill";

const percent = (v) => (v ? `${v}%` : null);

function MethodBlock({ icon: Icon, title, children }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
          <Icon size={16} />
        </span>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

/** Payment options, with the details for cash and bank financing, plus Sakani support. */
export default function PaymentCard({ values }) {
  const hasCash = values.payments.includes("cash");
  const hasBank = values.payments.includes("bank");

  return (
    <DetailCard icon={Wallet} title="Payment options">
      <div className="flex flex-wrap items-center gap-2">
        {values.payments.length === 0 && <span className="text-sm text-muted">No payment options selected.</span>}
        {hasCash && <Pill icon={Banknote}>Cash</Pill>}
        {hasBank && <Pill icon={Landmark}>Bank financing</Pill>}
        <Pill>{values.sakani === "yes" ? "Sakani supported" : "Sakani not supported"}</Pill>
      </div>

      {(hasCash || hasBank) && (
        <div className="grid gap-4 xl:grid-cols-2">
          {hasCash && (
            <MethodBlock icon={Banknote} title="Cash payment">
              <DetailGrid columns="sm:grid-cols-2">
                <DetailItem label="Down payment" value={percent(values.cashDownPayment)} />
                <DetailItem label="Full cash discount" value={percent(values.cashDiscount)} />
                <DetailItem
                  label="Installment plan"
                  value={values.cashInstallmentMonths ? `Up to ${values.cashInstallmentMonths} months` : null}
                />
              </DetailGrid>
            </MethodBlock>
          )}
          {hasBank && (
            <MethodBlock icon={Landmark} title="Bank financing">
              <DetailGrid columns="sm:grid-cols-2">
                <DetailItem label="Partner banks" value={values.bankNames} />
                <DetailItem label="Minimum down payment" value={percent(values.bankDownPayment)} />
                <DetailItem
                  label="Maximum period"
                  value={values.bankMaxYears ? `${values.bankMaxYears} years` : null}
                />
              </DetailGrid>
            </MethodBlock>
          )}
        </div>
      )}
    </DetailCard>
  );
}
