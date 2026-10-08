import Image from "next/image";
import Link from "next/link";
import AuthShowcase from "@/components/auth/AuthShowcase";
import { AUTH_ROUTES } from "@/constants/auth";
import { LOGOS } from "@/constants/navigation";

/** Auth layout: form centred in the left 58%, animated 3D brand panel on the right 42% (lg+). */
export default function AuthShell({ children }) {
  return (
    <div className="grid min-h-dvh bg-background lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:p-3">
      <div className="flex min-h-dvh flex-col px-6 py-6 sm:px-8 lg:min-h-0">
        <Link href={AUTH_ROUTES.login} aria-label="Keybayt" className="w-fit">
          <Image
            src={LOGOS.complete}
            alt="Keybayt"
            width={99}
            height={36}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[460px]">{children}</div>
        </div>

        <p className="text-xs text-muted">&copy; Keybayt. All rights reserved.</p>
      </div>

      <div className="hidden lg:block">
        <AuthShowcase />
      </div>
    </div>
  );
}
