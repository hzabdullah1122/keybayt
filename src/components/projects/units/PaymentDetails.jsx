"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Banknote, Landmark } from "lucide-react";
import { Input, SuffixNumberInput } from "@/components/ui";

const clampPercent = (value) => (value === "" ? "" : String(Math.min(100, Number(value))));

function DetailCard({ icon: Icon, title, hint, children }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="flex flex-col gap-4 rounded-xl border border-border p-5"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
          <Icon size={18} />
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{title}</span>
          <span className="text-xs text-muted">{hint}</span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </motion.div>
  );
}

/** Extra questions that appear for each payment option the user selected. */
export default function PaymentDetails({ values, set }) {
  const hasCash = values.payments.includes("cash");
  const hasBank = values.payments.includes("bank");

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <AnimatePresence initial={false}>
        {hasCash && (
          <DetailCard
            key="cash"
            icon={Banknote}
            title="Cash payment details"
            hint="How customers can pay in cash or installments"
          >
            <SuffixNumberInput
              label="Down payment"
              suffix="%"
              placeholder="e.g. 20"
              value={values.cashDownPayment}
              onChange={(v) => set("cashDownPayment", clampPercent(v))}
            />
            <SuffixNumberInput
              label="Discount for full cash payment"
              suffix="%"
              placeholder="e.g. 5"
              value={values.cashDiscount}
              onChange={(v) => set("cashDiscount", clampPercent(v))}
            />
            <SuffixNumberInput
              label="Installment plan up to"
              suffix="months"
              placeholder="e.g. 36"
              value={values.cashInstallmentMonths}
              onChange={(v) => set("cashInstallmentMonths", v)}
            />
          </DetailCard>
        )}

        {hasBank && (
          <DetailCard
            key="bank"
            icon={Landmark}
            title="Bank financing details"
            hint="Which banks finance this project and on what terms"
          >
            <Input
              wrapperClassName="sm:col-span-2"
              label="Partner banks"
              value={values.bankNames}
              onChange={(e) => set("bankNames", e.target.value)}
              placeholder="e.g. Al Rajhi Bank, Riyad Bank"
            />
            <SuffixNumberInput
              label="Minimum down payment"
              suffix="%"
              placeholder="e.g. 10"
              value={values.bankDownPayment}
              onChange={(v) => set("bankDownPayment", clampPercent(v))}
            />
            <SuffixNumberInput
              label="Maximum financing period"
              suffix="years"
              placeholder="e.g. 25"
              value={values.bankMaxYears}
              onChange={(v) => set("bankMaxYears", v)}
            />
          </DetailCard>
        )}
      </AnimatePresence>
    </div>
  );
}
