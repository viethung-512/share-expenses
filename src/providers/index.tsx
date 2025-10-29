"use client";

import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/providers/react-query.provider";
import { AuthProvider } from "@/providers/auth.provider";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
};
