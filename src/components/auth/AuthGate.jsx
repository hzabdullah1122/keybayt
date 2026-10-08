"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { AUTH_ROUTES } from "@/constants/auth";
import { useSession } from "@/hooks/useSession";

/**
 * Route guard.
 *  require="authed": only logged-in users see children, others go to /login.
 *  require="guest":  logged-in users are sent to the dashboard (used on login/signup pages).
 */
export default function AuthGate({ require, children }) {
  const router = useRouter();
  const { status } = useSession();

  const allowed = require === "authed" ? status === "authed" : status === "guest";

  useEffect(() => {
    if (status === "loading") return;
    if (require === "authed" && status === "guest") router.replace(AUTH_ROUTES.login);
    if (require === "guest" && status === "authed") router.replace(AUTH_ROUTES.afterLogin);
  }, [require, status, router]);

  if (!allowed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <Spinner size={28} />
      </div>
    );
  }

  return children;
}
