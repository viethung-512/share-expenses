"use client";

import { FC } from "react";
import Select, { Props as SelectProps } from "react-select";
import {
  InputFieldWrapper,
  InputFieldWrapperProps,
} from "@/components/input-field-wrapper";

export type InputSelectProps = InputFieldWrapperProps & SelectProps;

export const InputSelect: FC<InputSelectProps> = ({ ...rest }) => {
  return (
    <InputFieldWrapper {...rest}>
      <Select {...rest} />
    </InputFieldWrapper>
  );
};
