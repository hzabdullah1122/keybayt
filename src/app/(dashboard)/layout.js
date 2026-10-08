import AuthGate from "@/components/auth/AuthGate";
import DashboardShell from "@/components/layout/DashboardShell";
import { ActiveTabProvider } from "@/context/ActiveTabContext";

export default function DashboardLayout({ children }) {
  return (
    <AuthGate require="authed">
      <ActiveTabProvider>
        <DashboardShell>{children}</DashboardShell>
      </ActiveTabProvider>
    </AuthGate>
  );
}
