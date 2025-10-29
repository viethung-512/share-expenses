"use client";

import { FC } from "react";

import {
  HookFormInputMultipleSelectUser,
  HookFormInputText,
} from "@/lib/react-hook-form";

export type GroupFormProps = {};

export const GroupForm: FC<GroupFormProps> = () => {
  return (
    <div className={"flex flex-col gap-2"}>
      <HookFormInputText
        fieldName={"name"}
        label={"Group Name"}
        placeholder={"Enter name"}
      />
      <HookFormInputMultipleSelectUser
        fieldName={"memberIds"}
        label={"Members"}
      />
    </div>
  );
};
