"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { AsyncProps } from "react-select/async";
import {
  InputFieldWrapper,
  InputFieldWrapperProps,
} from "@/components/input-field-wrapper";
import { SingleSelectOption } from "@/types/input-select.type";

export type InputAsyncSingleSelectProps = InputFieldWrapperProps &
  Omit<
    AsyncProps<any, boolean, any>,
    "value" | "onChange" | "cacheOptions" | "defaultOptions"
  > & {
    value?: SingleSelectOption | null;
    onChange?: (value: SingleSelectOption) => void;
    asyncFunction: (inputValue: string) => Promise<SingleSelectOption[]>;
  };

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

export const InputAsyncSingleSelect: FC<InputAsyncSingleSelectProps> = ({
  value,
  onChange,
  asyncFunction,
  ...rest
}) => {
  return (
    <InputFieldWrapper {...rest}>
      <AsyncSelect
        {...rest}
        cacheOptions
        defaultOptions
        loadOptions={(inputValue) => asyncFunction(inputValue)}
        value={value}
        onChange={(value) => {
          if (onChange) {
            onChange(value as SingleSelectOption);
          }
        }}
      />
    </InputFieldWrapper>
  );
};
