"use client";

import { FC } from "react";
import { HookFormInputText } from "@/lib/react-hook-form";

export type UserFormProps = {};

export const UserForm: FC<UserFormProps> = () => {
  return (
    <div className={"flex flex-col gap-2"}>
      <HookFormInputText
        fieldName={"username"}
        label={"Username"}
        placeholder={"Enter user name"}
      />
      <HookFormInputText
        fieldName={"email"}
        label={"Email"}
        placeholder={"Enter user email"}
      />
    </div>
  );
};
