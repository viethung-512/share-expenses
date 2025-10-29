import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

import { Providers } from "@/providers";
import { TopBar } from "@/components/top-bar";

export const metadata: Metadata = {
  title: "Share Expenses App",
  description: "Share and manage your expenses with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className={"flex flex-col gap-0"}>
            <TopBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
