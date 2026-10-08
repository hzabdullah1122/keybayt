import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/constants/auth";

// Visitors always land on login first; logged-in users are forwarded to the dashboard there.
export default function Home() {
  redirect(AUTH_ROUTES.login);
}
