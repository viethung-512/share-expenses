"use client";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { HookFormInputProps } from "@/lib/react-hook-form/index";
import { InputText, InputTextProps } from "@/components/input-text";

export type HookFormInputTextProps = HookFormInputProps<
  Omit<InputTextProps, "onChange" | "value">
>;

export const HookFormInputText: FC<HookFormInputTextProps> = ({
  fieldName,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      render={({ field }) => {
        return <InputText {...field} {...rest} />;
      }}
      name={fieldName}
      control={control}
    />
  );
};
