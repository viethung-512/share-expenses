"use client";

import { FormProvider, useForm } from "react-hook-form";

import { DetailsPageWrapper } from "@/components/details-page-wrapper";
import { useCreateUser } from "@/app/react-queries/user";
import { CreateUserPlaceholderInput } from "@/types/user.type";
import { UserForm } from "@/app/users/create/UserForm";
import { Button } from "@/components/button";

export default function CreateUserPage() {
  const { mutateAsync: createUser, isPending: createUserLoading } =
    useCreateUser();
  const formMethods = useForm<CreateUserPlaceholderInput>({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = async (data: CreateUserPlaceholderInput) => {
    await createUser({ ...data });
  };
  return (
    <DetailsPageWrapper title={"Create new user"}>
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className={"flex flex-col gap-2"}
        >
          <UserForm />
          <Button
            type="submit"
            variant={"contained"}
            color={"success"}
            isLoading={createUserLoading}
          >
            Create
          </Button>
        </form>
      </FormProvider>
    </DetailsPageWrapper>
  );
}
