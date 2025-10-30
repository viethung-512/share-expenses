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
  const { mutateAsync: createGroup, isPending: createGroupLoading } =
    useCreateGroup();
  const { user } = useContext(AuthContext);

  const formMethods = useForm<CreateGroupInput>({
    defaultValues: {
      name: "",
      members: [],
      createdByUserId: user?.id,
      totalExpenses: 0,
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
          <Button
            className={"mt-2 w-full"}
            type={"submit"}
            variant={"contained"}
            color={"success"}
            isLoading={createGroupLoading}
          >
            Submit new group
          </Button>
        </form>
      </FormProvider>
    </DetailsPageWrapper>
  );
}
