"use client";

import { FC, PropsWithChildren } from "react";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

export type DetailsPageWrapperProps = {
  title: string;
};

export const DetailsPageWrapper: FC<
  PropsWithChildren<DetailsPageWrapperProps>
> = ({ children, title }) => {
  const router = useRouter();
  return (
    <main>
      <div className={"mx-auto max-w-[500px] flex flex-col gap-4"}>
        <div className={"flex items-center gap-2"}>
          <Button onClick={() => router.back()}>Go back</Button>
          <span className={"text-2xl"}>{title}</span>
        </div>

        {children}
      </div>
    </main>
  );
};
