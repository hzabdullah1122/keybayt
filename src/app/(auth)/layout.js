import AuthGate from "@/components/auth/AuthGate";
import AuthShell from "@/components/auth/AuthShell";

export default function AuthLayout({ children }) {
  return (
    <AuthGate require="guest">
      <AuthShell>{children}</AuthShell>
    </AuthGate>
  );
}
