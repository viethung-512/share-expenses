"use client";

import { createContext } from "react";
import { User } from "@/types/user.type";

type AuthState = {
  user: User | null | undefined;
  isAuthenticated: boolean;
  loading: boolean;
};

export const AuthContext = createContext<AuthState>({
  user: null,
  isAuthenticated: false,
  loading: true,
});
