import type { Metadata } from "next";
import { Inter, Pacifico, Dancing_Script } from "next/font/google";
import "@/app/globals.css";
import { APP_NAME } from "@/config/appConfig";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400"
})
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "WishWink | Send Cute AI Wishes",
  description: "Create and share personalized, cute wish messages for your loved ones.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${pacifico.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="py-4 px-6 text-center mt-auto flex flex-col sm:flex-row sm:justify-center bg-pink-100 sm:gap-20 items-center">
          <p className="text-sm font-bold mb-2 sm:mb-0">© 2026 {APP_NAME} App</p>
          <div className="flex justify-center gap-6">
            <Link href={ROUTES.TERMS} className="link-text text-xs">Terms</Link>
            <Link href={ROUTES.PRIVACY} className="link-text text-xs">Privacy</Link>
            <Link href={ROUTES.SUPPORT} className="link-text text-xs">Support</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
