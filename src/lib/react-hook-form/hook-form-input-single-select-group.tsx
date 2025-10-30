"use client";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { HookFormInputProps } from "@/lib/react-hook-form/index";
import { InputFieldWrapperProps } from "@/components/input-field-wrapper";
import { groupService } from "@/services/group.service";
import {
  InputAsyncSingleSelect,
  InputAsyncSingleSelectProps,
} from "@/components/input-async-single-select";

export type HookFormInputSingleSelectGroupProps = HookFormInputProps<
  InputFieldWrapperProps &
    Omit<InputAsyncSingleSelectProps, "value" | "onChange" | "asyncFunction">
>;

export const HookFormInputSingleSelectGroup: FC<
  HookFormInputSingleSelectGroupProps
> = ({ fieldName, ...rest }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <InputAsyncSingleSelect
            {...rest}
            placeholder={"Select group"}
            value={field.value}
            onChange={(value) => setValue(fieldName, value)}
            asyncFunction={async (inputValue) => {
              const result = await groupService.fetchAll({
                name: inputValue,
              });
              return result.map((it) => ({
                label: it.name,
                value: it.id,
              }));
            }}
          />
        );
      }}
    />
  );
};
