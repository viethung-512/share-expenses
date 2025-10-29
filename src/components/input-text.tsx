"use client";

import { FC, InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import {
  InputFieldWrapper,
  InputFieldWrapperProps,
} from "@/components/input-field-wrapper";

export type InputTextProps = InputFieldWrapperProps &
  InputHTMLAttributes<HTMLInputElement>;

export const InputText: FC<InputTextProps> = ({ ...rest }) => {
  return (
    <InputFieldWrapper {...rest}>
      <input {...rest} className={clsx(rest.className, "border")} />
    </InputFieldWrapper>
  );
};
