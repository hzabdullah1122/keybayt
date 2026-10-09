"use client";

import { useSession } from "@/hooks/useSession";

/**
 * Name shown as "the developer / marketing company" for the logged-in user.
 * For now it is the login email; switch to `session.company` once real profiles exist.
 */
export function useCurrentCompany() {
  const { session } = useSession();
  return session?.email ?? "Your account";
}
