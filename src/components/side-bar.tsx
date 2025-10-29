"use client";

import { FC, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/auth.context";

export type SideBarProps = {};

export const SideBar: FC<SideBarProps> = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return null;
  }
  return (
    <ul>
      <li>
        <Link href={"/users/create"}>Create user</Link>
      </li>
      <li>
        <Link href={"/groups/create"}>Create group</Link>
      </li>
    </ul>
  );
};
