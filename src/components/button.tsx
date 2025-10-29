"use client";

import { clsx } from "clsx";
import { ButtonHTMLAttributes, FC } from "react";

export type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ className, ...rest }) => {
  return (
    <button className={clsx(className, "border cursor-pointer")} {...rest} />
  );
};
