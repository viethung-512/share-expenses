"use client";

import { FC, PropsWithChildren } from "react";
import clsx from "clsx";

export type InputFieldWrapperProps = {
  label?: string;
  helperText?: string;
  status?: "error" | "success" | "warning";
};

export const InputFieldWrapper: FC<
  PropsWithChildren<InputFieldWrapperProps>
> = ({ label, helperText, status, children }) => {
  return (
    <div className={"flex flex-col gap-1"}>
      {label && <label className={"block text-sm font-medium"}>{label}</label>}
      {children}
      {helperText && (
        <p
          className={clsx("text-sm", {
            "text-red-600": status === "error",
            "text-green-600": status === "success",
            "text-yellow-600": status === "warning",
            "text-gray-500": !status,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
