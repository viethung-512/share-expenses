"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";

import { useCreateExpense } from "@/app/react-queries/expense";
import { Button } from "@/components/button";
import ExpenseForm from "./ExpenseForm";
import { CreateExpenseInput } from "@/types/expense.type";
import { DetailsPageWrapper } from "@/components/details-page-wrapper";
import { AuthContext } from "@/context/auth.context";
import { useSearchParams } from "next/navigation";

export default function CreateExpensePage() {
  const { mutateAsync: createExpense } = useCreateExpense();
  const { user } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const groupIdFromQuery = searchParams?.get("groupId") ?? "";

  const formMethods = useForm<CreateExpenseInput>({
    defaultValues: {
      title: "",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      payerId: user?.id ?? "",
      groupId: groupIdFromQuery,
      memberIdsInvolved: [],
      description: "",
    },
  });

  const onSubmit = async (data: CreateExpenseInput) => {
    // ensure amount is a number in case the input produced a string
    const payload: CreateExpenseInput = {
      ...data,
      amount: Number((data as any).amount),
    };
    await createExpense(payload);
  };

  return (
    <DetailsPageWrapper title={"Create new expense"}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <ExpenseForm />
          <Button className={"mt-2 w-full"} type={"submit"}>
            Submit new expense
          </Button>
        </form>
      </FormProvider>
    </DetailsPageWrapper>
  );
}
