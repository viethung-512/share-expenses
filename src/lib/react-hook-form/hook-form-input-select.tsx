"use client";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { HookFormInputProps } from "@/lib/react-hook-form/index";
import { InputSelect, InputSelectProps } from "@/components/input-select";

export type HookFormInputSelectProps = HookFormInputProps<
  Omit<InputSelectProps, "onChange" | "value">
>;

export const HookFormInputSelect: FC<HookFormInputSelectProps> = ({
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
        return <InputSelect {...rest} {...field} />;
      }}
      name={fieldName}
      control={control}
    />
  );
};
