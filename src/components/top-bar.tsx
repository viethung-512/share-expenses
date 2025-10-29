"use client";

import { FC, useContext } from "react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

import { AuthContext } from "@/context/auth.context";

export const TopBar: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={"flex items-center justify-between px-4 py-2"}>
      <span>Share expenses</span>
      <div className={"flex items-center gap-4"}>
        {!user ? (
          <button
            className={"cursor-pointer"}
            onClick={() => signIn("google", { redirect: false })}
          >
            Sign in with Google
          </button>
        ) : (
          <>
            <Image
              src={user?.avatarUrl || ""}
              alt="User Avatar"
              className={"rounded-full"}
              width={40}
              height={40}
            />
            <button className={"cursor-pointer"} onClick={() => signOut()}>
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
};
