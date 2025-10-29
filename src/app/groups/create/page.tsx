"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";

import { useCreateGroup } from "@/app/react-queries/group";
import { Button } from "@/components/button";
import { GroupForm } from "@/app/groups/create/GroupForm";
import { CreateGroupInput } from "@/types/group.type";
import { DetailsPageWrapper } from "@/components/details-page-wrapper";
import { AuthContext } from "@/context/auth.context";

export default function CreateGroupPage() {
  const { mutateAsync: createGroup } = useCreateGroup();
  const { user } = useContext(AuthContext);

  const formMethods = useForm<CreateGroupInput>({
    defaultValues: {
      name: "",
      memberIds: [],
      createdByUserId: user?.id,
    },
  });

  const onSubmit = async (data: CreateGroupInput) => {
    await createGroup(data);
  };

  return (
    <DetailsPageWrapper title={"Create new group"}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <GroupForm />
          <Button className={"mt-2 w-full"} type={"submit"}>
            Submit new group
          </Button>
        </form>
      </FormProvider>
    </DetailsPageWrapper>
  );
}
