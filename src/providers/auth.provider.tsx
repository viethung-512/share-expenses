"use client";

import { FC, PropsWithChildren } from "react";
import { AuthContext } from "@/context/auth.context";
import { useSession } from "next-auth/react";
import { useFetchUserById } from "@/app/react-queries/user";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();
  const { data: userDetails, isLoading: fetchAuthUserLoading } =
    useFetchUserById(session?.user?.id);

  return (
    <AuthContext.Provider
      value={{
        user: userDetails,
        isAuthenticated: !!session?.user,
        loading: fetchAuthUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
