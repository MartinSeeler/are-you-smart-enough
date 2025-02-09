import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import { Providers } from "./providers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Welcome from "@/components/screens/welcome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AreYouSmartEnough",
  description: "Ein KI-Projekt zur Evaluierung des Lernstandes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  return (
    <Providers>
      <html lang="de">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col`}
        >
          <PageHeader />
          <main className="w-full max-w-3xl mx-auto p-6 space-y-4 flex-1">
            {isUserAuthenticated ? children : <Welcome />}
          </main>
          <PageFooter />
        </body>
      </html>
    </Providers>
  );
}
