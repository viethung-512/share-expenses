"use client";

import { FC, useEffect } from "react";
import { clsx } from "clsx";
import { Button } from "@/components/button";

export type ModalProps = {
  open: boolean;
  // name functions passed to client components with the Action suffix to satisfy Next.js
  onCloseAction: () => void;
  title?: string;
  children?: React.ReactNode;
};

export const Modal: FC<ModalProps> = ({
  open,
  onCloseAction,
  title,
  children,
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onCloseAction]);

  if (!open) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/40",
      )}
      onClick={onCloseAction}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={clsx(
          "bg-white rounded-md shadow-lg w-full max-w-2xl mx-4",
          "p-4",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button onClick={onCloseAction}>Close</Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
