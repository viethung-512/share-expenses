"use client";

import { FC } from "react";
import {
  HookFormInputMultipleSelectUser,
  HookFormInputSingleSelectGroup,
  HookFormInputSingleSelectUser,
  HookFormInputText,
} from "@/lib/react-hook-form";
import { useFormContext } from "react-hook-form";

export type ExpenseFormProps = {};

const ExpenseForm: FC<ExpenseFormProps> = () => {
  const { watch } = useFormContext();

  return (
    <div className={"flex flex-col gap-2"}>
      <HookFormInputText
        fieldName={"title"}
        label={"Title"}
        placeholder={"Enter expense title"}
      />
      <HookFormInputText
        fieldName={"amount"}
        label={"Amount"}
        placeholder={"Enter amount"}
        type={"number"}
        step={"0.01"}
      />
      <HookFormInputText
        fieldName={"date"}
        label={"Date"}
        placeholder={"YYYY-MM-DD"}
        type={"date"}
      />

      <HookFormInputSingleSelectUser
        fieldName={"payer"}
        label={"Payer"}
        groupId={watch("groupId")}
      />
      <HookFormInputMultipleSelectUser
        fieldName={"membersInvolved"}
        label={"Members Involved"}
        groupId={watch("groupId")}
      />
      <HookFormInputSingleSelectGroup
        fieldName={"group"}
        label={"Group"}
        isDisabled={true}
      />
      <HookFormInputText
        fieldName={"description"}
        label={"Description"}
        placeholder={"Description (optional)"}
      />
    </div>
  );
};

export default ExpenseForm;
