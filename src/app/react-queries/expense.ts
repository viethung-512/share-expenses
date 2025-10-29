"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "@/utils/constants";

import { CreateExpenseInput } from "@/types/expense.type";
import { expenseService } from "@/services/expense.service";
import { useRouter } from "next/navigation";

export function useFetchExpenses() {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.EXPENSES],
    queryFn: async () => expenseService.fetchAll(),
  });
}

export function useFetchExpenseById(expenseId?: string) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.EXPENSES, expenseId],
    queryFn: async () => expenseService.fetchById(expenseId),
    enabled: !!expenseId,
  });
}

export function useCreateExpense() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, CreateExpenseInput>({
    mutationFn: async (input) => expenseService.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.EXPENSES],
      });
      router.push("/");
    },
  });
}
