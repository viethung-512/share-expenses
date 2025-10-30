"use client";

import { clsx } from "clsx";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

export type ButtonProps = {
  isLoading?: boolean;
  variant?: "outline" | "contained";
  color?: "success" | "danger" | "warning" | "primary" | "gray";
  size?: "small" | "medium" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  isLoading,
  variant = "outline",
  color = "gray",
  size = "medium",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(
        rest.className,
        "border cursor-pointer rounded-md",
        size === "medium" && "text-sm font-medium height-[32px] px-3 py-1",
        size === "small" && "text-xs font-light height-[24px] px-2 py-0.5",
        size === "large" && "text-xl font-semibold height-[40px] px-4 py-2",
        color === "primary" &&
          (variant === "contained"
            ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700"
            : "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50"),
        color === "success" &&
          (variant === "contained"
            ? "bg-green-600 text-white border-green-700 hover:bg-green-700"
            : "bg-transparent text-green-600 border-green-600 hover:bg-green-50"),
        color === "danger" &&
          (variant === "contained"
            ? "bg-red-600 text-white border-red-700 hover:bg-red-700"
            : "bg-transparent text-red-600 border-red-600 hover:bg-red-50"),
        color === "warning" &&
          (variant === "contained"
            ? "bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600"
            : "bg-transparent text-yellow-500 border-yellow-500 hover:bg-yellow-50"),
        color === "gray" &&
          (variant === "contained"
            ? "bg-gray-600 text-white border-gray-700 hover:bg-gray-700"
            : "bg-transparent text-gray-600 border-gray-600 hover:bg-gray-50"),
        isLoading && "opacity-70 cursor-not-allowed",
      )}
      disabled={rest.disabled || isLoading}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
