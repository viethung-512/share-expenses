"use client";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

import { userService } from "@/services/user.service";
import { HookFormInputProps } from "@/lib/react-hook-form/index";
import {
  InputFieldWrapper,
  InputFieldWrapperProps,
} from "@/components/input-field-wrapper";

export type HookFormInputSingleSelectUserProps = HookFormInputProps<
  InputFieldWrapperProps & { groupId?: string }
>;

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

export const HookFormInputSingleSelectUser: FC<
  HookFormInputSingleSelectUserProps
> = ({ fieldName, groupId, ...rest }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={() => {
        return (
          <InputFieldWrapper {...rest}>
            <AsyncSelect
              cacheOptions
              defaultOptions
              placeholder={"Select user"}
              loadOptions={async (inputValue) => {
                const result = await userService.fetchAll({
                  username: inputValue,
                  groupId,
                });
                return result.map((it) => ({
                  label: it.username,
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
