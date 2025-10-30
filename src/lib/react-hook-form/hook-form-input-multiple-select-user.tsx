"use client";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { userService } from "@/services/user.service";
import { HookFormInputProps } from "@/lib/react-hook-form/index";
import { InputFieldWrapperProps } from "@/components/input-field-wrapper";
import { InputAsyncSingleSelect } from "@/components/input-async-single-select";

export type HookFormInputMultipleSelectUserProps = HookFormInputProps<
  InputFieldWrapperProps & { groupId?: string }
>;

export const HookFormInputMultipleSelectUser: FC<
  HookFormInputMultipleSelectUserProps
> = ({ fieldName, groupId, ...rest }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <InputAsyncSingleSelect
            {...rest}
            placeholder={"Select user"}
            value={field.value}
            onChange={(value) => {
              setValue(fieldName, value);
            }}
            asyncFunction={async (inputValue) => {
              const result = await userService.fetchAll({
                username: inputValue,
                groupId,
              });
              return result.map((it) => ({
                label: it.username,
                value: it.id,
              }));
            }}
            isMulti={true}
          />
        );
      }}
    />
  );
};
