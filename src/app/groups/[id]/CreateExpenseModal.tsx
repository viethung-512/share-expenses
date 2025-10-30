"use client";

import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import ExpenseForm from "@/app/groups/[id]/ExpenseForm";
import { Modal } from "@/components/modal";
import { REACT_QUERY_KEYS } from "@/utils/constants";
import { Button } from "@/components/button";
import { useCreateExpense } from "@/app/react-queries/expense";
import { CreateExpenseInput } from "@/types/expense.type";
import { Group } from "@/types/group.type";
import { groupService } from "@/services/group.service";

export type CreateExpenseModalProps = {
  isModalOpen: boolean;
  onDismissAction: () => void;
  group: Group;
};

export const CreateExpenseModal: FC<CreateExpenseModalProps> = ({
  isModalOpen,
  onDismissAction,
  group,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: createExpense, isPending: createExpenseLoading } =
    useCreateExpense();
  const methods = useForm<CreateExpenseInput>({
    defaultValues: {
      title: "",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      payer: null,
      membersInvolved: [],
      group: groupService.getOption(group),
      description: "",
    },
  });

  const closeModal = () => {
    methods.reset({
      ...methods.getValues(),
      group: groupService.getOption(group),
    });
    onDismissAction();
  };

  const onSubmit = async (data: any) => {
    // ensure numeric amount
    const payload = { ...data, amount: Number(data.amount) };
    await createExpense(payload);
    await queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.EXPENSES],
    });
    closeModal();
  };

  return (
    <Modal
      open={isModalOpen}
      onCloseAction={closeModal}
      title={"Create Expense"}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <ExpenseForm />
          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={closeModal}>Cancel</Button>
            <Button
              type="submit"
              variant={"contained"}
              color={"success"}
              isLoading={createExpenseLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};
