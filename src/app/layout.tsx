import type { Metadata } from "next";
import { Inter, Pacifico, Dancing_Script } from "next/font/google";
import "@/app/globals.css";

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
      </body>
    </html>
  );
}
