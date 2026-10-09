import Image from "next/image";
import Link from "next/link";
import AuthShowcase from "@/components/auth/AuthShowcase";
import { AUTH_ROUTES } from "@/constants/auth";
import { LOGOS } from "@/constants/navigation";

/** Auth layout: scrolling form on the left 58%, fixed animated 3D brand panel on the right 42% (lg+). */
export default function AuthShell({ children }) {
  return (
    <div className="grid min-h-dvh bg-background lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:p-3">
      <div className="flex min-h-dvh flex-col px-6 py-6 sm:px-8 lg:min-h-[calc(100dvh-1.5rem)]">
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

      {/* Brand panel stays fixed while the form side scrolls; its content scales to fit. */}
      <div className="hidden lg:sticky lg:top-3 lg:block lg:h-[calc(100dvh-1.5rem)] lg:self-start">
        <AuthShowcase />
      </div>
    </div>
  );
}
