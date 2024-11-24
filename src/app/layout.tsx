import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "./Provider";
import { Toaster } from "sonner";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import Query from "@/components/tanstack-query/Query";
import NextAuthProvider from "@/components/provider/NextAuthProvider";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import { TopLoader } from "@/components/layout/TopLoader";
import { BugReport } from "@/components/layout/BugReport";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
export const metadata: Metadata = {
  title: "Algorithmic Odyssey",
  description: "Algorithmic Odyssey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  >
      <body
        className={'relative h-full font-sans bg-[#eff1f5] dark:bg-[#1b1b1f]'}
      >
        <main className={`relative flex flex-col min-h-screen ${poppins.className}`}>
          <Suspense>
            <NextTopLoader showSpinner={false} height={5} />
            <TopLoader />
          </Suspense>
          <Provider>
            <Query>
              <NextAuthProvider>
                <Nav />
                <div className="relative h-full w-full">
                  {children}
                  <Toaster position="bottom-right" richColors />
                </div>
              </NextAuthProvider>
            </Query>
          </Provider>
        </main>
        <BugReport />
        <Footer />
      </body>
    </html>
  );
}
