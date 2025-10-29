"use client";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { HookFormInputProps } from "@/lib/react-hook-form/index";
import {
  InputFieldWrapper,
  InputFieldWrapperProps,
} from "@/components/input-field-wrapper";
import { groupService } from "@/services/group.service";

export type HookFormInputSingleSelectGroupProps =
  HookFormInputProps<InputFieldWrapperProps>;

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

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
          <InputFieldWrapper {...rest}>
            <AsyncSelect
              cacheOptions
              defaultOptions
              placeholder={"Select group"}
              loadOptions={async (inputValue) => {
                const result = await groupService.fetchAll({
                  name: inputValue,
                });
                return result.map((it) => ({
                  label: it.name,
                  value: it.id,
                }));
              }}
              onChange={(value) => setValue(fieldName, (value as any)?.value)}
            />
          </InputFieldWrapper>
        );
      }}
    />
  );
};
