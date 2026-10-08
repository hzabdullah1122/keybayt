import { Montserrat } from "next/font/google";
import { SITE } from "@/constants/site";
import { ToastProvider } from "@/context/ToastContext";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans"><ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
